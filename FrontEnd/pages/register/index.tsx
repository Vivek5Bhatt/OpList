import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import InputComponent from "@/components/Input";
import ButtonComponent from "@/components/Button/Index";
import WelcomeComponent from "@/components/Welcome";
import GoogleComponent from "@/components/Google";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import styles from "@/styles/form.module.scss";
import { Container, Row, Col, Form } from "react-bootstrap";
import { emailSend, msgSend, signUpUser } from "@/utlis/services/auth";
import { toast } from "react-toastify";
import { authAction } from "@/utlis/state/actions";
import { useDispatch } from "react-redux";

const Register = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptCheckBox, setAcceptCheckBox] = useState(false);
  const handleRegisterData = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setRegisterData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsDisabled(true);
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Your password and confirmation password do not match.");
    } else {
      const signUpData = {
        name: registerData.name.trim(),
        email: registerData.email,
        phone_number: phoneNumber,
        password: registerData.password,
        is_accept: acceptCheckBox ? true : undefined,
      };
      const signUpResponseData = await signUpUser(signUpData);
      if (signUpResponseData && signUpResponseData.status === 200) {
        const phoneNumber = signUpResponseData.data.data.phone_number;
        const email = signUpResponseData.data.data.email;
        msgSend(phoneNumber);
        emailSend(email, "signup");
        dispatch(authAction(signUpResponseData.data.data));
        setCookie("randomApiKey", signUpResponseData.data.data.randomApiKey);
        router.push("/dashboard");
        toast.success(signUpResponseData.data.message);
      } else {
        toast.error(signUpResponseData?.data?.message);
      }
    }
  };
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);
  useEffect(() => {
    if (
      !registerData?.name.length ||
      !registerData?.email.length ||
      !registerData?.password.length ||
      !registerData?.confirmPassword.length ||
      !phoneNumber.length ||
      !acceptCheckBox
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    registerData?.name,
    registerData?.email,
    registerData?.password,
    registerData.confirmPassword,
    phoneNumber,
    acceptCheckBox,
  ]);
  return (
    <>
      <Head>
        <title>Op List | Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.form_pagebx}>
        <div className={`${styles.mainbx} bg_gradient_blue form_section_outer`}>
          <Container className="p-0">
            <div className="inner_card-sectionbx bg_gradient_white">
              <Row className="gutter-0x">
                <Col md={6}>
                  <WelcomeComponent
                    description="Already have an account ?"
                    buttonName="Login"
                  />
                </Col>
                <Col md={6}>
                  <div
                    className={`${styles.rightcardbx} box_right  d-flex flex-column justify-content-center`}
                  >
                    <div
                      className={`${styles.innerbx} form_innerbx_main form_innerbx_bg  mx-450w`}
                    >
                      <div className="tite_bar_top fw-700 title_lg p-bottom--10x text-center">
                        Register
                      </div>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="cstm_formbx m-bottom--6x">
                          <Form.Label className="cstm_labelbx title_sm fw-500">
                            Name
                          </Form.Label>
                          <InputComponent
                            class="cstm_filed_bx"
                            type="text"
                            name="name"
                            maxLen={40}
                            onChange={handleRegisterData}
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
                            onChange={handleRegisterData}
                          ></InputComponent>
                        </Form.Group>
                        <Form.Group className="cstm_formbx m-bottom--6x">
                          <Form.Label className="cstm_labelbx title_sm fw-500">
                            Password
                          </Form.Label>
                          <InputComponent
                            class="cstm_filed_bx"
                            type="password"
                            name="password"
                            onChange={handleRegisterData}
                          ></InputComponent>
                        </Form.Group>
                        <Form.Group className="cstm_formbx m-bottom--6x">
                          <Form.Label className="cstm_labelbx title_sm fw-500">
                            Confirm Password
                          </Form.Label>
                          <InputComponent
                            class="cstm_filed_bx"
                            type="password"
                            name="confirmPassword"
                            onChange={handleRegisterData}
                          ></InputComponent>
                        </Form.Group>
                        <Form.Group className="csmt-chekbx d-flex align-items-center">
                          <Form.Check
                            type="checkbox"
                            onChange={(e: any) =>
                              setAcceptCheckBox(e.target.checked)
                            }
                          />
                          <p className="title_sm fs-12 fw-500 accept-term">
                            I accept the{" "}
                            <Link
                              href="#"
                              className="text-link-color text-decoration-none"
                            >
                              Term and Conditions{" "}
                            </Link>
                            and our{" "}
                            <Link
                              href="#"
                              className="text-color text-decoration-none"
                            >
                              Privacy Policy
                            </Link>
                          </p>
                        </Form.Group>
                        <div className="btn_regbx p-top--15x">
                          <ButtonComponent
                            type="submit"
                            btnclass="primary_btn w-100 btn_md btn_animation m-bottom--5x"
                            disabled={isDisabled}
                          >
                            Register
                          </ButtonComponent>
                          <GoogleComponent type="signup" />
                        </div>
                      </Form>
                    </div>
                    <div className="btn_bx1 mobile-btn p-top--20x mx-450w mobile-show">
                      <p className="title_sm color p-bottom--5x fw-600 text-center">
                        Already have an account ?
                      </p>
                      <ButtonComponent
                        type="button"
                        btnclass="primary_btn primary-outline w-100 btn_md"
                        clickFn={() => router.push("/")}
                      >
                        Login
                      </ButtonComponent>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
};

export default Register;
