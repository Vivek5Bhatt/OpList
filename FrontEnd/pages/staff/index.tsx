import ButtonComponent from "@/components/Button/Index";
import FormStaffModal from "@/components/Model/FormModel/staff";
import { addStaff, updateStaff, staffList } from "@/utlis/services/staff";
import { useEffect, useState } from "react";
import withAuth from "@/utlis/useAuth";
import LoaderComponent from "@/components/Loader";
import Image from "next/image";
import Edit from "@/assets/images/edit.svg";
import { AxiosResponse } from "axios";

const Staff = () => {
  const [modalShow, setModalShow] = useState(false);
  const [loaderShow, setLoaderShow] = useState(true);
  const [staffData, setStaffData] = useState<any>([]);
  const [selectStaff, setSelectStaff] = useState();

  const handlerStaff = async (event: any, staff: any) => {
    event.preventDefault();
    let staffResponseData: any;
    if (staff.id) {
      const staffObject = {
        id: staff.id,
        name: staff.name,
        email_address: staff.email_address,
        phone_number: staff.phone_number,
      };
      staffResponseData = await updateStaff(staffObject);
    } else {
      staffResponseData = await addStaff(staff);
    }
    if (staffResponseData && staffResponseData.status === 200) {
      let responseData;
      if (staff.id) {
        const filterData = staffData.filter(
          (item: any) => item.id !== staffResponseData.data.data.id
        );
        responseData = [...filterData, staffResponseData.data.data];
      } else {
        responseData = [...staffData, staffResponseData.data.data];
      }
      setStaffData(responseData);
      setModalShow(false);
      setSelectStaff(undefined);
    }
  };

  const closeModel = () => {
    setSelectStaff(undefined);
    setModalShow(false);
  };

  const selectedStaff = (data: any) => {
    setSelectStaff(data);
    setModalShow(true);
  };

  useEffect(() => {
    setLoaderShow(true);
    staffList().then((data: any) => {
      setStaffData(data?.data?.data);
      setLoaderShow(false);
    });
  }, []);

  return (
    <div className="bodyContent-holder position-relative">
      <div className="contbx-wrapper">
        <div className="bx-holder">
          <h1 className="dapart-head">
            Staff
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
            {staffData?.length > 0 ? (
              staffData.map((data: any, index: number) => {
                return (
                  <ul key={index}>
                    <li>{data.name}</li>
                    <li>{data.email_address}</li>
                    <li>{data.phone_number}</li>
                    <li>
                      <ButtonComponent
                        type="submit"
                        btnclass="primary_btn btn_md btn_animation m-bottom--5x"
                        clickFn={() => selectedStaff(data)}
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
      <FormStaffModal
        show={modalShow}
        onHide={closeModel}
        handlerSubmit={handlerStaff}
        selectData={selectStaff}
      />
    </div>
  );
};

export default withAuth(Staff);
