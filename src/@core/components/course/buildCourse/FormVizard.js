import { Fragment, useState } from "react";
import { Row, Col } from "reactstrap";
import WizardHorizontal from "./WizardHorizontal";

function FormVizard() {
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <WizardHorizontal />
        </Col>
      </Row>
    </Fragment>
  );
}

export default FormVizard;
