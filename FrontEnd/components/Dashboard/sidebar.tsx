import Link from "next/link";
import Image from "next/image";
import { ListGroup } from "react-bootstrap";
import Logo from "../../assets/images/logo-white.svg";
import { useRouter } from "next/router";

const SideBarComponent = () => {
  const router = useRouter();
  return (
    <div className="sidebr-holder darkbg">
      <div className="inner-wrap">
        <div className="logoMain">
          <div className="logo-wrap">
            <Link href="/dashboard">
              <Image src={Logo} alt="logo" width={100}></Image>
            </Link>
          </div>
        </div>
        <div className="navList-holder">
          <ListGroup variant="flush">
            <Link
              href="/dashboard"
              className={router.pathname === "/dashboard" ? "active" : ""}
            >
              <ListGroup.Item action>Dashboard</ListGroup.Item>
            </Link>
            <Link
              href="/department"
              className={router.pathname === "/department" ? "active" : ""}
            >
              <ListGroup.Item action>Department</ListGroup.Item>
            </Link>
            {/* <Link
              href="/personnel"
              className={router.pathname === "/personnel" ? "active" : ""}
            >
              <ListGroup.Item action>Personnel</ListGroup.Item>
            </Link> */}
            <Link
              href="/staff"
              className={router.pathname === "/staff" ? "active" : ""}
            >
              <ListGroup.Item action>Staff</ListGroup.Item>
            </Link>
            {/* <Link href="/profile" className="">
              <ListGroup.Item action>User Profile</ListGroup.Item>
            </Link> */}
            {/* <ListGroup.Item action>
              <Link href="/" className="">
                Account Settings
              </Link> */}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default SideBarComponent;
