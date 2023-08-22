import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import InputComponent from "@/components/Input";
import GoogleComponent from "@/components/Google";
import WelcomeComponent from "@/components/Welcome";
import ButtonComponent from "@/components/Button/Index";
import { loginUser } from "@/utlis/services/auth";
import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "@/styles/form.module.scss";
import { toast } from "react-toastify";
import { authAction } from "@/utlis/state/actions";
import { useDispatch } from "react-redux";

const Home = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleLoginData = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setLoginData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
    if (loginData.email.length > 0 && loginData.password.length > 0) {
      setIsDisabled(false);
    }
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsDisabled(true);
    const loginResponseData = await loginUser(loginData);
    if (loginResponseData && loginResponseData.status === 200) {
      deleteCookie("planId");
      dispatch(authAction(loginResponseData.data.data));
      router.push("/dashboard");
      toast.success(loginResponseData.data.message);
    }
  };
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);
  useEffect(() => {
    if (!loginData?.email.length || !loginData?.password.length) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [loginData?.email, loginData?.password]);
  return (
    <>
      <Head>
        <title>Op List | Login</title>
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.form_pagebx}>
        <div
          className={`${styles.mainbx} bg_gradient_blue login_section form_section_outer`}
        >
          <Container className="p-0">
            <div className="inner_card-sectionbx bg_gradient_white">
              <Row className="gutter-0x">
                <Col md={6}>
                  <WelcomeComponent
                    description="Don't have an account ?"
                    buttonName="Register"
                  />
                </Col>
                <Col md={6}>
                  <div
                    className={`${styles.rightcardbx} box_right  d-flex flex-column justify-content-center`}
                  >
                    <div
                      className={`${styles.innerbx} form_innerbx_main form_innerbx_bg  mx-450w`}
                    >
                      <div
                        className={`${styles.login_head} tite_bar_top fw-700 title_lg p-bottom--15x text-center`}
                      >
                        Login
                      </div>
                      <Form
                        className={`${styles.login_form}`}
                        onSubmit={handleLogin}
                      >
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
                            onChange={handleLoginData}
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
                            onChange={handleLoginData}
                          ></InputComponent>
                        </Form.Group>
                        <div className="forgot_box text-end m-bottom--6x">
                          <Link
                            href="/forgot-password"
                            className="title_sm text-link-color text-decoration-none"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="btn_regbx p-top--15x">
                          <ButtonComponent
                            type="submit"
                            btnclass="primary_btn w-100 btn_md btn_animation m-bottom--5x"
                            disabled={isDisabled}
                          >
                            Login
                          </ButtonComponent>
                          <GoogleComponent type="login" />
                        </div>
                      </Form>
                    </div>
                    <div className="btn_bx1 mobile-btn p-top--20x mx-450w mobile-show">
                      <p className="title_sm color p-bottom--5x fw-600 text-center">
                        Don't have an account ?
                      </p>
                      <ButtonComponent
                        type="button"
                        btnclass="primary_btn primary-outline w-100 btn_md"
                        clickFn={() => router.push("/plan")}
                      >
                        Register
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

export default Home;
