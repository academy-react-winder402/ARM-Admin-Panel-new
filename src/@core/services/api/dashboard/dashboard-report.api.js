import http from "../../../interceptors/interceptors";

export const dashboardReportAPI = async () => {
  try {
    const response = await http.get("/Report/DashboardReport");

    return response;
  } catch (error) {
    return false;
  }
};
