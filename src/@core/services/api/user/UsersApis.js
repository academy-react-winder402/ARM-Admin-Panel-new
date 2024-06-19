import http from "../../../interceptors/interceptors";
import { APIs_Path } from "../APIs_Path/APIs_Path";

export const deleteUserAPI = async (userId) => {
  try {
    const response = await http.delete(APIs_Path.DeleteUser, {
      data: {
        userId,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const AddUserAPI = async (value) => {
  try {
    const response = await http.post(APIs_Path.CreateUser, {
      lastName: value.lastName,
      firstName: value.firstName,
      gmail: value.email,
      password: value.password_,
      phoneNumber: value.mobileNumber,
    });

    return response;
  } catch (error) {
    // console.log("errormsg", error);
  }
};
