import http from "../../interceptors/interceptors";

export const getComment = async (
  search,
  currentPage,
  rowsPerPage,
  accept,
  sort,
  role
) => {
  try {
    const queryParams = [];
    if (role) queryParams.push(`roleId=${role}`);
    if (search) queryParams.push(`Query=${search}`);
    if (currentPage) queryParams.push(`PageNumber=${currentPage}`);
    if (rowsPerPage) queryParams.push(`RowsOfPage=${rowsPerPage}`);
    if (sort) queryParams.push(`SortingCol=${sort}`);
    // if (sortType) queryParams.push(`SortType=${sortType}`);
    if (accept === false || accept === true)
      queryParams.push(`Accept=${accept}`);

    const url = `/Course/CommentManagment?${queryParams.join("&")}`;
    const result = await http.get(url);
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const accComment = async (id) => {
  try {
    const result = await http.post(
      `/Course/AcceptCourseComment?CommentCourseId=${id}`
    );
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const decComment = async (id) => {
  try {
    const result = await http.post(
      `/Course/RejectCourseComment?CommentCourseId=${id}`
    );
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const delComment = async (id) => {
  try {
    const result = await http.delete(
      `/Course/DeleteCourseComment?CourseCommandId=${id}`
    );
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const repcomment = async (rc) => {
  try {
    console.log("Fetching started...");
    const result = await http.post("/Course/AddReplyCourseComment", rc);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getfulluser = async () => {
  try {
    console.log("Fetching started...");
    const result = await http.get("/User/UserMannage");
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getactiveuser = async () => {
  try {
    //console.log("Fetching started...");
    const result = await http.get("/User/UserMannage");
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getcoursescount = async () => {
  try {
    console.log("Fetching started...");
    const result = await http.get("/Course/CourseList");
    //console.log(result);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRepComnt = async (crsId, cmntId) => {
  try {
    const result = await http.get(
      `/Course/GetCourseReplyCommnets/${crsId}/${cmntId}`
    );

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getcommentcount = async () => {
  try {
    console.log("Fetching started...");
    const result = await http.get("/Course/CommentManagment");
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getprofinfo = async () => {
  try {
    console.log("Fetching started...");
    const result = await http.get("/SharePanel/GetProfileInfo");
    //console.log(result);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addReply = async (data) => {
  try {
    const result = await http.post("/Course/AddReplyCourseComment", data);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
