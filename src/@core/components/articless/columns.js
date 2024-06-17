// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
// import { store } from '@store/store'
// import { deleteInvoice } from './store'

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
  Input,
  Button,
} from "reactstrap";

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle,
  FileText,
  Archive,
  XCircle,
} from "react-feather";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};
const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

// ** renders client column
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary",
    ],
    color = states[stateNum];

  if (row.title.length) {
    return <Avatar className="me-50" img={row.title} width="32" height="32" />;
  } else {
    return (
      <Avatar
        color={color}
        className="me-50"
        content={row.client ? row.client.name : "John Doe"}
        initials
      />
    );
  }
};

// ** Table columns
export const columns = [
  {
    name: <h6 style={{ fontWeight: "bolder", margin: "5px 0" }}>نام بلاگ</h6>,
    sortable: true,
    sortField: "id",
    minWidth: "300px",
    // selector: row => row.id,
    cell: (row) => <Link style={{ fontWeight: "bold" }}>{row.levelName}</Link>,
  },
  {
    name: <h6 style={{ fontWeight: "bolder", margin: "5px 0" }}>دسته بندی</h6>,
    sortable: true,
    sortField: "id",
    minWidth: "160px",
    // selector: row => row.id,
    cell: (row) => (
      <p style={{ whiteSpace: "wrap", fontWeight: "bold" }}>{row.levelName}</p>
    ),
  },
  {
    name: (
      <h6 style={{ fontWeight: "bolder", margin: "5px 0" }}>آخرین آپدیت</h6>
    ),
    sortable: true,
    sortField: "id",
    minWidth: "160px",
    // selector: row => row.id,
    cell: (row) => (
      <p style={{ whiteSpace: "wrap", fontWeight: "bold" }}>{row.levelName}</p>
    ),
  },
  {
    name: (
      <h6 style={{ fontWeight: "bolder", marginTop: "5px" }}>تعداد بازدید</h6>
    ),
    sortable: true,
    sortField: "id",
    minWidth: "150px",
    // selector: row => row.id,
    cell: (row) => (
      <p style={{ whiteSpace: "wrap", fontWeight: "bold" }}>{row.levelName}</p>
    ),
  },
  {
    name: <h6 style={{ fontWeight: "bolder", margin: "5px 0" }}>وضعیت</h6>,
    sortable: true,
    sortField: "id",
    minWidth: "50px",
    // selector: row => row.id,
    cell: (row) => (
      <Badge
        style={{
          padding: "5px 10px",
          color: "#2b8a3e",
        }}
        color="light-success"
        pill
      >
        فعال
      </Badge>
    ),
  },

  {
    name: (
      <h6 style={{ fontWeight: "bolder", margin: "5px 0" }}>انجام عملیات</h6>
    ),
    allowOverflow: true,
    minWidth: "220px",
    // selector: row => row.id,
    cell: () => {
      return (
        <div style={{ display: "flex", justifyContent: "center", gap: "0px" }}>
          <UncontrolledDropdown
            style={{
              // border: "1px solid black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">جزییات</span>
              </DropdownItem>

              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Trash size={15} />
                <span className="align-middle ms-50">ویرایش</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Button size="sm" color="light-success" style={{ border: "none" }}>
            <XCircle />
          </Button>
        </div>
      );
    },
  },
];
