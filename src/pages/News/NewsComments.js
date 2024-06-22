// ** Reactstrap Imports
import {
  Button,
  Card,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown, Mail } from "react-feather";
// ** Custom Components
import Avatar from "@components/avatar";
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import http from "../../@core/interceptors/interceptors";
import { Form, Field, Formik } from "formik";

const NewsComments = ({ NewsId }) => {
  const [centeredModal, setCenteredModal] = useState(false);
  const [describe, setDescribe] = useState();
  const columns = [
    {
      sortable: true,
      minWidth: "300px",
      name: "اکانت",
      selector: (row) => row.title,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              <Avatar
                className="me-1 bg-primary opacity-50"
                alt={row.autor}
                // img={row.pictureAddress}
                imgWidth="32"></Avatar>
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">
                {row.autor ? row.autor : "نام کاربر"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      minWidth: "300px",
      name: " متن کامنت",
      selector: (row) => row.title,
    },
    {
      name: "تعداد لایک ها",
      selector: (row) => row.likeCount,
    },

    {
      name: " دسترسی",
      minWidth: "150px",
      // selector: (row) => row.progress,
      sortable: true,
      cell: (row) => {
        const AddReply = async (values) => {
          try {
            const AddReplyNews = await http.post(
              "/News/CreateNewsReplyComment",
              {
                NewsId: row.newsId,
                parentId: row.id,
                ...values,
              }
            );
            if (AddReplyNews.success) {
              toast.success(AddReplyNews.message);
            } else {
              toast.error(AddReplyNews.errors);
            }
            console.log(AddReplyNews);
          } catch (error) {
            console.log(error);
          }
        };

        return (
          <div className="vertically-centered-modal">
            <Button
              color="primary"
              outline
              onClick={() => setCenteredModal(!centeredModal)}>
              مشاهده{" "}
            </Button>
            <Modal
              isOpen={centeredModal}
              toggle={() => setCenteredModal(!centeredModal)}
              className="modal-dialog-centered">
              <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
                <h6 className="my-1"> عنوان : {row.title}</h6>
              </ModalHeader>
              <ModalBody>
                <h6> متن پیام : {row.describe}</h6>
              </ModalBody>{" "}
              <Formik
                onSubmit={(values) => AddReply(values)}
                initialValues={{ describe: "", title: "" }}
                enableReinitialize>
                <Form>
                  <ModalBody>
                    <div className="d-flex flex-column gap-1">
                      <Field
                        name={"title"}
                        type="text"
                        placeholder={"عنوان ریپلای را وارد کنید"}
                        label={" عنوان ریپلای"}
                        className={
                          "fs-6 bg-transparent border border-solid border-slate-800 px-1 py-1"
                        }
                      />
                      <Field
                        name={"describe"}
                        type="text"
                        placeholder={"متن ریپلای را وارد کنید"}
                        label={"متن ریپلای"}
                        className={
                          "fs-6 bg-transparent border border-solid border-slate-800 px-1 py-1"
                        }
                      />
                    </div>
                  </ModalBody>{" "}
                  <ModalFooter>
                    <Button
                      color="primary"
                      type="submit"
                      onClick={(e) => AddReply(e)}
                      // onClick={() => AddReply(row.newsId, row.id, describe)}
                    >
                      ارسال
                    </Button>{" "}
                  </ModalFooter>
                </Form>
              </Formik>
            </Modal>
          </div>
        );
      },
    },
  ];
  const [comments, setComments] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const countInPage = 8;
  const endOffset = itemOffset + countInPage;
  const currentItems = comments.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(comments.length / countInPage);

  const NewsParams = useParams();
  const fetchNewsData = async () => {
    try {
      const News = await http.get(
        `/News/GetAdminNewsComments?NewsId=${NewsParams.id}`
      );
      // const comments = News;
      setComments(News);
      console.log(News);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNewsData();
  }, []);

  const handlePagination = (page) => {
    const newOffset = (page.selected * countInPage) % comments.length;
    setItemOffset(newOffset);
    // setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    // const count = Math.ceil(detail.length / 5);
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        renderOnZeroPageCount={null}
        activeClassName="active"
        // forcePage={pageCount !== 0 && pageCount }
        onPageChange={handlePagination}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };
  return (
    <Card>
      <CardHeader tag="h4">
        <h4 className="d-flex gap-1 align-items-center">
          <Mail></Mail> نظرات کاربران
        </h4>
      </CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          pagination
          paginationServer
          paginationComponent={CustomPagination}
          responsive
          columns={columns}
          data={currentItems}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default NewsComments;
