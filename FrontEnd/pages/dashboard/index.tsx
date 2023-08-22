import Model from "@/components/Model";
import withAuth from "@/utlis/useAuth";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import plan from "../../plan.json";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { userData } = useSelector((state: any) => state.userData);
  const [planData, setPlanData] = useState<any>();
  const [modalShow, setModalShow] = useState(false);
  const hideModel = () => {
    deleteCookie("randomApiKey");
    setModalShow(false);
  };
  const planId = getCookie("planId");
  const apiKey = getCookie("randomApiKey");
  useEffect(() => {
    if (apiKey) {
      setModalShow(true);
    }
    const buyPlan = plan.filter((plan: any) => {
      return plan.id == planId;
    });
    setPlanData(buyPlan[0]);
  }, []);
  return (
    <div className="bodyContent-holder position-relative">
      <div className="contbx-wrapper">
        <div className="bx-holder">
          <h1>Welcome, {userData.name.split(/\s+/).slice(0, 2).join(" ")}!</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
      </div>
      {planData && (
        <>
          <div className="plan-innerbx pt-5">
            <div className="planheadbx">
              <div className="inner-wrap text-center">
                <h3>Buy Plan Details</h3>
              </div>
            </div>
          </div>
          <div className="planinfobxs-holder">
            <Row>
              <Col sm={12}>
                <div className="planbx-holder dashboard-card popularbx">
                  <div className="inner-wrap">
                    <h3>{planData["type"]}</h3>
                    <p>{planData["description"]}</p>
                    <h1>
                      ${planData["price"]} <span>/month</span>
                    </h1>
                    <div className="list_container">
                      <h3 className="pt-3">Features</h3>
                      <ListGroup variant="flush">
                        {planData["properties"].map((data: any, i: number) => {
                          return (
                            <ListGroup.Item key={i}>{data}</ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
      <Model show={modalShow} onHide={hideModel} />
    </div>
  );
};

export default withAuth(Dashboard);
