// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

/* Styles */
import "./Style.css";

// ** Custom Components
import Avatar from "@components/avatar";
import UserAddRole from "./UserAddRole";
import RoleCards from "../roles-permissions/roles/RoleCards";

// ** Avatars
import StudentAvatar from "../../assets/images/avatars/Student.png";
import AdminAvatar from "../../assets/images/avatars/Admin.png";
import TeacherAvatar from "../../assets/images/avatars/Teacher.png";
import BlankAvatar from "../../assets/images/avatars/avatar-blank.png";

// ** Icons Imports
import {
  Archive,
  Database,
  Edit2,
  FileText,
  MoreVertical,
  Settings,
  Slack,
  Trash2,
  User,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

//import { deleteUserAPI } from "../../services/api/user/delete-user.api";

import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

const DateGenerator = (RawDate) => {
  var date = new DateObject(RawDate);
  date.convert(persian);

  const MonthGenerator = (MonthNumber) => {
    switch (MonthNumber) {
      case "01":
        return "فروردین";
      case "02":
        return "اردیبهشت";
      case "03":
        return "خرداد";
      case "04":
        return "تیر";
      case "05":
        return "مرداد";
      case "06":
        return "شهریور";
      case "07":
        return "مهر";
      case "08":
        return "آبان";
      case "09":
        return "آذر";
      case "10":
        return "دی";
      case "11":
        return "بهمن";
      case "12":
        return "اسفند";
    }
  };

  const FirstZeroRemover = (text) => {
    if (text[0] == 0) {
      return text.slice(1);
    } else return text;
  };

  return (
    date.format("YYYY") +
    " / " +
    MonthGenerator(date.format("MM")) +
    " / " +
    FirstZeroRemover(date.format("DD"))
  );
};

const RoleGenerator = ({ Roles }) => {
  var data = [
    {
      title: "Administrator",
      users: [],
    },
  ];

  if (typeof Roles == "string") {
    let Student = Roles.indexOf("Student");
    let Admin = Roles.indexOf("Administrator");
    let Teacher = Roles.indexOf("Teacher");
    Student != -1 &&
      data[0].users.push({
        size: "md",
        title: "دانش آموز",
        img: StudentAvatar,
      });
    Admin != -1 &&
      data[0].users.push({
        size: "md",
        title: "ادمین",
        img: AdminAvatar,
      });
    Teacher != -1 &&
      data[0].users.push({
        size: "md",
        title: "استاد",
        img: TeacherAvatar,
      });
  }
  if (Roles == null) {
    data[0].users.push({
      size: "md",
      title: "کاربر ساده",
      img: BlankAvatar,
    });
  }
  return <RoleCards data={data} />;
};

export const userCol = [
  {
    name: "نام",
    sortable: true,
    width: "290px",

    sortField: "role",
    //selector: (row) => row.fname,
    cell: (row) => (
      <div>
        <div
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <Link to={`/Users/Detail/${row.id}`} style={{ fontSize: "15px" }}>
            {row.fname ? row.fname : "کاربر"}{" "}
            {row.lname ? row.lname : " آکادمی سپهر "}
          </Link>
        </div>
        <span style={{ fontSize: "10px" }}>{row.gmail}</span>
      </div>
    ),
  },
  {
    name: "نقش",
    sortable: true,
    width: "150px",
    sortField: "role",
    selector: (row) => row.userRoles,
    cell: (row) => (
      <span
        style={{ overflow: "hidden", maxHeight: "50px", maxWidth: "100px" }}
      >
        <RoleGenerator Roles={row.userRoles} />
      </span>
    ),
  },

  {
    name: "شماره موبایل",
    sortable: true,
    width: "160px",
    sortField: "role",
    selector: (row) => row.phoneNumber,
    cell: (row) => <span>{row.phoneNumber}</span>,
  },
  {
    name: "تاریخ",
    sortable: true,
    width: "150px",
    sortField: "role",
    selector: (row) => row.insertDate,
    cell: (row) => (
      <span style={{ fontSize: "10px", direction: "rtl" }}>
        {DateGenerator(row.insertDate)}
      </span>
    ),
  },
  {
    name: "وضعیت",
    sortable: true,
    width: "120px",
    sortField: "role",
    selector: (row) => row.active,
    cell: (row) => (
      <>
        {row.active ? (
          <span
            style={{
              color: "#27BD6B",
              width: "40px",
              backgroundColor: "#28424B",
              textAlign: "center",
              borderRadius: "10px",
            }}
          >
            فعال
          </span>
        ) : (
          <span>غیر فعال</span>
        )}
      </>
    ),
  },

  {
    name: "مدیریت",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/Users/Detail/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">اطلاعات بیشتر</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش کاربر</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                store.dispatch(deleteUser(row.id));
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">حذف کاربر</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
  {
    minWidth: "130px",
    cell: (row) => <button className="btn-primary-DDDD">دسترسی</button>,
  },
];
