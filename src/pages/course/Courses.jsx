// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** User List Component
import CourseListTable from "../../@core/components/course/CourseList/Table";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "../../@core/components/StatsHorizontal";
import BreadCrumbs from "../../@core/components/breadcrumbs";

// ** Icons Imports
import { User, UserCheck, UserPlus, UserX } from "react-feather";

// ** Core Imports
import { getCourseListsAPI } from "../../@core/services/api/Course/Courses";

// ** Styles
import "@styles/react/apps/app-users.scss";

const Users = () => {
  const [allUsers, setAllUsers] = useState();
  const [userLists, setUserLists] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [rowsOfPage, setRowsOfPage] = useState(8);
  const [query, setQuery] = useState();

  const fetchUserLists = async (setData) => {
    try {
      const getUserLists = await getCourseListsAPI(1, rowsOfPage, undefined);

      setData(getUserLists);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchUserLists(setUserLists);
    fetchUserLists(setAllUsers);
  }, []);

  useEffect(() => {
    const fetchCourseLists = async () => {
      try {
        const getUserLists = await getCourseListsAPI(
          currentPage,
          rowsOfPage,
          query
        );

        setUserLists(getUserLists);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseLists();
  }, [rowsOfPage, currentPage, query]);

  return (
    <div className="app-user-list">
      <BreadCrumbs
        title="لیست دوره های آکادمی سپهر"
        data={[{ title: "مدیریت دوره ها" }]}
      />

      <CourseListTable
        users={userLists}
        rowsOfPage={rowsOfPage}
        currentPage={currentPage}
        query={query}
        setRowsOfPage={setRowsOfPage}
        setCurrentPage={setCurrentPage}
        setQuery={setQuery}
      />
    </div>
  );
};

export default Users;
