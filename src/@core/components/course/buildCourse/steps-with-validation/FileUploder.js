import { Fragment } from "react";
import { Row, Col } from "reactstrap";
import FileUploaderMultiple from "./FileUploaderMultiple";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Button } from "reactstrap";

function FileUploder({ stepper }) {
  const onSubmit = () => {
    // if (isObjEmpty(errors)) {
    stepper.next();
    // }
  };
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <FileUploaderMultiple />
        </Col>

        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              قدم قبلی
            </span>
          </Button>
          <Button onClick={onSubmit} color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              قدم بعدی
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Row>
    </Fragment>
  );
}

export default FileUploder;
