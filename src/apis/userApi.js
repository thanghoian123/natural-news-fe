import axiosInstance from './axiosInstance';

export const sendOTP = (phoneNumber) => {
  return axiosInstance.post('/send-otp', { phone: phoneNumber });
};

export const verifyOtpAPI = (email, otpCode) => {
  return axiosInstance.post(`/users/verify-login?email=${email}&session_password=${otpCode}`);
};

export const loginAPI = (email) => {
  return axiosInstance.post(`/users/login?email=${email}`);
};

export const getUserAPI = () => {
  return axiosInstance.get(`/users`);
};
