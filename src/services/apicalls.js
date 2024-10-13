import apiRequest from "./api";
import { BACKEND } from "./helpurl";

export const createUsers= async(user)=>{
    return apiRequest(`${BACKEND}/register`,'POST',user)
}
export const loginUser=async(data)=>{
    return apiRequest(`${BACKEND}/login`,'POST',data);
}

export const verifyEmail=async(data)=>{
    return apiRequest(`${BACKEND}/verifyemail`,'POST',data);
}
export const verifyOtp=async(data)=>{
    return apiRequest(`${BACKEND}/verifyotp`,'POST',data);
}
export const resetuser=async(data)=>{
    return apiRequest(`${BACKEND}/reset-password`,'POST',data)
}