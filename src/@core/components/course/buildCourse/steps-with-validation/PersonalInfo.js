/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment } from "react";
import Cleave from "cleave.js/react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

const defaultValues = {
  courseName: "",
  price: "",
  capacity: "",
  // shortDes: "",
  // numberOfseasion: "",
  // date: "",
  // password: "",
};

const PersonalInfo = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    courseName: yup.string().required(),
    price: yup.string().required(),
    capacity: yup.string().required(),
    // shortDes: yup.string().required(),
    // numberOfseasion: yup.string().required(),
    // date: yup.string().required(),
    // password: yup.string().required(),
    // confirmPassword: yup
    //   .string()
    //   .required()
    //   .oneOf([yup.ref(`password`), null], "Passwords must match"),
  });
  const options = { date: true, delimiter: "-", datePattern: ["Y", "m", "d"] };

  // ** Hooks

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next();
    }
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="courseName">
              نام دوره
            </Label>
            <Controller
              id="courseName"
              name="courseName"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="دوره ری اکت"
                  invalid={errors.courseName && true}
                  {...field}
                />
              )}
            />
            {errors.courseName && (
              <FormFeedback>{errors.courseName.message}</FormFeedback>
            )}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`price`}>
              قیمت دوره
            </Label>
            <Controller
              control={control}
              id="price"
              name="price"
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="25000"
                  invalid={errors.price && true}
                  {...field}
                />
              )}
            />
            {errors.price && (
              <FormFeedback>{errors.price.message}</FormFeedback>
            )}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`capacity`}>
              ظرفیت دوره
            </Label>
            <Controller
              control={control}
              id="capacity"
              name="capacity"
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="12"
                  invalid={errors.capacity && true}
                  {...field}
                />
              )}
            />
            {errors.capacity && (
              <FormFeedback>{errors.capacity.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-4 mb-1">
            <Label className="form-label" for="shortDes">
              توضیحات کوتاه دوره
            </Label>
            <Controller
              id="shortDes"
              name="shortDes"
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  placeholder="نوعی زبان برنامه نویسی است"
                  invalid={errors.lastName && true}
                  name="text"
                  id="exampleText"
                  rows="3"
                  {...field}
                  style={{ minHeight: "80px" }}
                />
              )}
            />
            {errors.shortDes && (
              <FormFeedback>{errors.shortDes.message}</FormFeedback>
            )}
          </div>
          <div className="form-password-toggle col-md-4 mb-1">
            <Label className="form-label" for="numberOfseasion">
              تعداد جلسات دوره
            </Label>
            <Controller
              control={control}
              id="numberOfseasion"
              name="numberOfseasion"
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="12"
                  invalid={errors.lastName && true}
                  {...field}
                />
              )}
            />
            {errors.numberOfseasion && (
              <FormFeedback>{errors.numberOfseasion.message}</FormFeedback>
            )}
          </div>
          <div className="form-password-toggle col-md-4 mb-1">
            <Label className="form-label" for="date">
              زمان برگذاری
            </Label>
            <Controller
              control={control}
              id="date"
              name="date"
              render={({ field }) => (
                <Cleave
                  className="form-control"
                  placeholder="2001-01-01"
                  options={options}
                />
              )}
            />
            {errors.date && <FormFeedback>{errors.date.message}</FormFeedback>}
          </div>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default PersonalInfo;
