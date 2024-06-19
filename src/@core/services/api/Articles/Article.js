import http from "../../../interceptors/interceptors";
import { APIs_Path } from "../APIs_Path/APIs_Path";

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

export const getNewsCatAPI = async () => {
  try {
    const response = await http.get(APIs_Path.NewsCategory);

    return response;
  } catch (error) {
    return false;
  }
};

export const AddNewsApi = async (Form_date) => {
  console.log(Form_date);
  try {
    const response = await http.post(APIs_Path.AddNews, Form_date, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });
    return response;
  } catch (error) {
    return false;
  }
};

export const getNewsByIdAPI = async (id) => {
  try {
    const response = await http.get(APIs_Path.GetNewsById + id);

    return response;
  } catch (error) {
    return false;
  }
};

export const UpdateNewsApi = async (Form_date) => {
  //console.log(Form_date);
  try {
    const response = await http.put(APIs_Path.UpdateNews, Form_date, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return false;
  }
};

export const NewsCategoryApi = async () => {
  try {
    const response = await http.get(APIs_Path.NewsCategory);

    return response;
  } catch (error) {
    return false;
  }
};
