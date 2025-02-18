import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useUpdateProductAvailabilityMutation,
  useUpdateProductPriceMutation,
} from "../../redux/apiSlices/productSlice";
import logo from "../../assets/logo.png";
import { Table, Input, Checkbox, Button, Tabs } from "antd";
import { useGetCompanyByIdQuery } from "../../redux/apiSlices/userSlice";
import toast from "react-hot-toast";

const ManageSingleCompanyPrices = () => {
  const { id } = useParams();
  const { data: products, isLoading } = useGetProductsQuery();
  const { data: singleCompany, isLoading: isSingleCompanyLoading } =
    useGetCompanyByIdQuery(id);
  const [assignAvailability, { isLoading: isAssignAvailabilityLoading }] =
    useUpdateProductAvailabilityMutation();
  const [updateProductPrice, { isLoading: isUpdateProductPriceLoading }] =
    useUpdateProductPriceMutation();

  const [selectedProducts, setSelectedProducts] = useState({});
  const [updatedPrices, setUpdatedPrices] = useState({});
  const [activeTab, setActiveTab] = useState("assignProducts");

  const productList = products?.data || [];
  const company = singleCompany?.data;
  const availableProducts = company?.availableProducts || [];

  useEffect(() => {
    if (availableProducts.length) {
      const selectedMap = availableProducts.reduce((acc, productId) => {
        acc[productId] = true;
        return acc;
      }, {});
      setSelectedProducts(selectedMap);
    }
  }, [availableProducts]);

  const handleCheckboxChange = useCallback((productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  }, []);

  const handlePriceChange = useCallback((productId, value) => {
    setUpdatedPrices((prev) => ({
      ...prev,
      [productId]: value,
    }));
  }, []);

  const handleSubmit = async () => {
    const selectedProductIds = Object.keys(selectedProducts).filter(
      (productId) => selectedProducts[productId]
    );

    if (selectedProductIds.length === 0) {
      return toast.error("No products selected.");
    }

    try {
      if (activeTab === "assignProducts") {
        // Call the assign availability API
        const response = await assignAvailability({
          id,
          data: { products: selectedProductIds },
        }).unwrap();

        response?.success
          ? toast.success(response?.message)
          : toast.error(response?.message);
      } else if (activeTab === "assignPrices") {
        // Prepare data for price update
        const priceUpdateData = selectedProductIds.map((productId) => ({
          product: productId,
          price: Number(updatedPrices[productId]),
        }));
        const data = {
          products: priceUpdateData,
        };
        // Call the update price API
        const response = await updateProductPrice({
          id,
          data,
        }).unwrap();

        response?.success
          ? toast.success(response?.message)
          : toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (isLoading || isSingleCompanyLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img className="w-20 h-10" src={logo} alt="Loading" />
      </div>
    );
  }

  const columns = [
    activeTab === "assignProducts" && {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={!!selectedProducts[record._id]}
          onChange={() => handleCheckboxChange(record._id)}
        />
      ),
    },
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: ["category", "title"],
      key: "category",
    },
    {
      title: "Regular Price",
      dataIndex: "price",
      key: "regularPrice",
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
    },
    activeTab === "assignPrices" && {
      title: "Assign Price",
      dataIndex: "assignPrice",
      key: "assignPrice",
      render: (_, record) => (
        <Input
          type="number"
          value={updatedPrices[record._id] || record.salePrice || ""}
          onChange={(e) => handlePriceChange(record._id, e.target.value)}
          placeholder="Enter price"
        />
      ),
    },
  ].filter(Boolean);

  return (
    <div>
      <h1 className="text-2xl text-center">
        Manage Product Prices for <br />
        <span className="font-bold text-primary">{company?.user?.name}</span>
      </h1>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "assignProducts", label: "Assign Products" },
          { key: "assignPrices", label: "Assign Prices" },
        ]}
      />
      <div className="my-5">
        <Table
          dataSource={[...productList].sort(
            (a, b) =>
              (selectedProducts[b._id] ? 1 : 0) -
              (selectedProducts[a._id] ? 1 : 0)
          )}
          pagination={false}
          columns={columns}
          rowKey="_id"
          scroll={{ y: 500 }}
        />
        <div className="text-right mt-4">
          <Button
            onClick={handleSubmit}
            className="bg-primary text-white px-5 py-2"
            loading={isAssignAvailabilityLoading}
          >
            Submit Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageSingleCompanyPrices;
