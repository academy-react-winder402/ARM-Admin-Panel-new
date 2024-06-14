// ** React Imports
import { forwardRef, Fragment } from "react";

// ** Table Columns
import { USER_COLUMNS } from "./user-columns";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

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
import { Link } from "react-router-dom";

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
    { value: true, label: "کاربران فعال" },
    { value: false, label: "کاربران غیر فعال" },
  ];
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="2" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">تعداد در صفحه</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsOfPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="62">62</option>
            </Input>
          </div>
        </Col>
        <Col xl="2" className="d-flex align-items-center p-0">
          <Label for="role-select">نقش</Label>
          <Select
            isClearable={false}
            value={currentRole}
            options={roleOptions}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={(data) => setCurrentRole(data)}
          />
        </Col>
        <Col xl="2" className="d-flex align-items-center p-0">
          <Label for="status-select">وضعیت</Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={statusOptions}
            value={currentStatus}
            onChange={(data) => setCurrentStatus(data)}
          />
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
  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

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
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
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

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row></Row>
        </CardBody>
      </Card>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={USER_COLUMNS}
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
