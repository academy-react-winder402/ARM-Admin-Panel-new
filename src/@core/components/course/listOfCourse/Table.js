import { Fragment } from "react";
import { Button, Card, CardBody } from "reactstrap";
import InvoiceList from "./InvoicList";

function Table() {
  return (
    <Fragment>
      <Card>
        <CardBody className="d-flex justify-content-between px-1 py-2 border">
          <h4>همه دوره ها</h4>
          <Button.Ripple color="primary">
            <span>اضافه کردن کاربر </span>
          </Button.Ripple>
        </CardBody>
        <InvoiceList />
      </Card>
    </Fragment>
  );
}

export default Table;
