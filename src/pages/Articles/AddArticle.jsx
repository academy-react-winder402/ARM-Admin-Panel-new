import { Fragment, useEffect, useState } from "react";
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
import { getNewsCatAPI } from "../../@core/services/api/Articles/Article";
import { AddNewsApi } from "../../@core/services/api/Articles/Article";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialValues = {
  Title: "",
  GoogleTitle: "",
  GoogleDescribe: "",
  Describe: "",
  NewsCatregoryId: "",
  MiniDescribe: "",
  Keyword: "",
};

const validationSchema = Yup.object({
  Title: Yup.string()
    .required("عنوان الزامی است")
    .min(10, "حداقل باید 10 کاراکتر باشد")
    .max(120, "حداکثر می‌تواند 120 کاراکتر باشد"),
  GoogleTitle: Yup.string()
    .required("عنوان گوگل الزامی است")
    .min(50, "حداقل باید 50 کاراکتر باشد")
    .max(120, "حداکثر می‌تواند 120 کاراکتر باشد"),
  GoogleDescribe: Yup.string()
    .required("عنوان گوگل الزامی است")
    .min(70, "حداقل باید 70 کاراکتر باشد")
    .max(120, "حداکثر می‌تواند 120 کاراکتر باشد"),
  Describe: Yup.string()
    .required("توضیحات الزامی است")
    .min(70, "حداقل باید 70 کاراکتر باشد")
    .max(120, "حداکثر می‌تواند 120 کاراکتر باشد"),
  NewsCatregoryId: Yup.string().required("دسته بندی خبر الزامی است"),
  MiniDescribe: Yup.string().required("توضیحات کوتاه الزامی است"),
  Keyword: Yup.string().required("کلمه کلیدی الزامی است"),
});

const AddNews = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const AddNew = await AddNewsApi(formData);
    if (AddNew.success) {
      toast.success(AddNew.message);
      navigate("/Articles");
    } else {
      toast.error(AddNew.message);
    }
  };

  const [Category, setCategory] = useState([]);
  const GetNewCat = async () => {
    const NewsCat = await getNewsCatAPI();
    console.log(NewsCat);
    setCategory(NewsCat);
  };

  useEffect(() => {
    GetNewCat();
  }, []);

  return (
    <Fragment>
      <Breadcrumbs
        title="ایجاد خبر جدید"
        data={[{ title: "لیست اخبار" }, { title: "ایجاد خبر جدید" }]}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                      <option value={null}>انتخاب دسته بندی</option>
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
                    <Button type="button" color="dark" outline>
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

export default AddNews;
