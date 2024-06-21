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
import RoleCards from "../roles-permissions/roles/RoleCards";
import Badge from "../‌Badge/Badge";

// ** Utils
import { selectThemeColors } from "@utils";
import DateGenerator from "../../services/Utils/DateGenerator";

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

// ** Avatars
import StudentAvatar from "../../assets/images/avatars/Student.png";
import AdminAvatar from "../../assets/images/avatars/Admin.png";
import TeacherAvatar from "../../assets/images/avatars/Teacher.png";
import BlankAvatar from "../../assets/images/avatars/avatar-blank.png";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "./Style.css";

// ** Table Header
const CustomHeader = ({
  handlePerPage,
  rowsOfPage,
  handleFilter,
  query,
  currentRole,
  setCurrentRole,
  currentStatus,
  setCurrentStatus,
}) => {
  const roleOptions = [
    { value: "", label: "انتخاب نقش" },
    { value: 5, label: "دانشجو" },
    { value: 2, label: "استاد" },
    { value: 1, label: "مدیر" },
  ];
  const statusOptions = [
    { value: "", label: "انتخاب وضعیت" },
    { value: true, label: " فعال" },
    { value: false, label: " غیر فعال" },
  ];
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="2" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">تعداد در صفحه</label>
            <Input
              className="mx-50"
              bsSize="lg"
              type="select"
              id="rows-per-page"
              value={rowsOfPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="8">۸</option>
              <option value="12">۱۲</option>
              <option value="24">۲۴</option>
              <option value="62">۶۲</option>
            </Input>
          </div>
        </Col>
        <Col xl="4" className="d-flex align-items-center p-0">
          <div className="d-flex gap-1">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select SelectOption_Custom"
              classNamePrefix="select"
              options={statusOptions}
              value={currentStatus}
              onChange={(data) => setCurrentStatus(data)}
            />
            <Select
              isClearable={false}
              value={currentRole}
              options={roleOptions}
              className="react-select SelectOption_Custom"
              classNamePrefix="select"
              theme={selectThemeColors}
              onChange={(data) => setCurrentRole(data)}
            />
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              جستجو:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              style={{ height: "35px" }}
              type="text"
              value={query}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <Button
              tag={Link}
              to="/Users/add"
              className="add-new-user"
              color="primary"
            >
              افزودن کاربر
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UsersListTable = ({
  users,
  rowsOfPage,
  currentPage,
  query,
  currentRole,
  currentStatus,
  setRowsOfPage,
  setCurrentPage,
  setQuery,
  setSortingCol,
  setSortType,
  setCurrentRole,
  setCurrentStatus,
}) => {
  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setCurrentPage(1);
    setRowsOfPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setCurrentPage(1);
    setQuery(val);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(users?.totalCount / rowsOfPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage}
        onPageChange={(page) => setCurrentPage(page.selected)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      status: currentStatus.value,
      query,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k]?.length > 0;
    });

    if (users?.length > 0) {
      return users;
    } else if (users?.totalCount === 0 && isFiltered) {
      return [];
    } else {
      return users?.listUser.slice(0, rowsOfPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSortType(column.sortField);
    setSortingCol(sortDirection);
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

  const AddingRole = ({ Roles, UserId }) => {
    const colourOptions = [
      { value: "", label: "هیچکدام" },
      { value: 2, label: "استاد" },
      { value: 5, label: "دانشجو" },
      { value: 1, label: "ادمین" },
    ];
    const [Role, setRole] = useState();
    const [SelectStatus, setSelectStatus] = useState("hide");

    const ApiHandler = () => {
      if (Role == null) {
        toast("نقش مورد نظر خود را انتخاب کنید");
      } else {
        if (Roles) {
        }
      }
    };

    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <Select
          theme={selectThemeColors}
          className={
            (SelectStatus == "show" ? "show" : " ") +
            " react-select Select_Role"
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
            <div className="btn-primary-DDDD" onClick={() => ApiHandler()}>
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

  const userCol = [
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
      cell: (row) => <AddingRole Roles={row.userRoles} UserId={row.id} />,
    },
  ];

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={userCol}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                query={query}
                rowsOfPage={rowsOfPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                currentRole={currentRole}
                setCurrentRole={setCurrentRole}
                currentStatus={currentStatus}
                setCurrentStatus={setCurrentStatus}
                users={users}
              />
            }
            noDataComponent={<span className="my-2">کاربری یافت نشد !</span>}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default UsersListTable;
