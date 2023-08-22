import Head from "next/head";
import { useRouter } from "next/router";
import InputComponent from "@/components/Input";
import ButtonComponent from "@/components/Button/Index";
import WelcomeComponent from "@/components/Welcome";
import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "@/styles/form.module.scss";
import { useEffect, useState } from "react";
import { resetPassword } from "@/utlis/services/auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleResetPasswordData = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setResetPasswordData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };
  const handlerResetPassword = async (e: any) => {
    e.preventDefault();
    setIsDisabled(true);
    if (resetPasswordData.password !== resetPasswordData.confirmPassword) {
      toast.error("Your password and confirmation password do not match.");
    } else {
      const resetPasswordObj = {
        email: router.query.email,
        password: resetPasswordData.password,
      };
      const resetPasswordResponse = await resetPassword(resetPasswordObj);
      if (resetPasswordResponse && resetPasswordResponse.data.success) {
        router.push("/");
        toast.success(resetPasswordResponse.data.message);
      } else {
        toast.error(resetPasswordResponse?.data.message);
      }
    }
  };
  useEffect(() => {
    if (
      !resetPasswordData.password.length ||
      resetPasswordData.confirmPassword.length ||
      resetPasswordData.password === resetPasswordData.confirmPassword
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [resetPasswordData.password, resetPasswordData.confirmPassword]);
  return (
    <>
      <Head>
        <title>Op List | Reset Password</title>
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
                  <WelcomeComponent />
                </Col>
                <Col md={6}>
                  <div
                    className={`${styles.rightcardbx} box_right  d-flex flex-column justify-content-center`}
                  >
                    <div
                      className={`${styles.innerbx} form_innerbx_main form_innerbx_bg  mx-450w`}
                    >
                      <div
                        className={`${styles.login_head} tite_bar_top fw-700 title_lg p-bottom--10x text-center`}
                      >
                        Reset Password
                      </div>
                      <Form
                        className={`${styles.login_form}`}
                        onSubmit={handlerResetPassword}
                      >
                        <Form.Group
                          className="cstm_formbx m-bottom--6x"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="cstm_labelbx title_sm fw-500">
                            Password
                          </Form.Label>
                          <InputComponent
                            class="cstm_filed_bx"
                            type="password"
                            name="password"
                            onChange={handleResetPasswordData}
                          ></InputComponent>
                        </Form.Group>
                        <Form.Group
                          className="cstm_formbx m-bottom--6x"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="cstm_labelbx title_sm fw-500">
                            Confirm Password
                          </Form.Label>
                          <InputComponent
                            class="cstm_filed_bx"
                            type="password"
                            name="confirmPassword"
                            onChange={handleResetPasswordData}
                          ></InputComponent>
                        </Form.Group>
                        <div className="btn_regbx p-top--15x">
                          <ButtonComponent
                            type="submit"
                            btnclass="primary_btn w-100 btn_md btn_animation"
                            disabled={isDisabled}
                          >
                            Submit
                          </ButtonComponent>
                        </div>
                      </Form>
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

export default ResetPassword;
