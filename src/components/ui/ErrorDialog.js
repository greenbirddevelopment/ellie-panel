import Button from "./Button";
import Modal from "./Modal";

const ErrorDialog = ({ show, title, message, handleErrorDialog }) => {
  return (
    <Modal
      show={show}
      handleModal={handleErrorDialog}
      className={"w-11/12 md:w-2/4 lg:w-2/6 xl:w-1/4"}
    >
      <Modal.Header handleModal={handleErrorDialog}>
        <h6 className="text-lg mx-auto font-bold">{title}</h6>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center text-gray-700">{message}</p>
      </Modal.Body>
      <Modal.Footer className={"text-center"}>
        <Button type={"button"} variant={"link"} onClick={handleErrorDialog}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorDialog;
