// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** User List Component
import CourseListTable from "../../@core/components/CourseGroup/Table";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "../../@core/components/StatsHorizontal";
import BreadCrumbs from "../../@core/components/breadcrumbs";

// ** Icons Imports
import { BookOpen, Trash2, Book } from "react-feather";

// ** Core Imports
import { getCourseGroupAPI } from "../../@core/services/api/Course/Courses";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { CountUp } from "use-count-up";

const Users = () => {
  const [allUsers, setAllUsers] = useState();
  const [userLists, setUserLists] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(8);
  const [query, setQuery] = useState();
  const [refetch, setRefetch] = useState(false);

  const [MainFilter, setMainFilter] = useState(1);

  const fetchUserLists = async (setData) => {
    try {
      const getUserLists = await getCourseGroupAPI(1, rowsOfPage, undefined);

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
        const getUserLists = await getCourseGroupAPI(
          currentPage + 1,
          rowsOfPage,
          query
        );

        setUserLists(getUserLists);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseLists();
  }, [rowsOfPage, currentPage, query, refetch]);

  return (
    <div className="app-user-list">
      <BreadCrumbs
        title="لیست گروه های آکادمی سپهر"
        data={[{ title: "لیست گروه ها" }]}
      />

      <CourseListTable
        users={userLists}
        rowsOfPage={rowsOfPage}
        currentPage={currentPage}
        query={query}
        setRowsOfPage={setRowsOfPage}
        setCurrentPage={setCurrentPage}
        setQuery={setQuery}
        setRefetch={setRefetch}
        refetch={refetch}
      />
    </div>
  );
};

export default Users;
