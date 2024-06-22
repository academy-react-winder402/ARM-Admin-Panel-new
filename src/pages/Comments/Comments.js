// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** User List Component
import UsersListTable from "../../@core/components/Users/Table";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "../../@core/components/StatsHorizontal";
import BreadCrumbs from "../../@core/components/breadcrumbs";

// ** Icons Imports
import { User, UserCheck, UserPlus, UserX } from "react-feather";

// ** Core Imports
import { getCommentListsAPI } from "../../@core/services/api/Comments/Comments";

// ** Styles
import "@styles/react/apps/app-users.scss";
//import CountUp from "react-countup/build/CountUp";
import { CountUp } from "use-count-up";

const Users = () => {
  const [allUsers, setAllUsers] = useState();
  const [userLists, setUserLists] = useState();
  const [students, setStudents] = useState();
  const [teachers, setTeachers] = useState();
  const [admins, setAdmins] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(8);
  const [query, setQuery] = useState();
  const [sortingCol, setSortingCol] = useState("DESC");
  const [sortType, setSortType] = useState();
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب کاربران",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب وضعیت",
  });

  const fetchUserLists = async (roleId, setData) => {
    try {
      const getUserLists = await getCommentListsAPI(
        1,
        rowsOfPage,
        "desc",
        undefined,
        undefined,
        undefined,
        undefined,
        roleId
      );

      setData(getUserLists);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchUserLists(undefined, setUserLists);
    fetchUserLists(undefined, setAllUsers);
    fetchUserLists(5, setStudents);
    fetchUserLists(2, setTeachers);
    fetchUserLists(1, setAdmins);
  }, []);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const getUserLists = await getUserListsAPI(
          currentPage,
          rowsOfPage,
          sortingCol,
          sortType,
          query,
          currentStatus.value === true ? true : undefined,
          currentStatus.value === false ? true : undefined,
          currentRole.value || undefined
        );

        setUserLists(getUserLists);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserLists();
  }, [
    rowsOfPage,
    currentPage,
    sortingCol,
    sortType,
    query,
    currentRole,
    currentStatus,
  ]);

  return (
    <div className="app-user-list">
      <BreadCrumbs
        title="لیست کامنت های آکادمی سپهر"
        data={[{ title: "مدیریت کامنت" }]}
      />

      <UsersListTable
        users={userLists}
        rowsOfPage={rowsOfPage}
        currentPage={currentPage}
        query={query}
        currentRole={currentRole}
        currentStatus={currentStatus}
        setRowsOfPage={setRowsOfPage}
        setCurrentPage={setCurrentPage}
        setSortingCol={setSortingCol}
        setSortType={setSortType}
        setQuery={setQuery}
        setCurrentRole={setCurrentRole}
        setCurrentStatus={setCurrentStatus}
      />
    </div>
  );
};

export default Users;
