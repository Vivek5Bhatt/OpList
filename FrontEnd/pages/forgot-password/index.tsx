import Head from "next/head";
import { useRouter } from "next/router";
import InputComponent from "@/components/Input";
import ButtonComponent from "@/components/Button/Index";
import WelcomeComponent from "@/components/Welcome";
import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "@/styles/form.module.scss";
import { useEffect, useState } from "react";
import { emailSend } from "@/utlis/services/auth";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

const ForgotPassword = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const handleEmailData = (e: any) => {
    setEmail(e.target.value);
  };
  const handlerSendEmail = async (e: any) => {
    e.preventDefault();
    setIsDisabled(true);
    const sendEmailResponse = await emailSend(email, "reset");
    if (sendEmailResponse && sendEmailResponse.data.success) {
      router.push("/");
      toast.success(sendEmailResponse.data.message);
    } else {
      toast.error(sendEmailResponse?.data?.message);
    }
  };
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);
  useEffect(() => {
    if (!email.length) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email]);
  return (
    <>
      <Head>
        <title>Op List | Forgot Password</title>
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
                        Forgot Password
                      </div>
                      <Form
                        className={`${styles.login_form}`}
                        onSubmit={handlerSendEmail}
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
                            type="email"
                            value={email}
                            onChange={handleEmailData}
                          ></InputComponent>
                        </Form.Group>
                        <div className="btn_regbx p-top--15x">
                          <ButtonComponent
                            type="submit"
                            btnclass="primary_btn w-100 btn_md btn_animation"
                            disabled={isDisabled}
                          >
                            Send to Link
                          </ButtonComponent>
                          <ButtonComponent
                            type="button"
                            btnclass="primary_btn primary-outline w-100 btn_md m-top--10x"
                            clickFn={() => router.push("/")}
                          >
                            Back to Login
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

export default ForgotPassword;
