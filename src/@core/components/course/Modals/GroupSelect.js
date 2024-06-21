// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Modal,
  Label,
  Input,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText,
} from "reactstrap";

// ** Third Party Components
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check, X, CreditCard } from "react-feather";
import { useForm, Controller } from "react-hook-form";

// ** Images
import jcbCC from "@src/assets/images/icons/payments/jcb-cc.png";
import amexCC from "@src/assets/images/icons/payments/amex-cc.png";
import uatpCC from "@src/assets/images/icons/payments/uatp-cc.png";
import visaCC from "@src/assets/images/icons/payments/visa-cc.png";
import dinersCC from "@src/assets/images/icons/payments/diners-cc.png";
import maestroCC from "@src/assets/images/icons/payments/maestro-cc.png";
import discoverCC from "@src/assets/images/icons/payments/discover-cc.png";
import mastercardCC from "@src/assets/images/icons/payments/mastercard-cc.png";

const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC,
};

const defaultValues = {
  cardNumber: "",
};

const AddCardExample = () => {
  // ** States
  const [show, setShow] = useState(false);
  const [cardType, setCardType] = useState("");

  // ** Hooks
  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if (data.cardNumber.length) {
      clearErrors();
    } else {
      setError("cardNumber", { type: "manual" });
    }
  };

  return (
    <Fragment>
      <Card>
        <CardBody className="text-center">
          <CreditCard className="font-large-2 mb-1" />
          <CardTitle tag="h5">Add New Card</CardTitle>
          <CardText>
            Quickly collect the credit card details, built in input mask and
            form validation support.
          </CardText>
          <Button color="primary" onClick={() => setShow(true)}>
            Show
          </Button>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AddCardExample;
