import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import {
  emailSend,
  googleLoginSignUpUser,
  msgSend,
} from "@/utlis/services/auth";
import { toast } from "react-toastify";
import ButtonComponent from "../Button/Index";
import GoogleIcon from "../../assets/images/google-icon.svg";
import Image from "next/image";
import { authAction } from "@/utlis/state/actions";
import { useDispatch } from "react-redux";
import { deleteCookie, setCookie } from "cookies-next";

const GoogleComponent = ({ type }: any) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (TokenResponse) => {
      const googleToken = await googleLoginSignUpUser(TokenResponse);
      if (googleToken && googleToken.status === 200) {
        dispatch(authAction(googleToken.data.data));
        setCookie("randomApiKey", googleToken.data.data.randomApiKey);
        if (googleToken.data.data.randomApiKey) {
          msgSend(googleToken.data.data.phone_number);
          emailSend(googleToken.data.data.email, "signup");
        } else {
          deleteCookie("planId");
        }
        router.push("/dashboard");
        toast.success(googleToken.data.message);
      }
    },
  });
  return (
    <ButtonComponent
      type="button"
      btnclass="google-btn m-top--5x w-100"
      clickFn={() => login()}
    >
      <span className="imge-bx">
        <Image src={GoogleIcon} alt="google-icon" width={16}></Image>
      </span>
      <span className="btn-content">
        Sign {type === "login" ? "in" : "up"} with Google
      </span>
    </ButtonComponent>
  );
};

export default GoogleComponent;
