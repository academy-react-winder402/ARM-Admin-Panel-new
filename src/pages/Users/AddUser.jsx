import { Fragment } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import Breadcrumbs from "@components/breadcrumbs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Input,
  Label,
  Row,
  Col,
  Button,
} from "reactstrap";

import FileUploaderMultiple from "../../@core/components/File Uploader/FileUploaderMultiple";

// api
import { AddUserAPI } from "../../@core/services/api/user/UsersApis";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  firstName: Yup.string().required("نام الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  password_: Yup.string().required("رمز عبور الزامی است"),
  email: Yup.string()
    .email("فرمت جیمیل صحیح نیست")
    .required("جیمیل الزامی است"),
  mobileNumber: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(
      /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
      "یک شماره موبایل صحیح وارد کنید"
    ),
});

const initialValues = {
  firstName: "",
  lastName: "",
  password_: "",
  email: "",
  mobileNumber: "",
};

const handleSubmit = async (value) => {
  try {
    //console.log(value);
    const AddUser = await AddUserAPI(value);
    toast(AddUser.message);
  } catch (error) {
    return error;
  }
};

const AddNews = () => {
  const navigate = useNavigate();
  const CancelHandler = () => {
    //alert();
    toast.error("اضافه کردن کاربر لغو شد");
    navigate("/users");
  };
  return (
    <Fragment>
      <Breadcrumbs
        title="ایجاد خبر جدید"
        data={[{ title: "لیست اخبار" }, { title: "ایجاد خبر جدید" }]}
      />
      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <CardBody>
                <Row>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label mb-1">نام</Label>
                    {errors.firstName && touched.firstName ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.firstName}
                      </div>
                    ) : null}
                    <Field
                      name="firstName"
                      type="text"
                      className={`form-control mb-1 ${
                        errors.firstName && touched.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="عنوان را وارد کنید"
                    />

                    <Label className="form-label mb-1">نام خانوادگی</Label>
                    {errors.lastName && touched.lastName ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.lastName}
                      </div>
                    ) : null}
                    <Field
                      name="lastName"
                      type="text"
                      className={`form-control mb-1 ${
                        errors.lastName && touched.lastName ? "is-invalid" : ""
                      }`}
                      placeholder="توضیح کوتاه را وارد کنید"
                    />

                    <Label className="form-label mb-1">رمز عبور</Label>
                    {errors.password_ && touched.password_ ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.password_}
                      </div>
                    ) : null}
                    <Field
                      name="password_"
                      type="password_"
                      autoComplete="off"
                      className={`form-control mb-1 ${
                        errors.password_ && touched.password_
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="رمز عبور را وارد کنید"
                    />
                  </Col>

                  <Col sm="6" className="mb-1">
                    <Label className="form-label mb-1">جیمیل</Label>
                    {errors.email && touched.email ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.email}
                      </div>
                    ) : null}
                    <Field
                      name="email"
                      type="email"
                      className={`form-control mb-1 ${
                        errors.email && touched.email ? "is-invalid" : ""
                      }`}
                      placeholder="جیمیل را وارد کنید"
                    />

                    <Label className="form-label mb-1">شماره موبایل</Label>
                    {errors.mobileNumber && touched.mobileNumber ? (
                      <div className="text-danger d-inline-block ms-1">
                        {errors.mobileNumber}
                      </div>
                    ) : null}
                    <Field
                      name="mobileNumber"
                      type="text"
                      className={`form-control mb-1 ${
                        errors.mobileNumber && touched.mobileNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="شماره موبایل را وارد کنید"
                    />
                  </Col>

                  <Col className="demo-inline-spacing">
                    <Button type="submit" color="primary">
                      ثبت کاربر
                    </Button>

                    <Button
                      type="button"
                      onClick={CancelHandler}
                      color="dark"
                      outline
                    >
                      لغو
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Form>
          )}
        </Formik>
      </Card>
    </Fragment>
  );
};

export default AddNews;
