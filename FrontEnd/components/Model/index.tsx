import { getCookie } from "cookies-next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Model = (props: any) => {
  const ApiKey = getCookie("randomApiKey");
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      className="custom-popup"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">API Key</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Your generated API key is{" "}
          <b>{ApiKey ? ApiKey : props.showData?.api_key}</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Model;
