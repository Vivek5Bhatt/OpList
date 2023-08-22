import ButtonComponent from "@/components/Button/Index";
import FormModal from "@/components/Model/FormModel";
import {
  addPersonnel,
  personnelDeatil,
  updatePersonnel,
} from "@/utlis/services/personnel";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Edit from "@/assets/images/edit.svg";
import withAuth from "@/utlis/useAuth";
import LoaderComponent from "@/components/Loader";

const Personnel = () => {
  const [modalShow, setModalShow] = useState(false);
  const [loaderShow, setLoaderShow] = useState(true);
  const [personnelData, setPersonnelData] = useState<any>([]);
  const [selectPersonnelName, setSelectPersonnelName] = useState({
    personnel_name: "",
    index: null,
  });
  const handlerPersonnel = async (event: any, personnel_name: any) => {
    event.preventDefault();
    let personnelResponseData: any;
    if (selectPersonnelName?.index !== null) {
      const requestData = {
        personnel_name: personnel_name.trim(),
        personnel_name_position: selectPersonnelName.index,
      };
      personnelResponseData = await updatePersonnel(requestData);
    } else {
      personnelResponseData = await addPersonnel({
        personnel_name: personnel_name.trim(),
      });
    }
    if (personnelResponseData && personnelResponseData.status === 200) {
      toast.success(personnelResponseData.data.message);
      if (selectPersonnelName?.index !== null) {
        let newArr = [...personnelData];
        newArr[selectPersonnelName?.index] = personnelResponseData.data.data;
        setPersonnelData(newArr);
        setSelectPersonnelName({
          personnel_name: "",
          index: null,
        });
      } else {
        setPersonnelData((prevState: any) => {
          if (prevState) {
            return [...prevState, personnelResponseData.data.data];
          } else {
            return [personnelResponseData.data.data];
          }
        });
      }
      setModalShow(false);
    }
  };
  const selectPersonnel = (personnel_name: any, index: any) => {
    const data = {
      personnel_name: personnel_name,
      index: index,
    };
    setSelectPersonnelName(data);
    setModalShow(true);
  };
  const closeModel = () => {
    setSelectPersonnelName({
      personnel_name: "",
      index: null,
    });
    setModalShow(false);
  };
  useEffect(() => {
    setLoaderShow(true);
    personnelDeatil().then((data: any) => {
      setPersonnelData(data?.data.data.personnel_name);
      setLoaderShow(false);
    });
  }, []);
  return (
    <div className="bodyContent-holder position-relative">
      <div className="contbx-wrapper">
        <div className="bx-holder">
          <h1 className="dapart-head">
            Personnel
            <span className="rgt_btns">
              <ButtonComponent
                type="submit"
                btnclass="primary_btn btn_md btn_animation m-bottom--5x"
                clickFn={() => setModalShow(true)}
              >
                Add
              </ButtonComponent>
            </span>
          </h1>
          <div className="deaprtList-holder">
            {loaderShow && <LoaderComponent />}
            {personnelData?.length > 0 ? (
              personnelData.map((data: any, index: number) => {
                return (
                  <ul key={index}>
                    <li>{data.personnel_name}</li>
                    <li>
                      <ButtonComponent
                        type="submit"
                        btnclass="primary_btn btn_md btn_animation m-bottom--5x"
                        clickFn={() =>
                          selectPersonnel(data.personnel_name, index)
                        }
                      >
                        <Image src={Edit} alt="Edit Department" />
                      </ButtonComponent>
                    </li>
                  </ul>
                );
              })
            ) : (
              <p className="text-center">No data found!</p>
            )}
          </div>
        </div>
      </div>
      <FormModal
        show={modalShow}
        onHide={closeModel}
        handlerSubmit={handlerPersonnel}
        selectData={selectPersonnelName}
      />
    </div>
  );
};

export default withAuth(Personnel);
