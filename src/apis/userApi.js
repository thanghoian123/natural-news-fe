import axiosInstance from './axiosInstance';

export const sendOTP = (phoneNumber) => {
  return axiosInstance.post('/send-otp', { phone: phoneNumber });
};

export const verifyOTP = (phoneNumber, otpCode) => {
  return axiosInstance.post('/verify-otp', { phone: phoneNumber, otp: otpCode });
};

export const loginAPI = (email) => {
  return axiosInstance.post(`/users/login?email=${email}`);
};

export const getUserAPI = () => {
  return axiosInstance.get(`/users`);
};
