import Head from "next/head";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import ButtonComponent from "@/components/Button/Index";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import styles from "@/styles/form.module.scss";
import plan from "../../plan.json";
import { useEffect } from "react";

const Plan = () => {
  const router = useRouter();
  const handlePlan = (id: number) => {
    setCookie("planId", id);
    router.push("/register");
  };
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Op List | Plan</title>
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.planpage__wrapper}>
        <div className="plan-outer">
          <Container className="p-0">
            <div className="plan-innerbx">
              <div className="planheadbx">
                <div className="inner-wrap">
                  <h4 className="text-link-color title_sm">Pricing</h4>
                  <h1>Pricing plans for teams of all sizes</h1>
                  <p>
                    Choose an affordable plan that's packed with the best
                    features<br></br> for engaging your audience.
                  </p>
                </div>
              </div>
              <div className="planinfobxs-holder">
                <Row>
                  {plan.map((data, i) => {
                    return (
                      <Col md={4} key={i}>
                        <div
                          className={`planbx-holder ${
                            data.tag ? "popularbx" : ""
                          }`}
                        >
                          <div className="inner-wrap">
                            <h3 className="populr">
                              {data.type}
                              {data.tag ? <span>Most popular</span> : ""}
                            </h3>
                            <p>{data.description}</p>
                            <h1>
                              ${data.price} <span>/month</span>
                            </h1>
                            <div className="btn-holder">
                              <ButtonComponent
                                type="button"
                                btnclass={`primary_btn w-100 btn_md btn_animation ${
                                  data.tag ? "" : "primary-outline"
                                }`}
                                clickFn={() => handlePlan(data.id)}
                              >
                                {data.tag || data.type === "Premium"
                                  ? "Buy Now"
                                  : "Get started for free"}
                              </ButtonComponent>
                            </div>
                            <div className="list_container">
                              <ListGroup variant="flush">
                                {data.properties.map((list, i) => {
                                  return (
                                    <ListGroup.Item key={i}>
                                      {list}
                                    </ListGroup.Item>
                                  );
                                })}
                              </ListGroup>
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
};

export default Plan;
