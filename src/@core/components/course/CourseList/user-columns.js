// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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
  SkipBack,
  XCircle,
  Check,
  User,
} from "react-feather";

// ** Avatars
import CourseBlank from "../../../assets/images/avatars/Course-Blank.png";

// ** Reactstrap Imports
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Apis
import {
  ActiveDeActiveCourseAPI,
  DeleteRestoreCourseAPI,
} from "../../../services/api/Course/Courses";
import Badge from "../../‌Badge/Badge";

const HandleDelete = async (active, id) => {
  const response = await DeleteRestoreCourseAPI(active, id);
  if (response.success) {
    active
      ? toast.success("دوره مورد نظر با موفقیت  حذف شد")
      : toast.success("دوره مورد نظر با موفقیت بازیابی شد   ");
  }
};
const HandleActive = async (active, id) => {
  const response = await ActiveDeActiveCourseAPI(active, id);
  if (response.success) {
    active
      ? toast.success("دوره مورد نظر با موفقیت فعال شده")
      : toast.success("دوره مورد نظر با موفقیت غیر فعال شد ");
  }
};

export const CourseCol = [
  {
    name: "نام دوره",
    sortable: true,
    width: "300px",
    sortField: "role",
    //selector: (row) => row.fname,
    cell: (row) => (
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          gap: "15px",
        }}
      >
        {row.tumbImageAddress == "undefined" || row.tumbImageAddress == null ? (
          <span
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "100%",
              backgroundColor: "gray",
              marginTop: "5px",
            }}
          >
            <img
              style={{
                width: "30px",
                height: "30px",
                marginRight: "3px",
                marginTop: "1px",
                opacity: "0.5",
              }}
              src={CourseBlank}
            />
          </span>
        ) : (
          <img
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "100%",
              marginTop: "5px",
            }}
            src={row.tumbImageAddress}
          />
        )}

        <div style={{ display: "flex", flexFlow: "column" }}>
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <Link
              style={{
                fontSize: "15px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "150px",
              }}
            >
              {row.title ? row.title : "دوره بی نام"}
            </Link>
          </div>
          <span style={{ fontSize: "10px", display: "flex", gap: "5px" }}>
            <span>{row.typeName}</span>
            {","}
            <span>{row.statusName}</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    name: " نام مدرس",
    sortable: true,
    width: "180px",
    sortField: "role",
    //selector: (row) => row.fname,
    cell: (row) => <p style={{ marginTop: "15px" }}>{row.fullName}</p>,
  },
  {
    name: " قیمت دوره ",
    sortable: true,
    width: "200px",
    sortField: "role",
    //selector: (row) => row.fname,
    cell: (row) => (
      <span
        style={{
          marginTop: "5px",
          fontSize: "18px",
          fontFamily: "IransnsNumber",
        }}
      >
        {Intl.NumberFormat({
          maximumSignificantDigits: 3,
        }).format(row.cost)}
      </span>
    ),
  },
  {
    name: " وضعیت  ",
    sortable: true,
    width: "140px",
    sortField: "role",
    //selector: (row) => row.fname,
    cell: (row) => (
      <>
        {row.isActive ? (
          <Badge innerHtml="فعال" status="Active" />
        ) : (
          <div style={{ marginRight: "-10px" }}>
            <Badge innerHtml="غیر فعال" status="inActive" />
          </div>
        )}
      </>
    ),
  },
  {
    name: "وضعیت دوره",
    sortable: true,
    width: "200px",
    sortField: "role",
    //selector: (row) => row.fname,
    cell: (row) => (
      <>
        {row.isdelete ? (
          <Badge innerHtml="حذف شده " status="inActive" />
        ) : (
          <Badge innerHtml="حذف نشده" status="Active" />
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
              <span className="align-middle">ویرایش دوره</span>
            </DropdownItem>
            {row.isdelete ? (
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  HandleDelete(false, row.courseId);
                }}
              >
                <SkipBack size={14} className="me-50" />
                <span className="align-middle">بازیابی دوره</span>
              </DropdownItem>
            ) : (
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  HandleDelete(true, row.courseId);
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">حذف دوره</span>
              </DropdownItem>
            )}
            {row.isActive ? (
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  HandleActive(false, row.courseId);
                }}
              >
                <XCircle size={14} className="me-50" />
                <span className="align-middle">غیر فعال کردن دوره</span>
              </DropdownItem>
            ) : (
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  HandleActive(true, row.courseId);
                }}
              >
                <Check size={14} className="me-50" />
                <span className="align-middle"> فعال کردن دوره</span>
              </DropdownItem>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
