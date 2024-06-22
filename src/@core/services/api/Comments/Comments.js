import http from "../../../interceptors/interceptors";
import { APIs_Path } from "../APIs_Path/APIs_Path";

export const getCommentListsAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  isDeletedUser
) => {
  try {
    const response = await http.get("/Course/CommentManagment", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        isDeletedUser,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
