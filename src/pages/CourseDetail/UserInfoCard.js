import { useState, Fragment } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Check, Briefcase } from "react-feather";
import Badge from "../../@core/components/‌Badge/Badge";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};
const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
};

const UserInfoCard = ({ data }) => {
  const [show, setShow] = useState(false);

  let reset, control, setError, handleSubmit;

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const ShowTech = ({ Arrdata }) => {
    return (
      <>
        {Arrdata?.map((item, key) => (
          <Badge innerHtml={item.roleName} status="RoleTag" key={key}></Badge>
        ))}
      </>
    );
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <h1>{data.title}</h1>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4
                  className="mb-0"
                  style={{
                    marginTop: "5px",
                    fontSize: "14px",
                    fontFamily: "IransnsNumber",
                  }}
                >
                  {Intl.NumberFormat({
                    maximumSignificantDigits: 3,
                  }).format(data.cost)}
                  <span style={{ margin: "10px" }}>تومان</span>
                </h4>
                <small>قیمت دوره</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0"> {data.courseLevelName}</h4>
                <small> دسته بندی </small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات دوره</h4>
          <div className="info-container">
            {data !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام استاد :</span>
                  <span>{data.teacherName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25 ">وضعیت برگذاری:</span>
                  <>
                    {data.isActive ? (
                      <Badge innerHtml="فعال" status="Active" />
                    ) : (
                      <div style={{ marginRight: "-10px" }}>
                        <Badge innerHtml="غیرفعال" status="inActive" />
                      </div>
                    )}
                  </>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کلاس :</span>
                  <span className="text-capitalize">
                    {data.courseClassRoomName}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نحوه برگذاری :</span>
                  <span>{data.courseStatusName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">سطح دوره :</span>
                  <span>{data.courseLevelName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تکنولوژی های دوره :</span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <ShowTech Arrdata={data.courseTeches} />
                  </div>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش دوره
            </Button>
            <Button className="ms-1" color="warning" outline>
              غیرفعال کردن دوره
            </Button>
            <Button className="ms-1" color="danger" outline>
              حذف دوره
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UserInfoCard;
