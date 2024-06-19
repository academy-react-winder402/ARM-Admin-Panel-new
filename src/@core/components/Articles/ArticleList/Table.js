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
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Apis
import Badge from "../../‌Badge/Badge";
import { ActiveDeActiveArticleAPI } from "../../../services/api/Articles/Article";

// ** Table Header
const CustomHeader = ({ handlePerPage, rowsOfPage, handleFilter, query }) => {
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
        <Col
          xl="10"
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
              to="/create-user"
              className="add-new-user"
              color="primary"
            >
              افزودن دوره
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
  setRowsOfPage,
  setCurrentPage,
  setQuery,
  setRefetch,
  refetch,
}) => {
  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setCurrentPage(0);
    setRowsOfPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setCurrentPage(0);
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
        s
        forcePage={currentPage}
        onPageChange={(page) => setCurrentPage(page.selected)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1 Font-IranNumb"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
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
      return users?.news.slice(0, rowsOfPage);
    }
  };

  const HandleActive = async (active, id) => {
    const response = await ActiveDeActiveArticleAPI(active, id);
    if (response.success) {
      setRefetch(!refetch);
      active
        ? toast.success("اخبار مورد نظر با موفقیت فعال شده")
        : toast.success("اخبار مورد نظر با موفقیت غیر فعال شد ");
    }
  };

  const CourseCol = [
    {
      name: "نام خبر",
      sortable: true,
      width: "370px",
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
          {row.currentImageAddressTumb == "undefined" ||
          row.currentImageAddressTumb == null ? (
            <span
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "100%",
                backgroundColor: "gray",
                marginTop: "5px",
              }}
            >
              {/* <img
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "3px",
                  marginTop: "1px",
                  opacity: "0.5",
                }}
                src={CourseBlank}
              /> */}
            </span>
          ) : (
            <img
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "100%",
                marginTop: "5px",
              }}
              src={row.currentImageAddressTumb}
            />
          )}

          <Link
            style={{
              fontSize: "15px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "250px",
              lineHeight: "40px",
            }}
          >
            {row.title ? row.title : "دوره بی نام"}
          </Link>
        </div>
      ),
    },
    {
      name: "دسته بندی",
      sortable: true,
      width: "150px",
      sortField: "role",
      //selector: (row) => row.fname,
      cell: (row) => (
        <p style={{ marginTop: "15px", fontSize: "12px" }}>
          {row.newsCatregoryName}
        </p>
      ),
    },
    {
      name: " آخرین آپدیت  ",
      sortable: true,
      width: "210px",
      sortField: "role",
      //selector: (row) => row.fname,
      cell: (row) => (
        <span
          style={{
            marginTop: "5px",
            fontSize: "14px",
            fontFamily: "IransnsNumber",
          }}
        >
          {DateGenerator(row.insertDate)}
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
      name: "بازدید",
      sortable: true,
      width: "100px",
      sortField: "role",
      //selector: (row) => row.fname,
      cell: (row) => (
        <span
          style={{
            textIndent: "8px",
          }}
        >
          {Intl.NumberFormat({
            maximumSignificantDigits: 3,
          }).format(row.currentView)}
        </span>
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
            <DropdownMenu style={{ scale: "0.9" }}>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/Users/Detail/${row.id}`}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle"> جزییات خبر</span>
              </DropdownItem>
              {}

              {row.isActive ? (
                <>
                  <DropdownItem
                    tag={Link}
                    to={`/EditArticle/${row.id}`}
                    className="w-100"
                  >
                    <Archive size={14} className="me-50" />
                    <span className="align-middle">ویرایش خبر</span>
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    href="/"
                    className="w-100"
                    onClick={(e) => {
                      e.preventDefault();
                      HandleActive(false, row.id);
                    }}
                  >
                    <XCircle size={14} className="me-50" />
                    <span className="align-middle">غیر فعال کردن خبر</span>
                  </DropdownItem>
                </>
              ) : (
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    HandleActive(true, row.id);
                  }}
                >
                  <Check size={14} className="me-50" />
                  <span className="align-middle"> فعال کردن خبر</span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
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
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={CourseCol}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={() => CustomPagination()}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                query={query}
                rowsOfPage={rowsOfPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
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
