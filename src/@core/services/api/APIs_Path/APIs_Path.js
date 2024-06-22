export const APIs_Path = {
  // users
  CreateUser: "/User/CreateUser",
  DeleteUser: "/User/DeleteUser",

  // Course
  GetAllCourse: "/Course/CourseList",
  GetCourseById: "/Course/",
  Course: "/Course",
  AddCourseTech: "/Course/AddCourseTechnology",
  ActiveDeActiveCourse: "/Course/ActiveAndDeactiveCourse",
  DeleteRestoreCourse: "/Course/DeleteCourse",
  CourseReserve: "/CourseReserve/",
  CourseGroup: "/CourseGroup",
  CourseReserveDelete: "/CourseReserve",
  GetCourseGroup: "/CourseGroup/GetCourseGroup",
  SendReserveToCourse: "/CourseReserve/SendReserveToCourse",

  // Article
  GetArticle: "/News/AdminNewsFilterList",
  ActiveDeActiveArticle: "/News/ActiveDeactiveNews",
  NewsCategory: "/News/GetListNewsCategory",
  AddNews: "/News/CreateNews",
  GetNewsById: "/News/",
  UpdateNews: "/News/UpdateNews",

  // Other
  loginAPI: "/sign/login",
};
