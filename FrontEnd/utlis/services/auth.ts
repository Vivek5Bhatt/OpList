import httpInstance from "../axios";
import { ENDPOINT } from "../constants";
import { toast } from "react-toastify";

export const signUpUser = async (requestdata: any) => {
  try {
    const res = await httpInstance.post(ENDPOINT.SIGNUP, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data)
      toast.error(error?.response?.data?.error?.message);
  }
};

export const loginUser = async (requestdata: any) => {
  try {
    const res = await httpInstance.post(ENDPOINT.LOGIN, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data)
      toast.error(error?.response?.data?.error?.message);
  }
};

export const googleLoginSignUpUser = async (requestdata: any) => {
  try {
    const res = await httpInstance.post(
      ENDPOINT.GOOGLELOGINSIGNUP,
      requestdata
    );
    return res;
  } catch (error: any) {
    if (error?.response?.data)
      toast.error(error?.response?.data?.error?.message);
  }
};

export const profile = async () => {
  try {
    const res = await httpInstance.get(ENDPOINT.PROFILE);
    return res;
  } catch (error: any) {
    if (error?.response?.data)
      toast.error(error?.response?.data?.error?.message);
  }
};

export const msgSend = async (phone_number: string) => {
  try {
    const res = await httpInstance.get(`${ENDPOINT.MSGSEND}/${phone_number}`);
    return res;
  } catch (error: any) {
    if (error?.response?.data)
      toast.error(error?.response?.data?.error?.message);
  }
};

export const emailSend = async (email: string, type: string) => {
  try {
    const res = await httpInstance.get(
      `${ENDPOINT.EMAILSEND}?email=${email}&type=${type}`
    );
    return res;
  } catch (error: any) {
    if (error?.response?.data)
      toast.error(error?.response?.data?.error?.message);
  }
};

export const resetPassword = async (requestdata: any) => {
  try {
    const res = await httpInstance.put(ENDPOINT.RESETPASSWORD, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data)
      toast.error(error?.response?.data?.error?.message);
  }
};

export const updateProfile = async (requestdata: any) => {
  try {
    const res = await httpInstance.put(ENDPOINT.UPDATEPROFILE, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data)
      toast.error(error?.response?.data?.error?.message);
  }
};

export const generateApiKey = async (requestdata: any) => {
  try {
    const res = await httpInstance.put(ENDPOINT.GENERATENEWAPIKEY, requestdata);
    return res;
  } catch (error: any) {
    if (error?.response?.data)
      toast.error(error?.response?.data?.error?.message);
  }
};
