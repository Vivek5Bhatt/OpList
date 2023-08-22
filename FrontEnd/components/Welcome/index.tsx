import styles from "@/styles/form.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import ButtonComponent from "@/components/Button/Index";
import { useRouter } from "next/router";

const WelcomeComponent = (props: any) => {
  const { description, buttonName } = props;
  const router = useRouter();
  return (
    <div className={`${styles.leftcardbx} box_left bg-patter`}>
      <div className="welcome-section text-center m-auto">
        <div className="logo_bar_head p-bottom--25x">
          <Link href="/">
            <Image src={Logo} alt="logo" width={100}></Image>
          </Link>
        </div>
        <h4 className="fw-700 title_lg p-bottom--10x">Welcome Back!</h4>
        <p className="title_sm color">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. when an unknown printer took a galley of type and scrambled
        </p>
        <div className="btn_bx1 p-top--20x desktop_show">
          {description && (
            <p className="title_sm color p-bottom--5x fw-600">{description}</p>
          )}
          {buttonName && (
            <ButtonComponent
              type="button"
              btnclass="primary_btn primary-outline w-100 mx-w250 btn_md"
              clickFn={() =>
                buttonName === "Register"
                  ? router.push("/plan")
                  : router.push("/")
              }
            >
              {buttonName}
            </ButtonComponent>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;
