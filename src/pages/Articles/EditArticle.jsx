import { Fragment, useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import Breadcrumbs from "@components/breadcrumbs";
import { Card, CardBody, Label, Row, Col, Button } from "reactstrap";

import {
  getNewsCatAPI,
  getNewsByIdAPI,
  UpdateNewsApi,
} from "../../@core/services/api/Articles/Article";

import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const validationSchema = Yup.object({
  Title: Yup.string()
    .required("عنوان الزامی است")
    .min(10, "حداقل باید 10 کاراکتر باشد")
    .max(120, "حداکثر می‌تواند 120 کاراکتر باشد"),
  GoogleTitle: Yup.string()
    .required("عنوان گوگل الزامی است")
    .min(40, "حداقل باید 40 کاراکتر باشد")
    .max(120, "حداکثر می‌تواند 120 کاراکتر باشد"),
  GoogleDescribe: Yup.string()
    .required("عنوان گوگل الزامی است")
    .min(70, "حداقل باید 70 کاراکتر باشد"),
  Describe: Yup.string()
    .required("توضیحات الزامی است")
    .min(70, "حداقل باید 70 کاراکتر باشد"),
  NewsCatregoryId: Yup.string().required("دسته بندی خبر الزامی است"),
  MiniDescribe: Yup.string().required("توضیحات کوتاه الزامی است"),
  Keyword: Yup.string().required("کلمه کلیدی الزامی است"),
});

const EditNews = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [Category, setCategory] = useState([]);
  const [initialValues, setInitialValues] = useState(null); // Changed to null initially

  const handleSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const UpdateNews = await UpdateNewsApi(formData);
    console.log(formData);
    if (UpdateNews.success) {
      toast.success(UpdateNews.message);
      navigate("/Articles");
    } else {
      toast.error(UpdateNews.message);
    }
  };

  const MySwal = withReactContent(Swal);
  const handleDeleteCourseComment = () => {
    MySwal.fire({
      title: "آیا از لغو ویرایش خبر مطمئن هستید؟",
      text: "در صورت  لغو فرایند ویرایش، اطلاعات ویرایش شد حذف میشوند",
      icon: "warning",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
        container: "Font-Iran",
      },
      buttonsStyling: false,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      showLoaderOnConfirm: true,
      confirmButton: () => {
        alert();
      },
      /* async preConfirm() {
        const deleteCourseComment = await deleteCourseCommentAPI(row.id);

        if (deleteCourseComment.success) {
          setRefetch(!refetch);

          toast.success("نظر با موفقیت حذف شد !");
        }
      }, */
    }).then(function (result) {
      if (result.value) {
        navigate("/articles");
        MySwal.fire({
          icon: "success",
          title: "فرایند ویرایش کاربر لغو شد",
          customClass: {
            container: "Font-Iran",
            confirmButton: "btn btn-success",
          },
          confirmButtonText: "باشه",
        });
      }
    });
  };

  const GetNewCat = async () => {
    const NewsCat = await getNewsCatAPI();
    setCategory(NewsCat);
  };

  const GetNewDetail = async () => {
    const GetNew = await getNewsByIdAPI(param.id);
    setInitialValues({
      Id: GetNew.detailsNewsDto.id,
      Active: true,
      Title: GetNew.detailsNewsDto.title,
      GoogleTitle: GetNew.detailsNewsDto.googleTitle,
      GoogleDescribe: GetNew.detailsNewsDto.googleDescribe,
      Describe: GetNew.detailsNewsDto.describe,
      NewsCatregoryId: GetNew.detailsNewsDto.newsCatregoryId,
      MiniDescribe: GetNew.detailsNewsDto.miniDescribe,
      Keyword: GetNew.detailsNewsDto.keyword,
    });
  };

  useEffect(() => {
    GetNewDetail();
    GetNewCat();
  }, []);

  // Conditional rendering to ensure initialValues are set before rendering Formik
  if (!initialValues) {
    return <div>Loading...</div>; // Loading state while fetching initialValues
  }

  return (
    <Fragment>
      <Breadcrumbs
        title="ویرایش خبر"
        data={[{ title: "لیست اخبار" }, { title: " ویرایش خبر " }]}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // This allows Formik to reinitialize with new initialValues
      >
        {({ errors, touched }) => (
          <Form>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label mb-1">عنوان</Label>
                    {errors.Title && touched.Title ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.Title}
                      </div>
                    ) : null}
                    <Field
                      name="Title"
                      type="text"
                      className={`form-control mb-1 ${
                        errors.Title && touched.Title ? "is-invalid" : ""
                      }`}
                      placeholder="عنوان را وارد کنید"
                    />

                    <Label className="form-label mb-1">توضیحات گوگل</Label>
                    {errors.GoogleDescribe && touched.GoogleDescribe ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.GoogleDescribe}
                      </div>
                    ) : null}
                    <Field
                      name="GoogleDescribe"
                      type="text"
                      className={`form-control mb-1 ${
                        errors.GoogleDescribe && touched.GoogleDescribe
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="عنوان گوگل را وارد کنید"
                    />

                    <Label className="form-label mb-1">توضیحات</Label>
                    {errors.Describe && touched.Describe ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.Describe}
                      </div>
                    ) : null}
                    <Field
                      name="Describe"
                      as="textarea"
                      rows="3"
                      className={`form-control mb-2 ${
                        errors.Describe && touched.Describe ? "is-invalid" : ""
                      }`}
                      placeholder="توضیحات را وارد کنید"
                    />

                    <Label className="form-label mb-1">دسته بندی خبر</Label>
                    {errors.NewsCatregoryId && touched.NewsCatregoryId ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.NewsCatregoryId}
                      </div>
                    ) : null}
                    <Field
                      name="NewsCatregoryId"
                      as="select"
                      className={`form-control ${
                        errors.NewsCatregoryId && touched.NewsCatregoryId
                          ? "is-invalid"
                          : ""
                      }`}
                      id="exampleSelect"
                    >
                      {Category.map((item, key) => (
                        <option value={item.id} key={key}>
                          {item.categoryName}
                        </option>
                      ))}
                    </Field>
                  </Col>

                  <Col sm="6" className="mb-1">
                    <Label className="form-label mb-1">عنوان گوگل</Label>
                    {errors.GoogleTitle && touched.GoogleTitle ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.GoogleTitle}
                      </div>
                    ) : null}
                    <Field
                      name="GoogleTitle"
                      type="text"
                      className={`form-control mb-1 ${
                        errors.GoogleTitle && touched.GoogleTitle
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="عنوان گوگل را وارد کنید"
                    />

                    <Label className="form-label mb-1">توضیحات کوتاه</Label>
                    {errors.MiniDescribe && touched.MiniDescribe ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.MiniDescribe}
                      </div>
                    ) : null}
                    <Field
                      name="MiniDescribe"
                      type="text"
                      className={`form-control mb-1 ${
                        errors.MiniDescribe && touched.MiniDescribe
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="توضیحات کوتاه را وارد کنید"
                    />

                    <Label className="form-label mb-1">کلمه کلیدی</Label>
                    {errors.Keyword && touched.Keyword ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.Keyword}
                      </div>
                    ) : null}
                    <Field
                      name="Keyword"
                      type="text"
                      className={`form-control mb-1 ${
                        errors.Keyword && touched.Keyword ? "is-invalid" : ""
                      }`}
                      placeholder="کلمه کلیدی را وارد کنید"
                    />
                  </Col>

                  <Col className="demo-inline-spacing">
                    <Button type="submit" color="primary">
                      ثبت تغییرات
                    </Button>
                    <Button
                      type="button"
                      onClick={handleDeleteCourseComment}
                      color="dark"
                      outline
                    >
                      لغو
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default EditNews;
