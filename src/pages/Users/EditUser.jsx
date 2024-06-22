import { Fragment } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import Breadcrumbs from "@components/breadcrumbs";
import { Card, CardBody, Label, Row, Col, Button } from "reactstrap";

import { AddUserAPI } from "../../@core/services/api/user/UsersApis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  aboutUser: Yup.string().required("درباره کاربر الزامی است"),
  birthDate: Yup.date().required("تاریخ تولد الزامی است"),
  nationalId: Yup.string().required("کد ملی الزامی است"),
  telegramLink: Yup.string()
    .url("لینک تلگرام صحیح نیست")
    .required("لینک تلگرام الزامی است"),
  linkedinAddress: Yup.string()
    .url("آدرس لینکدین صحیح نیست")
    .required("آدرس لینکدین الزامی است"),
  homeAddress: Yup.string().required("آدرس منزل الزامی است"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  password_: "",
  email: "",
  mobileNumber: "",
  aboutUser: "",
  birthDate: "",
  nationalId: "",
  telegramLink: "",
  linkedinAddress: "",
  homeAddress: "",
};

const handleSubmit = async (values) => {
  try {
    const AddUser = await AddUserAPI(values);
    toast(AddUser.message);
  } catch (error) {
    toast.error("خطایی رخ داده است");
    return error;
  }
};

const EditUser = () => {
  const navigate = useNavigate();
  const CancelHandler = () => {
    toast.error("اضافه کردن کاربر لغو شد");
    navigate("/users");
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="ایجاد کاربر جدید"
        data={[{ title: "لیست کاربران" }, { title: "ایجاد کاربر جدید" }]}
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
                    <div className="d-flex align-items-center">
                      <Label className="form-label mb-1">نام</Label>
                      {errors.firstName && touched.firstName && (
                        <div className="text-danger ms-2 mb-1">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <Field
                      name="firstName"
                      type="text"
                      className={`form-control ${
                        errors.firstName && touched.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="نام را وارد کنید"
                    />

                    <div className="d-flex align-items-center mt-2">
                      <Label className="form-label mb-1">نام خانوادگی</Label>
                      {errors.lastName && touched.lastName && (
                        <div className="text-danger ms-2 mb-1">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                    <Field
                      name="lastName"
                      type="text"
                      className={`form-control ${
                        errors.lastName && touched.lastName ? "is-invalid" : ""
                      }`}
                      placeholder="نام خانوادگی را وارد کنید"
                    />

                    <div className="d-flex align-items-center mt-2">
                      <Label className="form-label mb-1">درباره کاربر</Label>
                      {errors.aboutUser && touched.aboutUser && (
                        <div className="text-danger ms-2">
                          {errors.aboutUser}
                        </div>
                      )}
                    </div>
                    <Field
                      name="aboutUser"
                      type="text"
                      className={`form-control ${
                        errors.aboutUser && touched.aboutUser
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="درباره کاربر را وارد کنید"
                    />

                    <div className="d-flex align-items-center mt-2">
                      <Label className="form-label mb-1">تاریخ تولد</Label>
                      {errors.birthDate && touched.birthDate && (
                        <div className="text-danger ms-2">
                          {errors.birthDate}
                        </div>
                      )}
                    </div>
                    <Field
                      name="birthDate"
                      type="date"
                      className={`form-control ${
                        errors.birthDate && touched.birthDate
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="تاریخ تولد را وارد کنید"
                    />

                    <div className="d-flex align-items-center mt-2">
                      <Label className="form-label mb-1">کد ملی</Label>
                      {errors.nationalId && touched.nationalId && (
                        <div className="text-danger ms-2">
                          {errors.nationalId}
                        </div>
                      )}
                    </div>
                    <Field
                      name="nationalId"
                      type="text"
                      className={`form-control ${
                        errors.nationalId && touched.nationalId
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="کد ملی را وارد کنید"
                    />
                  </Col>

                  <Col sm="6" className="mb-1">
                    <div className="d-flex align-items-center">
                      <Label className="form-label mb-1">جیمیل</Label>
                      {errors.email && touched.email && (
                        <div className="text-danger ms-2">{errors.email}</div>
                      )}
                    </div>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${
                        errors.email && touched.email ? "is-invalid" : ""
                      }`}
                      placeholder="جیمیل را وارد کنید"
                    />

                    <div className="d-flex align-items-center mt-2">
                      <Label className="form-label mb-1">شماره موبایل</Label>
                      {errors.mobileNumber && touched.mobileNumber && (
                        <div className="text-danger ms-2">
                          {errors.mobileNumber}
                        </div>
                      )}
                    </div>
                    <Field
                      name="mobileNumber"
                      type="text"
                      className={`form-control ${
                        errors.mobileNumber && touched.mobileNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="شماره موبایل را وارد کنید"
                    />

                    <div className="d-flex align-items-center mt-2">
                      <Label className="form-label mb-1">لینک تلگرام</Label>
                      {errors.telegramLink && touched.telegramLink && (
                        <div className="text-danger ms-2">
                          {errors.telegramLink}
                        </div>
                      )}
                    </div>
                    <Field
                      name="telegramLink"
                      type="text"
                      className={`form-control ${
                        errors.telegramLink && touched.telegramLink
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="لینک تلگرام را وارد کنید"
                    />

                    <div className="d-flex align-items-center mt-2">
                      <Label className="form-label mb-1">آدرس لینکدین</Label>
                      {errors.linkedinAddress && touched.linkedinAddress && (
                        <div className="text-danger ms-2">
                          {errors.linkedinAddress}
                        </div>
                      )}
                    </div>
                    <Field
                      name="linkedinAddress"
                      type="text"
                      className={`form-control ${
                        errors.linkedinAddress && touched.linkedinAddress
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="آدرس لینکدین را وارد کنید"
                    />

                    <div className="d-flex align-items-center mt-2">
                      <Label className="form-label mb-1">آدرس منزل</Label>
                      {errors.homeAddress && touched.homeAddress && (
                        <div className="text-danger ms-2">
                          {errors.homeAddress}
                        </div>
                      )}
                    </div>
                    <Field
                      name="homeAddress"
                      type="text"
                      className={`form-control ${
                        errors.homeAddress && touched.homeAddress
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="آدرس منزل را وارد کنید"
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

export default EditUser;
