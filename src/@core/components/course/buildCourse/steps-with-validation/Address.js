// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { isObjEmpty } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

const defaultValues = {
  city: "",
  pincode: "",
  address: "",
  landmark: "",
};

const Address = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next();
    }
  };
  const colourOptions = [
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
  ];

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="address">
              مکان برگذاری دوره
            </Label>
            <Controller
              id="address"
              name="address"
              control={control}
              render={() => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  options={colourOptions}
                  isClearable={false}
                />
              )}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="address">
              کلاس دوره
            </Label>
            <Controller
              id="address"
              name="address"
              control={control}
              render={() => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  options={colourOptions}
                  isClearable={false}
                />
              )}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="address">
              ترم دوره
            </Label>
            <Controller
              id="address"
              name="address"
              control={control}
              render={() => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  options={colourOptions}
                  isClearable={false}
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="address">
              سطح برگذاری
            </Label>
            <Controller
              id="address"
              name="address"
              control={control}
              render={() => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  options={colourOptions}
                  isClearable={false}
                />
              )}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="address">
              مدرس دوره
            </Label>
            <Controller
              id="address"
              name="address"
              control={control}
              render={() => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  options={colourOptions}
                  isClearable={false}
                />
              )}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="address">
              لینک دوره
            </Label>
            <Controller
              id="address"
              name="address"
              control={control}
              render={() => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  options={colourOptions}
                  isClearable={false}
                />
              )}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
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

export default Address;
