import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ButtonComponent from "../../Button/Index";
import InputComponent from "../../Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const FormStaffModal = (props: any) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [staffData, setStaffData] = useState({
    name: "",
    email_address: "",
    phone_number: "",
  });

  const handleStaffData = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setStaffData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    staffData.phone_number = phoneNumber ? phoneNumber : staffData.phone_number;
    props.handlerSubmit(e, staffData);
    setIsDisabled(true);
  };

  useEffect(() => {
    props.selectData && setStaffData(props.selectData);
  }, props.selectData);

  useEffect(() => {
    if (props.selectData) {
      if (
        staffData?.name === props?.selectData?.name &&
        staffData?.email_address === props?.selectData?.email_address &&
        staffData?.phone_number === props?.selectData?.phone_number
      ) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    } else {
      if (
        !staffData?.name.length ||
        !staffData?.email_address.length ||
        !phoneNumber.length
      ) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [
    staffData?.name,
    staffData?.email_address,
    phoneNumber,
    props.selectData,
  ]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="add-staff"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.selectData ? "Edit" : "Add"} Staff
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <div className="form-group m-bottom--6x">
            <Form.Label className="cstm_labelbx title_sm fw-500">
              Name
            </Form.Label>
            <InputComponent
              class="form-control"
              type="text"
              name="name"
              placeholder={`Please enter name`}
              value={staffData.name}
              onChange={handleStaffData}
              maxLen={40}
              autoFocus={true}
            ></InputComponent>
          </div>
          <div className="form-group m-bottom--6x">
            <Form.Label className="cstm_labelbx title_sm fw-500">
              Email Address
            </Form.Label>
            <InputComponent
              class="form-control"
              type="text"
              name="email_address"
              placeholder={`Please enter email address`}
              value={staffData.email_address}
              onChange={handleStaffData}
              maxLen={40}
            ></InputComponent>
          </div>
          <div className="form-group cstm_formbx m-bottom--6x cstm_ph">
            <Form.Label className="cstm_labelbx title_sm fw-500">
              Phone Number
            </Form.Label>
            <PhoneInput
              country={"in"}
              enableSearch={true}
              countryCodeEditable={false}
              value={phoneNumber ? phoneNumber : staffData.phone_number}
              onChange={(phone) => setPhoneNumber(phone)}
            />
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
              {props.selectData ? "Update" : "Submit"}
            </ButtonComponent>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormStaffModal;
