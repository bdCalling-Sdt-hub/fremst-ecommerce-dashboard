import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import {
  useCreateFaqMutation,
  useUpdateFaqMutation,
} from "../../../redux/apiSlices/privacyPolicySlice";
import toast from "react-hot-toast";

const FaqModal = ({
  setModalData,
  modalData,
  openAddModel,
  setOpenAddModel,
}) => {
  const [form] = Form.useForm();
  const [addFaq, { isLoading: isAdding }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  // Populate form fields if modalData exists (for editing)
  useEffect(() => {
    if (modalData) {
      form.setFieldsValue({
        question: modalData?.question,
        answer: modalData?.answer,
      });
    }
  }, [modalData]);

  // Handle form submission
  const onFinish = async (values) => {
    const data = {
      question: values.question,
      answer: values.answer,
    };

    console.log({ data });

    try {
      if (modalData) {
        // Update existing FAQ
        await updateFaq({
          id: modalData._id,
          data,
        }).unwrap();
        toast.success("FAQ updated successfully");
      } else {
        // Create new FAQ
        await addFaq(data).unwrap();
        toast.success("FAQ added successfully");
      }

      // Reset modal and form after successful submission
      setOpenAddModel(false);
      setModalData(null);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    }
  };

  return (
    <Modal
      centered
      open={openAddModel}
      onCancel={() => {
        setOpenAddModel(false);
        setModalData(null);
        form.resetFields();
      }}
      width={500}
      footer={false}
    >
      <div className="p-6">
        <h1
          className="text-[20px] font-medium"
          style={{ marginBottom: "12px" }}
        >
          {modalData ? "Update FAQ" : "Add FAQ"}
        </h1>
        <Form onFinish={onFinish} form={form} layout="vertical">
          {/* Question Field */}
          <Form.Item
            name="question"
            style={{ marginBottom: "16px" }}
            label={<p style={{ display: "block" }}>Question</p>}
            rules={[{ required: true, message: "Please enter a question!" }]}
          >
            <Input
              type="text"
              placeholder="Enter Question"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}
            />
          </Form.Item>

          {/* Answer Field */}
          <Form.Item
            name="answer"
            style={{ marginBottom: "16px" }}
            label={<p style={{ display: "block" }}>Answer</p>}
            rules={[{ required: true, message: "Please enter an answer!" }]}
          >
            <Input.TextArea
              placeholder="Enter answer"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "152px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                resize: "none",
              }}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="text-end">
            <button
              type="primary"
              htmlType="submit"
              className="bg-primary text-white w-[120px] h-[42px] rounded-lg"
              disabled={isAdding || isUpdating}
            >
              {isAdding || isUpdating ? "Submitting..." : "Submit"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default FaqModal;
