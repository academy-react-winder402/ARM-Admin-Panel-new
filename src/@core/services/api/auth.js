import http from "../../interceptors/interceptors";
import { useMutation } from "react-query";
import { APIs_Path } from "./APIs_Path/APIs_Path";

export const loginAPI = async (user) => {
  try {
    const response = await http.post(APIs_Path.loginAPI, user);
    return response;
  } catch (error) {
    return false;
  }
};
