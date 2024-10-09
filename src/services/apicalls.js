import apiRequest from "./api";
import { BACKEND } from "./helpurl";

export const createUsers= async(user)=>{
    return apiRequest(BACKEND,'POST',user)
}
export const loginUser=async(data)=>{
    return apiRequest(`${BACKEND}/login`,'POST',data);
}
export const forgetUser=async(data)=>{
    return apiRequest(`${BACKEND}/forget`)
}