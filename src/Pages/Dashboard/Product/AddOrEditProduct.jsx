import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Select, InputNumber, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/apiSlices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const { TextArea } = Input;
const { Option } = Select;

const AddOrEditProduct = () => {
  const { id } = useParams(); // Get product ID from the URL params
  const [fileList, setFileList] = useState([]);
  const [featuredImageList, setFeaturedImageList] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // const sizeOptions = ["S", "M", "L", "XL", "2XL", "3XL"];
  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black", "White"];
  // const brandOptions = ["Fremst", "Zara", "Levis", "Nike", "Puma", "Adidas"];
  // const tagOptions = ["Winter", "Summer", "Spring", "Fall", "Autumn"];

  // Fetch categories for dropdown
  const { data: categories, isFetching: isFetchingCategories } =
    useGetCategoriesQuery();

  // Fetch product details if editing
  const { data: product, isFetching: isFetchingProduct } =
    useGetSingleProductQuery(id);

  // Mutations
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Handle changes for image uploads
  const handleFileListChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleFeaturedImageListChange = ({ fileList }) => {
    setFeaturedImageList(fileList);
  };

  const BASE_URL = "http://10.0.80.49:5010"; // Update as needed

  useEffect(() => {
    if (product && id) {
      const {
        image,
        featuredImages,
        category,
        sizes,
        colors,
        brands,
        tags,
        name,
        quantity,
        availability,
        ...rest
      } = product.data;

      // Set form fields
      form.setFieldsValue({
        ...rest,
        name: name,
        quantity: quantity,
        category: category?._id, // Map category ID
        sizes: sizes || [],
        colors: colors || [],
        brands: brands || [],
        tags: tags || [],
        availability: availability ? "isStock" : "outOfStock", // Map boolean to string
      });

      // Handle main image
      if (image) {
        const imageUrl = `${BASE_URL}${
          image.startsWith("https") ? image : `${image}`
        }`;

        setFileList([
          {
            uid: "-1",
            name: "product-image.jpg",
            status: "done",
            url: imageUrl,
          },
        ]);
      }

      // Handle featured images
      if (featuredImages?.length) {
        const featuredUrls = featuredImages.map(
          (url) => `${BASE_URL}${url.startsWith("https") ? url : `${url}`}`
        );

        setFeaturedImageList(
          featuredUrls.map((url, index) => ({
            uid: `-${index + 1}`,
            name: `featuredImage-${index + 1}.jpg`,
            status: "done",
            url: url,
          }))
        );
      }
    }
  }, [product, id, form]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    let jsonPayload = {}; // Store non-file fields separately

    // ✅ Check if a new product image is uploaded before appending
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    // ✅ Check if new featured images are uploaded before appending
    const newFeaturedImages = featuredImageList.filter(
      (file) => file.originFileObj
    );
    if (newFeaturedImages.length > 0) {
      newFeaturedImages.forEach((file) => {
        formData.append("featuredImage", file.originFileObj);
      });
    }

    // ✅ Collect existing featured images and add to JSON payload (not FormData)
    const existingImages = featuredImageList
      .filter((item) => item.url)
      .map((item) => item.url.slice(BASE_URL.length));

    if (existingImages.length > 0) {
      jsonPayload.existingFeaturedImages = existingImages; // Store as JSON field
    }

    // ✅ Append other form fields to JSON payload
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        jsonPayload[key] = value;
      } else {
        jsonPayload[key] = key === "availability" ? value === "isStock" : value;
      }
    });

    // Convert JSON payload to a string and append it to FormData
    formData.append("data", JSON.stringify(jsonPayload));

    // // 🔍 Debugging
    // console.log("Submitting FormData:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    try {
      if (id) {
        const response = await updateProduct({ id, data: formData });

        if (response?.data?.success) {
          toast.success(response?.data?.message);
          form.resetFields();
          setFileList([]);
          setFeaturedImageList([]);
          navigate("/productList");
        } else {
          toast.error(response?.data?.message);
        }
      } else {
        const response = await createProduct(formData);

        if (response?.data?.success) {
          toast.success(response?.data?.message);
          form.resetFields(); // Reset the form
          setFileList([]); // Clear product image
          setFeaturedImageList([]); // Clear featured images
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const tagRender = (props) => {
    const { label, closable, onClose } = props;
    return (
      <Tag
        color={label.toLowerCase()}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, border: "1px solid #4E4E4E", width: 60 }}
      >
        {label}
      </Tag>
    );
  };

  const primaryTagRender = (props) => {
    const { label, closable, onClose } = props;
    return (
      <Tag
        color="primary"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, backgroundColor: "#007bff", color: "#fff" }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-5">
        {id ? "Edit Product" : "Add New Product"}
      </h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="flex">
          {/* Left Side */}
          <div className="w-1/2 pr-5 bg-white p-5 rounded-2xl border-t-8 border-primary">
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                { required: true, message: "Please input the product name!" },
              ]}
            >
              <Input placeholder="Enter product name" style={{ height: 40 }} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Enter product description"
                style={{ height: 100 }}
              />
            </Form.Item>
            <Form.Item
              name="additionalInfo"
              label="Additional Information"
              rules={[
                {
                  required: true,
                  message: "Please input the additional information!",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Enter additional information"
                style={{ height: 100 }}
              />
            </Form.Item>

            <Form.Item
              name="sizes"
              label="Sizes"
              rules={[{ required: true, message: "Please select the sizes!" }]}
            >
              <Select
                mode="tags"
                style={{ width: "100%", height: 40 }}
                placeholder="Select sizes"
              />
            </Form.Item>
            <Form.Item
              name="colors"
              label="Colors"
              rules={[{ required: true, message: "Please select the colors!" }]}
            >
              <Select
                mode="tags"
                style={{ width: "100%", height: 40 }}
                placeholder="Select colors"
                options={colorOptions.map((color) => ({ value: color }))}
                tagRender={tagRender}
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Regular Price"
              rules={[
                { required: true, message: "Please input the regular price!" },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Enter regular price"
                style={{ width: "100%", height: 40 }}
              />
            </Form.Item>
            <div className="flex flex-row justify-between w-full gap-5">
              <Form.Item
                name="salePrice"
                label="Sales Price"
                rules={[
                  { required: true, message: "Please input the sales price!" },
                ]}
                className="w-1/2"
              >
                <InputNumber
                  min={0}
                  placeholder="Enter sales price"
                  style={{ width: "100%", height: 40 }}
                />
              </Form.Item>

              <Form.Item
                name={"quantity"}
                label="Quantity"
                rules={[
                  { required: true, message: "Please input the quantity!" },
                ]}
                className="w-1/2"
              >
                <InputNumber
                  min={0}
                  placeholder="Enter quantity"
                  style={{ width: "100%", height: 40 }}
                />
              </Form.Item>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-1/2 pl-5 flex flex-col">
            <div className="flex-1 mb-5 bg-white p-5 rounded-2xl border-t-8 border-primary">
              <Form.Item
                name="image"
                label="Product Image"
                rules={[
                  {
                    required: !id || fileList.length === 0, // Bypass required if updating and no new image is selected
                    message: "Please upload product image!",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  fileList={fileList}
                  beforeUpload={() => false}
                  onChange={handleFileListChange}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>

            {/* Featured Images Section */}
            <div className="flex-1 mb-5 bg-white p-5 rounded-2xl border-t-8 border-primary">
              <Form.Item
                name="featuredImage"
                label="Featured Images"
                rules={[
                  {
                    required: !id || featuredImageList.length === 0, // Bypass required if updating and no new images are selected
                    message: "Please upload featured images!",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  maxCount={5}
                  fileList={featuredImageList}
                  multiple={true}
                  beforeUpload={() => false}
                  onChange={handleFeaturedImageListChange}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>

            <div className="flex-1 bg-white p-5 rounded-2xl border-t-8 border-primary">
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select placeholder="Select category" style={{ height: 40 }}>
                  {categories?.data?.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="brands"
                label="Brands"
                rules={[
                  { required: true, message: "Please select the brands!" },
                ]}
              >
                <Select
                  mode="tags"
                  style={{ width: "100%", height: 40 }}
                  placeholder="Select brands"
                  tagRender={primaryTagRender}
                />
              </Form.Item>
              <Form.Item
                name="tags"
                label="Tags"
                rules={[{ required: true, message: "Please select the tags!" }]}
              >
                <Select
                  mode="tags"
                  style={{ width: "100%", height: 40 }}
                  placeholder="Select tags"
                  tagRender={primaryTagRender}
                />
              </Form.Item>
              <Form.Item
                name="availability"
                label="Availability"
                rules={[
                  { required: true, message: "Please select availability!" },
                ]}
              >
                <Select
                  placeholder="Select availability"
                  style={{ height: 40 }}
                >
                  <Option value="isStock">In Stock</Option>
                  <Option value="outOfStock">Out of Stock</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-5 gap-3">
          <Button className="py-5">Cancel</Button>
          <Button
            className="bg-primary text-white py-5"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {id ? "Update Product" : "Publish Product"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddOrEditProduct;
