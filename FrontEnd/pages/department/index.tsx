import ButtonComponent from "@/components/Button/Index";
import FormModal from "@/components/Model/FormModel";
import {
  addDepartment,
  departmentDeatil,
  updateDepartment,
} from "@/utlis/services/department";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Edit from "@/assets/images/edit.svg";
import withAuth from "@/utlis/useAuth";
import LoaderComponent from "@/components/Loader";

const Department = () => {
  const [modalShow, setModalShow] = useState(false);
  const [loaderShow, setLoaderShow] = useState(true);
  const [departmentData, setDepartmentData] = useState<any>([]);
  const [selectDepartmentName, setSelectDepartmentName] = useState({
    department_name: "",
    index: null,
  });
  const handlerDepartment = async (event: any, department_name: any) => {
    event.preventDefault();
    let departmentResponseData: any;
    if (selectDepartmentName?.index !== null) {
      const requestData = {
        department_name: department_name.trim(),
        department_name_position: selectDepartmentName.index,
      };
      departmentResponseData = await updateDepartment(requestData);
    } else {
      departmentResponseData = await addDepartment({
        department_name: department_name.trim(),
      });
    }
    if (departmentResponseData && departmentResponseData.status === 200) {
      toast.success(departmentResponseData.data.message);
      if (selectDepartmentName?.index !== null) {
        let newArr = [...departmentData];
        newArr[selectDepartmentName?.index] = departmentResponseData.data.data;
        setDepartmentData(newArr);
        setSelectDepartmentName({
          department_name: "",
          index: null,
        });
      } else {
        setDepartmentData((prevState: any) => {
          if (prevState) {
            return [...prevState, departmentResponseData.data.data];
          } else {
            return [departmentResponseData.data.data];
          }
        });
      }
      setModalShow(false);
    }
  };
  const selectDepartment = (department_name: any, index: any) => {
    const data = {
      department_name: department_name,
      index: index,
    };
    setSelectDepartmentName(data);
    setModalShow(true);
  };
  const closeModel = () => {
    setSelectDepartmentName({
      department_name: "",
      index: null,
    });
    setModalShow(false);
  };
  useEffect(() => {
    setLoaderShow(true);
    departmentDeatil().then((data: any) => {
      setDepartmentData(data?.data.data.department_name);
      setLoaderShow(false);
    });
  }, []);
  return (
    <div className="bodyContent-holder position-relative">
      <div className="contbx-wrapper">
        <div className="bx-holder">
          <h1 className="dapart-head">
            Department
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
            {departmentData?.length > 0 ? (
              departmentData.map((data: any, index: number) => {
                return (
                  <ul key={index}>
                    <li>{data.department_name}</li>
                    <li>
                      <ButtonComponent
                        type="submit"
                        btnclass="primary_btn btn_md btn_animation m-bottom--5x"
                        clickFn={() =>
                          selectDepartment(data.department_name, index)
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
        handlerSubmit={handlerDepartment}
        selectData={selectDepartmentName}
      />
    </div>
  );
};

export default withAuth(Department);
