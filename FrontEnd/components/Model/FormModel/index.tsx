import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ButtonComponent from "../../Button/Index";
import InputComponent from "../../Input";

const FormModal = (props: any) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [fieldName, setFiledName] = useState("");
  const [fieldValue, setFiledValue] = useState("");
  const handleFieldData = (e: any) => {
    setFiledValue(e.target.value);
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    props.handlerSubmit(e, fieldValue);
    setIsDisabled(true);
  };
  useEffect(() => {
    setFiledValue(
      props.selectData && props.selectData[Object.keys(props.selectData)[0]]
        ? props.selectData[Object.keys(props.selectData)[0]]
        : ""
    );
    setFiledName(props.selectData && Object.keys(props.selectData)[0]);
  }, [props.show]);
  useEffect(() => {
    if (
      !fieldValue?.length ||
      fieldValue === props.selectData[Object.keys(props.selectData)[0]]
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [fieldValue]);
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {fieldName === "api_key"
            ? "Generate New API Key"
            : fieldName === "department_name"
            ? `${props.selectData?.index !== null ? "Edit" : "Add"} Department`
            : `${props.selectData?.index !== null ? "Edit" : "Add"} Personnel`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <InputComponent
              class="form-control"
              type="text"
              name={fieldName}
              value={fieldValue}
              placeholder={`Please enter ${
                fieldName === "api_key"
                  ? "new api key"
                  : fieldName === "department_name"
                  ? "department name"
                  : "personnel name"
              }`}
              onChange={handleFieldData}
              maxLen={40}
              autoFocus={true}
            ></InputComponent>
          </div>
          <div
            className="btn-holder"
            style={{ marginTop: "25px", marginBottom: "30px" }}
          >
            <ButtonComponent
              type="submit"
              btnclass="primary_btn w-100 btn_md btn_animation m-bottom--5x"
              disabled={isDisabled}
            >
              Submit
            </ButtonComponent>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
