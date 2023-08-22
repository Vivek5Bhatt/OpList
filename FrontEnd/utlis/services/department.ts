import httpInstance from "../axios";
import { ENDPOINT } from "../constants";
import { toast } from "react-toastify";

export const addDepartment = async (requestdata: any) => {
  try {
    const res = await httpInstance.post(ENDPOINT.ADDDEPARTMENT, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data) toast.error(error?.response?.data?.message);
  }
};

export const updateDepartment = async (requestdata: any) => {
  try {
    const res = await httpInstance.put(ENDPOINT.UPDATEDEPARTMENT, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data) toast.error(error?.response?.data?.message);
  }
};

export const departmentDeatil = async () => {
  try {
    const res = await httpInstance.get(ENDPOINT.DEPARTMENTDETAIL);
    return res;
  } catch (error: any) {
    // if (error?.response?.data) toast.error(error?.response?.data?.message);
  }
};
