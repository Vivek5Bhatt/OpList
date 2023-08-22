import { useEffect, useState } from "react";
import ButtonComponent from "@/components/Button/Index";
import InputComponent from "@/components/Input";
import { Form } from "react-bootstrap";
import styles from "@/styles/form.module.scss";
import { profile, updateProfile } from "@/utlis/services/auth";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import withAuth from "@/utlis/useAuth";
import LoaderComponent from "@/components/Loader";
import { authAction } from "@/utlis/state/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Profile = () => {
  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: any) => state.userData);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loaderShow, setLoaderShow] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState({
    name: "",
    phone_number: "",
    email: "",
  });
  const handleProfileData = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };
  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    setIsDisabled(true);
    const updateData = {
      name: user.name.trim(),
      phone_number: phoneNumber ? phoneNumber : user.phone_number,
    };
    const updateProfileResponse = await updateProfile(updateData);
    if (updateProfileResponse && updateProfileResponse.data.success) {
      setUser(updateProfileResponse.data.data);
      dispatch(authAction(updateProfileResponse.data.data));
      toast.success(updateProfileResponse.data.message);
    } else {
      toast.error(updateProfileResponse?.data?.message);
    }
  };
  useEffect(() => {
    setLoaderShow(true);
    profile().then((data) => {
      setUser(data?.data.data);
      setPhoneNumber(data?.data.data.phone_number);
      setLoaderShow(false);
    });
  }, []);
  useEffect(() => {
    if (user?.name === userData.name && phoneNumber === userData.phone_number) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [user?.name, phoneNumber]);

  return (
    <div className="bodyContent-holder position-relative">
      <div className="contbx-wrapper ">
        <div
          className={`${styles.rightcardbx} box_right  d-flex flex-column justify-content-center`}
        >
          <div className={`profilebx-holder`}>
            <div className="headingbx">
              <h1>Profile</h1>
              <p style={{ marginBottom: "20px" }}></p>
            </div>
            <Form onSubmit={handleUpdateProfile}>
              {loaderShow && <LoaderComponent />}
              <Form.Group className="cstm_formbx m-bottom--6x">
                <Form.Label className="cstm_labelbx title_sm fw-500">
                  Name
                </Form.Label>
                <InputComponent
                  class="cstm_filed_bx"
                  type="text"
                  name="name"
                  maxLen={40}
                  value={user?.name}
                  onChange={handleProfileData}
                ></InputComponent>
              </Form.Group>
              <Form.Group className="cstm_formbx m-bottom--6x">
                <Form.Label className="cstm_labelbx title_sm fw-500">
                  Phone Number
                </Form.Label>
                <PhoneInput
                  country={"in"}
                  enableSearch={true}
                  countryCodeEditable={false}
                  value={phoneNumber ? phoneNumber : ""}
                  onChange={(phone) => setPhoneNumber(phone)}
                />
              </Form.Group>
              <Form.Group
                className="cstm_formbx m-bottom--6x"
                controlId="formBasicEmail"
              >
                <Form.Label className="cstm_labelbx title_sm fw-500">
                  Email Address
                </Form.Label>
                <InputComponent
                  class="cstm_filed_bx"
                  type="text"
                  name="email"
                  value={user?.email}
                  readOnly={true}
                ></InputComponent>
              </Form.Group>
              <div className="btn-holder">
                <ButtonComponent
                  type="submit"
                  btnclass="primary_btn btn-primary w-100 btn_lg"
                  disabled={isDisabled}
                >
                  Edit Profile
                </ButtonComponent>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);
