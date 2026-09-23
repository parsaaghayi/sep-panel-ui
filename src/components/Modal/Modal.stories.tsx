import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["base", "warning", "danger"],
    },
    onClickOutClose: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function DemoModalBody() {
  return <p>این متن بخش توضیحات مودال است. محتوای دلخواه خود را اینجا قرار دهید.</p>;
}

export const base: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setShowModal(true)}>
          باز کردن مودال
        </button>
        {showModal && (
          <Modal
            title="مودال معمولی"
            showModal={showModal}
            setShowModal={setShowModal}
            onSubmit={() => alert("submit")}
            submitButtonLabel="تأیید"
            cancelButtonLabel="انصراف"
          >
            <DemoModalBody />
          </Modal>
        )}
      </div>
    );
  },
};

export const warning: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setShowModal(true)}>
          باز کردن مودال هشدار
        </button>
        {showModal && (
          <Modal
            title="مودال هشدار"
            type="warning"
            showModal={showModal}
            setShowModal={setShowModal}
            onSubmit={() => alert("submit")}
            submitButtonLabel="تأیید"
            cancelButtonLabel="انصراف"
            onClickOutClose={false}
          >
            <DemoModalBody />
          </Modal>
        )}
      </div>
    );
  },
};

export const danger: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setShowModal(true)}>
          باز کردن مودال خطر
        </button>
        {showModal && (
          <Modal
            title="مودال خطر"
            type="danger"
            showModal={showModal}
            setShowModal={setShowModal}
            onSubmit={() => alert("submit")}
            submitButtonLabel="حذف"
            cancelButtonLabel="انصراف"
          >
            <DemoModalBody />
          </Modal>
        )}
      </div>
    );
  },
};