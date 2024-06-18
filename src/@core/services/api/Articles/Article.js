import http from "../../../interceptors/interceptors";
import { APIs_Path } from "../APIs_Path/APIs_Path";

// ** CourseList
export const getArticleListsAPI = async (
  pageNumber,
  rowsOfPage,
  query,
  IsActive
) => {
  try {
    const response = await http.get(APIs_Path.GetArticle, {
      params: {
        pageNumber,
        rowsOfPage,
        query,
        IsActive,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const ActiveDeActiveArticleAPI = async (Active, id) => {
  try {
    const CurrObj = {
      active: Active,
      id: id,
    };

    var Form_date = new FormData();
    Form_date.append("Id", id);
    Form_date.append("Active", Active);

    const response = await http.put(
      APIs_Path.ActiveDeActiveArticle,
      Form_date,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return false;
  }
};
