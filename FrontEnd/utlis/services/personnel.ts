import httpInstance from "../axios";
import { ENDPOINT } from "../constants";
import { toast } from "react-toastify";

export const addPersonnel = async (requestdata: any) => {
  try {
    const res = await httpInstance.post(ENDPOINT.ADDPERSONNEL, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data) toast.error(error?.response?.data?.message);
  }
};

export const updatePersonnel = async (requestdata: any) => {
  try {
    const res = await httpInstance.put(ENDPOINT.UPDATEPERSONNEL, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data) toast.error(error?.response?.data?.message);
  }
};

export const personnelDeatil = async () => {
  try {
    const res = await httpInstance.get(ENDPOINT.PERSONNELDETAIL);
    return res;
  } catch (error: any) {
    // if (error?.response?.data) toast.error(error?.response?.data?.message);
  }
};
