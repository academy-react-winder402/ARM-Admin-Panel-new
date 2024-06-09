// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import { ArrowLeft, CheckCircle } from "react-feather";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

const defaultValues = {
  twitter: "",
};

const SocialLinks = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      alert("submitted");
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
            message: `Please enter a valid ${key} url`,
          });
        }
      }
    }
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="twitter">
              توضیحات دوره
            </Label>
            <Controller
              id="twitter"
              name="twitter"
              control={control}
              render={({ field }) => (
                // <Input
                //   placeholder="https://twitter.com/johndoe"
                //   invalid={errors.twitter && true}
                //   {...field}
                // />
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  rows="3"
                  placeholder="نوعی زبان برنامه نویسی است...."
                />
              )}
            />
            {errors.twitter && (
              <FormFeedback>{errors.twitter.message}</FormFeedback>
            )}
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              قدم قبلی
            </span>
          </Button>
          <Button type="submit" color="success" className="btn-submit">
            <span>ثبت تغییرات</span>
            <CheckCircle size={14} />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SocialLinks;
