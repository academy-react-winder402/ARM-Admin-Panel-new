import http from "../../../interceptors/interceptors";
import { APIs_Path } from "../APIs_Path/APIs_Path";

// ** CourseList
export const getCourseListsAPI = async (pageNumber, rowsOfPage, query) => {
  try {
    const response = await http.get(APIs_Path.GetAllCourse, {
      params: {
        pageNumber,
        rowsOfPage,
        query,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
export const ActiveDeActiveCourseAPI = async (Active, id) => {
  try {
    const CurrObj = {
      active: Active,
      id: id,
    };

    const response = await http.put(APIs_Path.ActiveDeActiveCourse, CurrObj);

    return response;
  } catch (error) {
    return false;
  }
};
export const DeleteRestoreCourseAPI = async (Active, id) => {
  try {
    const Obj = {
      active: Active,
      id: id,
    };

    //console.log(Obj);
    const response = await http.delete(APIs_Path.DeleteRestoreCourse, {
      data: Obj,
    });

    return response;
  } catch (error) {
    return false;
  }
};
export const getCourseByIdAPI = async (id) => {
  try {
    const response = await http.get(APIs_Path.GetCourseById + id);

    return response;
  } catch (error) {
    return false;
  }
};
export const getCourseReserveAPI = async (id) => {
  try {
    const response = await http.get(APIs_Path.CourseReserve + id);

    return response;
  } catch (error) {
    return false;
  }
};
export const DeleteReserve = async (id) => {
  try {
    const response = await http.delete(APIs_Path.CourseReserveDelete, {
      data: {
        id: id,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
export const getGetCourseGroupAPI = async (teacherId, courseId) => {
  try {
    const response = await http.get(APIs_Path.GetCourseGroup, {
      params: {
        teacherId,
        courseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
export const SendReserveToCourse = async (CourseId, GroupId, StudentId) => {
  try {
    const response = await http.post(APIs_Path.SendReserveToCourse, {
      courseId: CourseId,
      courseGroupId: GroupId,
      studentId: StudentId,
    });

    return response;
  } catch (error) {
    return false;
  }
};
