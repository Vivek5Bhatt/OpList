import Image from "next/image";
import Loader from "@/assets/images/loader.gif";

const LoaderComponent = () => {
  return (
    <div>
      <div className="loader-wrapper">
        <Image src={Loader} alt="Loader"></Image>
      </div>
    </div>
  );
};

export default LoaderComponent;
