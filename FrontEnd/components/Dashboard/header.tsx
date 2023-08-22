import Image from "next/image";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { Button, Dropdown } from "react-bootstrap";
import Avatar from "@/assets/images/avatar-1.jpg";
import FormModal from "../Model/FormModel";
import { useState } from "react";
import { toast } from "react-toastify";
import { generateApiKey } from "@/utlis/services/auth";
import Model from "../Model";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
  const router = useRouter();
  const { userData } = useSelector((state: any) => state.userData);
  const [modalFormShow, setModalFormShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [generateNewApiKey, setGenerateNewApiKey] = useState({
    api_key: "",
  });
  const handleLogOut = () => {
    deleteCookie("userId");
    deleteCookie("planId");
    deleteCookie("token");
    router.push("/");
  };
  const goToProfile = () => {
    router.push("/profile");
  };
  const handlerGenerateNewApiKey = async (event: any, api_key: any) => {
    event.preventDefault();
    setGenerateNewApiKey({
      api_key: api_key,
    });
    let apiKeyResponseData = await generateApiKey({
      api_key: api_key,
    });
    if (apiKeyResponseData && apiKeyResponseData.status === 200) {
      toast.success(apiKeyResponseData.data.message);
      setModalFormShow(false);
      setModalShow(true);
    }
  };
  const closeModel = () => {
    setGenerateNewApiKey({
      api_key: "",
    });
    setModalShow(false);
  };
  return (
    <div className="hdrmain-holder fixed">
      <div className="text-right">
        <div className="hdrItems-holder">
          {/* <Button variant="light" className="srchbtn">
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="SearchTwoToneIcon"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </Button> */}
          {/* <Dropdown className="notify-holder">
            <Dropdown.Toggle
              id="dropdown-custom-components"
              className="notifybtn"
            >
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="NotificationsActiveTwoToneIcon"
              >
                <path
                  d="M12 6.5c-2.49 0-4 2.02-4 4.5v6h8v-6c0-2.48-1.51-4.5-4-4.5z"
                  opacity=".3"
                ></path>
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-2 6H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zM7.58 4.08 6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42z"></path>
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <Dropdown>
            <Dropdown.Toggle id="dropdown-custom-components2">
              <div className="avatarbx">
                <Image src={Avatar} alt="Avatar"></Image>
                <div>{userData.name.split(/\s+/).slice(0, 2).join(" ")}</div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item href="#/action-2">Account Settings</Dropdown.Item> */}
              <Dropdown.Item onClick={() => setModalFormShow(true)}>
                Generate New API Key
              </Dropdown.Item>
              <Dropdown.Item onClick={goToProfile}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <FormModal
        show={modalFormShow}
        onHide={() => setModalFormShow(false)}
        handlerSubmit={handlerGenerateNewApiKey}
        selectData={generateNewApiKey}
      />
      <Model
        show={modalShow}
        onHide={closeModel}
        showData={generateNewApiKey}
      />
    </div>
  );
};

export default HeaderComponent;
