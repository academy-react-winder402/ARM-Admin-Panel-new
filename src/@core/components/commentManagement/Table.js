import React, { Fragment, useEffect, useState } from "react";
import { MoreVertical, Edit, Trash, FileText, Eye } from "react-feather";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Tooltip,
} from "reactstrap";
import Avatar from "@components/avatar";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";
import Sidebar from "./Sidebar";
import {
  accComment,
  addReply,
  decComment,
  delComment,
  getComment,
  getRepComnt,
} from "../../../@core/services/api/panelAdmin";
import CustomHeader from "./CustomHeader/CustomHeader";
import { useDispatch, useSelector } from "react-redux";
import { CustomPagination } from "../pagination";
import CommntModal from "./commentModall/comModal";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import ReplyComment from "./reply/ReplyCom";
import toast from "react-hot-toast";

const UsersList = () => {
  const [list, setList] = useState([]);
  const [searched, setSearched] = useState("");
  const [totalcount, setTotalCount] = useState("");
  const [currentPage, setCurrentPage] = useState("1");
  const [rowsPerPage, setRowPerPage] = useState("10");
  const [sortCol, setSortCol] = useState({
    value: null,
    label: "انتخاب کنید...",
  });
  const [accepted, setAccepted] = useState({
    value: null,
    label: "انتخاب کنید...",
  });
  const [comModal, setComModal] = useState(false);
  const [repCom, setRepCom] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState({});
  const [refetch, setRefetch] = useState(true);
  const [crsid, setCrsid] = useState(null);
  const [cmntid, setCmntid] = useState(null);
  const [describe, setDescribe] = useState("");
  const [repShow, setRepShow] = useState(false);

  const sort = sortCol.value;
  const accept = accepted.value;

  const allComment = async (search, currentPage, rowsPerPage, accept, sort) => {
    try {
      const getCommentListt = await getComment(
        search,
        currentPage,
        rowsPerPage,
        accept,
        sort
      );
      setList(getCommentListt.comments);
      setTotalCount(getCommentListt.totalCount);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  useEffect(() => {
    allComment(searched, currentPage, rowsPerPage, accept, sort);
  }, [searched, currentPage, rowsPerPage, accept, sort, refetch]);

  useEffect(() => {
    if (crsid && cmntid) {
      handleReplyComment(crsid, cmntid);
    }
  }, [refetch, crsid, cmntid]);

  const handleReplyComment = async (crsid, cmntid) => {
    try {
      const res = await getRepComnt(crsid, cmntid);
      setRepCom(res);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleAcceptComment = async (e) => {
    try {
      const res = await accComment(e);
      res.success && setRefetch((old) => !old);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleDeclineComment = async (e) => {
    try {
      const res = await decComment(e);
      res.success && setRefetch((old) => !old);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleDeleteComment = async (e) => {
    try {
      const res = await delComment(e);
      res.success && setRefetch((old) => !old);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const toggleTooltip = (id) => {
    setTooltipOpen({ ...tooltipOpen, [id]: !tooltipOpen[id] });
  };

  const addReplyComment = async (e) => {
    try {
      const dataa = { ...e, CourseId: crsid, CommentId: cmntid };
      const data = new FormData();
      const keys = Object.keys(dataa);
      keys.forEach((key) => {
        const item = dataa[key];
        data.append(key, item);
      });
      const res = await addReply(data);
      res.success ? toast.success(res.message) : toast.error(res.message);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const isAcceptOptions = [
    { value: null, label: "انتخاب کنید..." },
    { value: true, label: "تایید شده" },
    { value: false, label: "تایید نشده" },
  ];

  const statusOptions = [
    { value: null, label: "انتخاب کنید..." },
    { value: "replyCount", label: "تعداد ریپلی" },
  ];

  const AscDescOptions = [
    { value: null, label: "انتخاب کنید..." },
    { value: "ASC", label: "صعودی" },
    { value: "DESC", label: "نزولی" },
  ];

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowPerPage(value);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                value={accepted}
                options={isAcceptOptions}
                onChange={(data) => setAccepted(data)}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={sortCol}
                onChange={(data) => setSortCol(data)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <div className="react-dataTable">
          <CustomHeader
            toggleSidebar={toggleSidebar}
            setSearched={setSearched}
            handlePerPage={handlePerPage}
            rowsPerPage={rowsPerPage}
            setRowPerPage={setRowPerPage}
          />
          <Table hover>
            <thead>
              <tr>
                <th>کاربر</th>
                <th>عنوان کامنت</th>
                <th>نمایش کامنت</th>
                <th> دوره</th>
                <th> وضعیت</th>
                <th className="px-0"> پاسخ ها</th>
                <th> اقدام</th>
              </tr>
            </thead>
            {list &&
              list.map((item, index) => {
                const tooltipId = `tooltip-${index}`;
                return (
                  <tbody key={index}>
                    <tr>
                      <td
                        className=" px-0 "
                        style={{
                          maxWidth: "130px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <span>{item.userFullName}</span>
                      </td>
                      <td className="pr-0 pl-1" style={{ maxWidth: "150px" }}>
                        {item.commentTitle}
                      </td>
                      <td
                        className="pr-0 pl-1"
                        id={tooltipId}
                        style={{
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Tooltip
                          placement="top"
                          isOpen={tooltipOpen[tooltipId]}
                          toggle={() => toggleTooltip(tooltipId)}
                          innerClassName="table-tooltip"
                          target={tooltipId}
                        >
                          {item.describe}
                        </Tooltip>
                        {item.describe}
                      </td>
                      <td className="px-0">{item.courseTitle}</td>
                      <td className="px-0 text-center">
                        {item.accept === true ? (
                          <Badge pill color="light-success" className="me-1">
                            تایید شده
                          </Badge>
                        ) : (
                          <Badge pill color="light-warning" className="me-1">
                            تایید نشده
                          </Badge>
                        )}
                      </td>
                      <td
                        className="p-0 text-center"
                        style={{
                          maxWidth: "20px",
                          minWidth: "20px",
                        }}
                      >
                        {item.replyCount > 0 ? (
                          <Eye
                            style={{ width: "18px", height: "16px" }}
                            onClick={() => {
                              setComModal(!comModal);
                              setCrsid(item.courseId);
                              setCmntid(item.commentId);
                              handleReplyComment(item.courseId, item.commentId);
                              setDescribe(item.describe);
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-0 text-center">
                        <UncontrolledDropdown direction="start">
                          <DropdownToggle
                            className="icon-btn hide-arrow"
                            color="transparent"
                            size="sm"
                            caret
                          >
                            <MoreVertical size={15} />
                          </DropdownToggle>
                          {item.accept === false ? (
                            <DropdownMenu className="d-flex flex-column p-0  ">
                              <DropdownItem
                                onClick={(e) => {
                                  handleAcceptComment(item.commentId);
                                }}
                              >
                                <FileText className="me-50" size={15} />{" "}
                                <span className="align-middle">تایید</span>
                              </DropdownItem>

                              <DropdownItem
                                onClick={(e) => {
                                  handleDeleteComment(item.commentId);
                                }}
                              >
                                <Trash className="me-50" size={15} />{" "}
                                <span className="align-middle">حذف</span>
                              </DropdownItem>
                            </DropdownMenu>
                          ) : (
                            <DropdownMenu className="d-flex flex-column p-0 ">
                              <DropdownItem
                                onClick={(e) => {
                                  handleDeclineComment(item.commentId);
                                }}
                              >
                                <Edit className="me-50" size={15} />{" "}
                                <span className="align-middle">رد کردن</span>
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  handleDeleteComment(item.commentId);
                                }}
                              >
                                <Trash className="me-50" size={15} />{" "}
                                <span className="align-middle">حذف</span>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setRepShow(!repShow);
                                  addReplyComment();
                                  setCrsid(item.courseId);
                                  setCmntid(item.commentId);
                                }}
                              >
                                <Trash className="me-50" size={15} />{" "}
                                <span className="align-middle">پاسخ</span>
                              </DropdownItem>
                            </DropdownMenu>
                          )}
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </div>
      </Card>
      <CustomPagination
        total={totalcount}
        current={currentPage}
        setCurrent={setCurrentPage}
        rowsPerPage={rowsPerPage}
      />
      <CommntModal
        setComModal={setComModal}
        comModal={comModal}
        repCom={repCom}
        handleAcceptComment={handleAcceptComment}
        handleDeclineComment={handleDeclineComment}
        handleDeleteComment={handleDeleteComment}
        describe={describe}
      />
      <ReplyComment
        repShow={repShow}
        setRepShow={setRepShow}
        addReplyComment={addReplyComment}
      />
    </Fragment>
  );
};

export default UsersList;
