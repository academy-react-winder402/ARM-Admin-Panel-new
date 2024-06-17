import { Fragment } from "react";
import { Button, Card, CardBody } from "reactstrap";
import InvoiceList from "./InvoicList";
import { Plus } from "react-feather";

function Table() {
  return (
    <Fragment>
      <Card>
        <CardBody className="d-flex justify-content-between px-1 py-2 border">
          <h4>لیست اخبار فعال</h4>
          <Button className="ms-2" color="primary">
            <span className="align-middle ms-50">اضافه کردن خبر جدید</span>
            <Plus size={15} />
          </Button>
        </CardBody>
        <InvoiceList />
      </Card>
    </Fragment>
  );
}

export default Table;
