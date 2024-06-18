// ** React Imports
import { forwardRef, Fragment } from "react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Utils
import DateGenerator from "../../../services/Utils/DateGenerator";

// ** Avatars
import CourseBlank from "../../../assets/images/avatars/Course-Blank.png";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  UncontrolledDropdown,
} from "reactstrap";

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

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "../Style.css";

const CourseTable = ({ users }) => {
  const userCol = [
    {
      name: "نام دوره",
      sortable: true,
      width: "290px",

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
          {row.tumbImageAddress == "undefined" ||
          row.tumbImageAddress == null ? (
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

          <Link
            style={{
              fontSize: "15px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "full",
              marginTop: "10px",
            }}
          >
            {row.title}
          </Link>
        </div>
      ),
    },
    {
      name: "متن دوره",
      sortable: true,
      width: "500px",
      sortField: "role",
      //selector: (row) => row.fname,
      cell: (row) => (
        <p
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: "400px",
            textOverflow: "ellipsis",
            marginTop: "15px",
          }}
        >
          {row.describe}
        </p>
      ),
    },
    {
      name: "آخرین آپدیت",
      sortable: true,
      width: "170px",

      sortField: "role",
      //selector: (row) => row.fname,
      cell: (row) => (
        <p
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: "15px",
          }}
        >
          {DateGenerator(row.lastUpdate)}
        </p>
      ),
    },
    {
      sortable: true,
      width: "200px",

      sortField: "role",
      //selector: (row) => row.fname,
      cell: (row) => (
        <p className="btn-primary-DDDD" style={{ marginTop: "17px" }}>
          جزییات دوره
        </p>
      ),
    },
  ];

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            sortServer
            responsive
            columns={userCol}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            data={users}
            noDataComponent={<span className="my-2">کاربری یافت نشد !</span>}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default CourseTable;
