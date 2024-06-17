import http from "../../../interceptors/interceptors";

export const GetUserDetail = async (UserId) => {
  try {
    const response = await http.get("/User/UserDetails/" + UserId);

    return response;
  } catch (error) {
    return error;
  }
};
