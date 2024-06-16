// ** Reactstrap Imports
import { Card, CardBody, CardText } from "reactstrap";

const ActiveBadge = () => {
  return (
    <span
      style={{
        color: "#27BD6B",
        width: "60px",
        display: "block",
        backgroundColor: "#28424B",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      فعال
    </span>
  );
};
const DiActiveBadge = () => {
  return (
    <span
      style={{
        color: "#6a040f",
        width: "60px",
        display: "block",
        backgroundColor: "",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      غیر فعال
    </span>
  );
};

const ProfileAbout = ({ data }) => {
  return (
    <Card>
      <CardBody>
        <h5 className="mb-75">درباره کاربر</h5>
        <CardText>
          {data.userAbout ? data.userAbout : "توضیحی وارد نشده است"}
        </CardText>
        <div className="mt-2">
          <h5 className="mb-75">شماره موبایل :</h5>
          <CardText>{data.phoneNumber}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75"> جیمیل :</h5>
          <CardText>{data.gmail}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75"> جیمیل بازیابی :</h5>
          <CardText>{data.recoveryEmail}</CardText>
        </div>
        <div className="mt-2" style={{ width: "fit-content" }}>
          <h5 className="mb-75"> وضعیت :</h5>
          {data.active ? <ActiveBadge /> : <DiActiveBadge />}
        </div>
        <div className="mt-2">
          <h5 className="mb-75"> جنسیت :</h5>
          <CardText>{data.gender ? "مرد" : "زن"}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75"> ورود دومرحله ای :</h5>
          <CardText>
            {data.twoStepAuth ? <ActiveBadge /> : <DiActiveBadge />}
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileAbout;
