import httpInstance from "../axios";
import { ENDPOINT } from "../constants";
import { toast } from "react-toastify";

export const addStaff = async (requestdata: any) => {
  try {
    const res = await httpInstance.post(ENDPOINT.ADDSTAFF, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data) toast.error(error?.response?.data?.message);
  }
};

export const updateStaff = async (requestdata: any) => {
  try {
    const res = await httpInstance.put(ENDPOINT.UPDATESTAFF, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data) toast.error(error?.response?.data?.message);
  }
};

export const staffList = async () => {
  try {
    const res = await httpInstance.get(ENDPOINT.STAFFLIST);
    return res;
  } catch (error: any) {
    // if (error?.response?.data) toast.error(error?.response?.data?.message);
  }
};
