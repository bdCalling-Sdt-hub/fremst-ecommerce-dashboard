import { Button, Modal, Table, Form, Input, InputNumber } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const TagsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState();
  const [tagsData, setTagsData] = useState([
    {
      key: "1",
      tagNo: "001",
      title: "Holiday Sale",
      discount: 20,
      companies: ["Company A", "Company B"],
      products: ["Product X", "Product Y"],
    },
    {
      key: "2",
      tagNo: "002",
      title: "New Year Offer",
      discount: 15,
      companies: ["Company C", "Company D"],
      products: ["Product Z", "Product W"],
    },
  ]);

  const [form] = Form.useForm();

  const showModal = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleEdit = (record) => {
    console.log("Edit:", record);
    // Implement edit functionality here
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this tag?",
      onOk: () => {
        setTagsData(tagsData.filter((tag) => tag.key !== record.key));
      },
    });
  };

  const handleAddTag = (values) => {
    const newTag = {
      key: (tagsData.length + 1).toString(),
      tagNo: values.tagNo,
      title: values.title,
      discount: values.discount,
      companies: values.companies ? values.companies.split(",") : [],
      products: values.products ? values.products.split(",") : [],
    };

    setTagsData([...tagsData, newTag]);
    setIsAddModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: "Tag No.", dataIndex: "tagNo", key: "tagNo" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Discount (%)", dataIndex: "discount", key: "discount" },
    {
      title: "Companies",
      key: "companies",
      render: (record) => (
        <Button onClick={() => showModal("Companies", record.companies)}>
          View
        </Button>
      ),
    },
    {
      title: "Products",
      key: "products",
      render: (record) => (
        <Button onClick={() => showModal("Products", record.products)}>
          View
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            <FaEdit size={20} />
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            <FaTrash size={20} />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Tags Management</h1>
        <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
          Add Tag
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tagsData}
        pagination={{ pageSize: 5 }}
      />

      {/* View Modal */}
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ul>
          {modalData?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Modal>

      {/* Add Tag Modal */}
      <Modal
        title="Add Tag"
        open={isAddModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTag}>
          <Form.Item
            name="tagNo"
            label="Tag No."
            rules={[{ required: true, message: "Please enter tag number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount (%)"
            rules={[{ required: true, message: "Please enter discount" }]}
          >
            <InputNumber min={0} max={100} className="w-full" />
          </Form.Item>
          <Form.Item name="companies" label="Companies (comma-separated)">
            <Input />
          </Form.Item>
          <Form.Item name="products" label="Products (comma-separated)">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Tag
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

TagsPage.propTypes = {
  tagsData: PropTypes.array,
};

export default TagsPage;
