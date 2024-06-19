// ** React Imports
import { forwardRef, Fragment } from "react";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import Select from "react-select";

// ** Utils
import DateGenerator from "../../../services/Utils/DateGenerator";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// ** Avatars
import CourseBlank from "../../../assets/images/avatars/Course-Blank.png";

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const UsersListTable = ({ users }) => {
  const CourseCol = [
    {
      name: "نام دسته بندی",
      sortable: true,
      width: "260px",
      //selector: (row) => row.fname,
      cell: (row) => (
        <Link>
          <p
            style={{
              fontSize: "15px",
              marginTop: "15px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100px",
              lineHeight: "40px",
            }}
          >
            {row.categoryName ? row.categoryName : "دسته بندی بی نام"}
          </p>
        </Link>
      ),
    },
    {
      name: "عنوان گوگل",
      sortable: true,
      width: "320px",
      //selector: (row) => row.fname,
      cell: (row) => (
        <span
          style={{
            fontSize: "15px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "200px",
            lineHeight: "40px",
          }}
        >
          {row.googleTitle ? row.googleTitle : "بدون عنوان"}
        </span>
      ),
    },
    {
      name: "توضیحات گوگل",
      sortable: true,
      width: "370px",
      //selector: (row) => row.fname,
      cell: (row) => (
        <span
          style={{
            fontSize: "15px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "40px",
          }}
        >
          {row.googleDescribe ? row.googleDescribe : "بدون توضیحات"}
        </span>
      ),
    },
    {
      name: "تاریخ ساخت",
      sortable: true,
      width: "160px",
      //selector: (row) => row.fname,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            gap: "15px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "250px",
              lineHeight: "40px",
            }}
          >
            {DateGenerator(row.insertDate)}
          </span>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            responsive
            columns={CourseCol}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={() => CustomPagination()}
            data={users}
            noDataComponent={<span className="my-2">کاربری یافت نشد !</span>}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default UsersListTable;
