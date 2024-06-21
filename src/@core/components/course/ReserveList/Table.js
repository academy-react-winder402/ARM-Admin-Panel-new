// ** React Imports
import { forwardRef, Fragment } from "react";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import Select from "react-select";

// ** Utils
import DateGenerator from "../../../services/Utils/DateGenerator";
import Badge from "../../‌Badge/Badge";

import AddCardExample from "../Modals/GroupSelect";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

// ** Avatars
import CourseBlank from "../../../assets/images/avatars/Course-Blank.png";

// Apis
import { DeleteReserve } from "../../../services/api/Course/Courses";
import { getGetCourseGroupAPI } from "../../../services/api/Course/Courses";
import { SendReserveToCourse } from "../../../services/api/Course/Courses";

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Controller, useForm } from "react-hook-form";
import Cleave from "cleave.js/react";

const UsersListTable = ({ users, refetch, setRefetch, teacherId }) => {
  const MySwal = withReactContent(Swal);
  const [show, setShow] = useState(false);
  const [cardType, setCardType] = useState("");

  // this is for api fields
  const [Group, setGroup] = useState([]);
  const [SelectGroup, setSelectGroup] = useState({});
  const [CourseId, setCourseId] = useState("");
  const [UserId, setUserId] = useState("");

  const GetGroup = async (CourseId) => {
    const GroupRes = await getGetCourseGroupAPI(teacherId, CourseId);
    setSelectGroup(GroupRes[0]);
    console.log(GroupRes);
    setGroup(GroupRes);
  };

  const defaultValues = {
    cardNumber: "",
  };
  const { handleSubmit } = useForm({ defaultValues });

  const handleDelete = async (id) => {
    MySwal.fire({
      title: "آیا از رد کردن این رزرو مطمئن هستید؟",
      icon: "warning",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "رد کردن",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      async preConfirm() {
        const deleteReserve = await DeleteReserve(id);

        if (deleteReserve.success) {
          setRefetch(!refetch);
          toast.success("رزور دوره با موفقیت رد شد !");
        } else {
          toast.error(
            "به دلیل اینکه این کاربر در دوره افزوده شده قادر به حذف رزرو نمی باشید."
          );
        }
      },
    });
  };

  const handleReservSubmit = async (groupId) => {
    console.log("group id", groupId);
    console.log("CourseId id", CourseId);
    console.log("UserId id", UserId);

    const res = await SendReserveToCourse(CourseId, groupId, UserId);
    if (res.success) {
      toast.success("رزرو دوره مورد نظر تایید شد");
      setShow(false);
      setRefetch(!refetch);
    }
  };

  const CourseCol = [
    {
      name: "نام  رزرو کننده",
      sortable: true,
      width: "180px",
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
              lineHeight: "40px",
            }}
          >
            {row.studentName}
          </p>
        </Link>
      ),
    },
    {
      name: "نام  دوره",
      sortable: true,
      width: "160px",
      //selector: (row) => row.fname,
      cell: (row) => (
        <p
          style={{
            fontSize: "13px",
            marginTop: "15px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "40px",
          }}
        >
          {row.courseName}
        </p>
      ),
    },
    {
      name: "تاریخ رزرو",
      sortable: true,
      width: "140px",
      //selector: (row) => row.fname,
      cell: (row) => (
        <p
          style={{
            fontSize: "12px",
            marginTop: "15px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "40px",
          }}
        >
          {DateGenerator(row.reserverDate)}
        </p>
      ),
    },
    {
      name: "وضعیت رزور",
      sortable: true,
      width: "120px",
      //selector: (row) => row.fname,
      cell: (row) => (
        <p
          style={{
            fontSize: "15px",
            marginTop: "15px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "40px",
          }}
        >
          {row.accept ? (
            <Badge innerHtml="قبول شده" status="Active" />
          ) : (
            <Badge innerHtml="قبول نشده" status="inActive" />
          )}
        </p>
      ),
    },
    {
      sortable: true,
      width: "200px",
      //selector: (row) => row.fname,
      cell: (row) => (
        <>
          <Button
            style={{ scale: "0.8" }}
            onClick={() => {
              setShow(true);
              setCourseId(row.courseId);
              setUserId(row.studentId);
              GetGroup(row.courseId);
            }}
          >
            تایید
          </Button>
          <Button
            style={{ scale: "0.8" }}
            onClick={() => handleDelete(row.reserveId)}
          >
            ردکردن
          </Button>
        </>
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
            data={users}
            noDataComponent={<span className="my-2">کاربری یافت نشد !</span>}
          />
        </div>
        <Modal
          isOpen={show}
          toggle={() => setShow(!show)}
          className="modal-dialog-centered Font-Iran"
          onClosed={() => setCardType("")}
        >
          <ModalHeader
            className="bg-transparent"
            toggle={() => setShow(!show)}
          ></ModalHeader>
          <ModalBody className="px-sm-5 mx-50 pb-5">
            <h1 className="text-center mb-1">یک گروه انتخاب کنید</h1>

            <Row tag="form" className="gy-1 gx-2 mt-75" onSubmit={handleSubmit}>
              <Col className="text-center mt-1" xs={12}>
                <Input id="exampleSelect" name="select" type="select">
                  {Group.map((item, key) => (
                    <option onClick={() => setSelectGroup(item)} key={key}>
                      {item.groupName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col className="text-center mt-1" xs={12}>
                <Button
                  className="me-1"
                  color="primary"
                  onClick={() => handleReservSubmit(SelectGroup.groupId)}
                >
                  تایید
                </Button>
                <Button
                  color="secondary"
                  outline
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  لغو انتخاب
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Card>
    </Fragment>
  );
};

export default UsersListTable;
