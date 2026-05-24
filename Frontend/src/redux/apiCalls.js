import { userRequest } from "../requestMethods";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await userRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
    throw error;
  }
};

export const sendOtp = async (email) => {
  const res = await userRequest.post("/auth/send-otp", { email });
  return res.data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const res = await userRequest.post("/auth/reset-password", { email, otp, newPassword });
  return res.data;
};