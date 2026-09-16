import React, { useState } from "react";
import { render } from "@testing-library/react";
import Modal from "./Modal";

const ModalHost = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title="test modal"
      submitButtonLabel="تأیید"
      cancelButtonLabel="انصراف"
      onSubmit={() => setShowModal(false)}
    >
      <p>test description of modal</p>
    </Modal>
  );
};

describe("Modal", () => {
  test("render the Modal component", () => {
    render(<ModalHost />);
  });
});
