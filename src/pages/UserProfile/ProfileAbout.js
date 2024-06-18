// ** Reactstrap Imports
import { Card, CardBody, CardText } from "reactstrap";

import Badge from "../../@core/components/‌Badge/Badge.jsx";

const ProfileAbout = ({ data }) => {
  return (
    <Card>
      <CardBody>
        <h5 className="mb-75">درباره کاربر</h5>
        <CardText>
          {data.userAbout ? data.userAbout : "توضیحی وارد نشده است"}
        </CardText>
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
          {data.active ? (
            <Badge innerHtml="فعال" status="Active" />
          ) : (
            <Badge innerHtml="غیر فعال" status="inActive" />
          )}
        </div>
        <div className="mt-2">
          <h5 className="mb-75"> جنسیت :</h5>
          <CardText>{data.gender ? "مرد" : "زن"}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75"> ورود دومرحله ای :</h5>
          <CardText>
            {data.twoStepAuth ? (
              <Badge innerHtml="فعال" status="Active" />
            ) : (
              <Badge innerHtml="غیر فعال" status="inActive" />
            )}
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileAbout;
