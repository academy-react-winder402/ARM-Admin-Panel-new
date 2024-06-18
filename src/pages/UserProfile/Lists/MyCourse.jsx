// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** User List Component
import UsersListTable from "../../../@core/components/Users/DetailTables/CourseTable";

// ** Styles
import "@styles/react/apps/app-users.scss";

const Users = ({ data }) => {
  return (
    <div className="app-user-list">
      <h3 style={{ marginBottom: "20px", marginTop: "20px" }}>
        لیست دوره های تایید شده
      </h3>

      <UsersListTable users={data} />
    </div>
  );
};

export default Users;
