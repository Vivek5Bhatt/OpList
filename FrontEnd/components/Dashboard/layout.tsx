import Head from "next/head";
import SideBarComponent from "./sidebar";
import HeaderComponent from "./header";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";

const LayoutComponent = ({ children }: any) => {
  const router = useRouter();
  const pageName =
    router.pathname.substring(1).charAt(0).toUpperCase() +
    router.pathname.substring(1).slice(1);
  return (
    <>
      <Head>
        <title>Op List | {pageName}</title>
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="dashmain__wrapper">
        <div className="dash-outer">
          <Container fluid={true} className="p-0">
            <SideBarComponent />
            <HeaderComponent />
            <div className="dashBody-holder">
              <>{children}</>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
};

export default LayoutComponent;
