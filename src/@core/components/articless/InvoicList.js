// ** React Imports
// import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import { Input, Row, Col, Card } from "reactstrap";

// ** Store & Actions
// import { getData } from './store'
import { useDispatch, useSelector } from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import axios from "axios";

const InvoiceList = () => {
  // ** Store vars
  // const dispatch = useDispatch();
  // const store = useSelector((state) => state.invoice);

  // ** States
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState({});

  const fetch = async () => {
    const fetchedData = await axios.get(
      "https://classapi.sepehracademy.ir/api/Home/GetCoursesWithPagination",
      data
    );
    setData(fetchedData.data.courseFilterDtos);
    console.log(fetchedData.data.courseFilterDtos);
  };
  useEffect(() => {
    fetch();
  }, []);
  // }, [dispatch, store.data.length])

  const handleFilter = (val) => {
    setValue(val);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((data.total / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    );
  };

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (data.length > 0) {
      return data;
    } else if (data.length === 0 && isFiltered) {
      return [];
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    // dispatch(
    // setData({
    //   q: value,
    //   page: currentPage,
    //   sort: sortDirection,
    //   status: statusValue,
    //   perPage: rowsPerPage,
    //   sortColumn: column.sortField,
    // });
    // )
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
};

const CustomHeader = ({
  handleFilter,
  value,
  handleStatusValue,
  statusValue,
  handlePerPage,
  rowsPerPage,
}) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page" style={{ whiteSpace: "nowrap" }}>
              تعداد در صفحه
            </label>
            <Input
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              className="form-control ms-50 pe-3"
            >
              <option value="10">7</option>
              <option value="25">14</option>
              <option value="50">20</option>
            </Input>
          </div>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 p-0"
        >
          <div className="d-flex align-items-center">
            <label htmlFor="search-invoice">جستجو</label>
            <Input
              style={{ width: "190px", height: "30px" }}
              id="search-invoice"
              className="ms-50"
              type="text"
              value={value}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceList;
