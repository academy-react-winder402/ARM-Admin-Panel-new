// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

/* Styles */
import "./Style.css";

// ** Custom Components
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
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  UncontrolledDropdown,
} from "reactstrap";
import Badge from "../‌Badge/Badge";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import DateGenerator from "../../services/Utils/DateGenerator";

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

const AddingRole = () => {
  const colourOptions = [
    { value: "", label: "هیچکدام" },
    { value: 2, label: "استاد" },
    { value: 5, label: "دانشجو" },
    { value: 1, label: "ادمین" },
  ];
  const [Role, setRole] = useState();
  const [SelectStatus, setSelectStatus] = useState("hide");

  const MySwal = withReactContent(Swal);
  const handleError = () => {
    return MySwal.fire({
      title: "ارور",
      text: " کاربر جاری نمی تواند دسترسی های خود را تغییر دهد  ",
      icon: "error",
      confirmButtonText: "باشه",
      customClass: {
        confirmButton: "btn btn-primary",
        container: "Font-Iran",
      },
      buttonsStyling: false,
    });
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Select
        theme={selectThemeColors}
        className={
          (SelectStatus == "show" ? "show" : " ") + " react-select Select_Role"
        }
        defaultValue={colourOptions[0]}
        options={colourOptions}
        value={Role}
        onChange={(data) => setRole(data)}
      />

      {SelectStatus == "hide" ? (
        <div
          className="btn-primary-DDDD"
          onClick={() => setSelectStatus("show")}
        >
          دسترسی
        </div>
      ) : (
        <>
          <div className="btn-primary-DDDD" onClick={() => handleError()}>
            تایید
          </div>
          <div
            className="btn-primary-RRRR"
            onClick={() => setSelectStatus("hide")}
          >
            لغو
          </div>
        </>
      )}
    </div>
  );
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
    width: "110px",
    sortField: "role",
    selector: (row) => row.active,
    cell: (row) => (
      <>
        {row.active ? (
          <Badge innerHtml="فعال" status="Active" />
        ) : (
          <Badge innerHtml="غیر فعال" status="inActive" />
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
    name: "دسترسی",
    minWidth: "260px",
    cell: (row) => <AddingRole Roles={row} />,
  },
];
