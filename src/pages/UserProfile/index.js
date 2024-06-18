// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";

// ** Custom Components
import UILoader from "@components/ui-loader";
import Breadcrumbs from "@components/breadcrumbs";
import GoalOverview from "../../@core/components/ui-elements/cards/analytics/GoalOverview";
import CourseList from "./Lists/MyCourse";
import ReserveCourseList from "./Lists/MyReserve";

// ** Reactstrap Imports
import { Row, Col, Button, Card, CardBody, CardText } from "reactstrap";

// ** Demo Components
import ProfilePoll from "./ProfilePolls";
import ProfileAbout from "./ProfileAbout";
import ProfilePosts from "./ProfilePosts";
import ProfileHeader from "./ProfileHeader";
import ProfileTwitterFeeds from "./ProfileTwitterFeeds";
import ProfileLatestPhotos from "./ProfileLatestPhotos";
import ProfileSuggestedPages from "./ProfileSuggestedPages";
import ProfileFriendsSuggestions from "./ProfileFriendsSuggestions";

// ** Styles
import "@styles/react/pages/page-profile.scss";

/* Api */
import { GetUserDetail } from "../../@core/services/api/UserDetail/GetUserDetail";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import Badge from "../../@core/components/‌Badge/Badge";

import { Edit } from "react-feather";

const Profile = () => {
  // ** States
  const [data, setData] = useState({});
  const [Step, setStep] = useState(1);

  const GetData = async () => {
    let data = await GetUserDetail(params.id);
    setData(data);
  };

  const ShowRoles = ({ data }) => {
    return (
      <>
        {data.map((item, key) => (
          <Badge innerHtml={item.roleName} status="RoleTag" key={key}></Badge>
        ))}
        <div style={{ cursor: "pointer", display: "inline" }}>
          <Badge innerHtml={<Edit size={20} />} status="Active" />
        </div>
      </>
    );
  };

  const params = useParams();

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      {data.id ? (
        <Fragment>
          <BreadCrumbs
            title="پروفایل کاربری"
            data={[
              { title: "مدیریت کاربران ", link: "/users " },
              { title: data.lName + " " + data.fName },
            ]}
          />
          <div id="user-profile">
            <Row>
              <Col sm="12">
                <ProfileHeader data={data} Step={Step} setStep={setStep} />
              </Col>
            </Row>

            {Step == 1 ? (
              <section id="profile-info">
                <Row>
                  <Col
                    lg={{ size: 3, order: 1 }}
                    sm={{ size: 12 }}
                    xs={{ order: 2 }}
                  >
                    <ProfileAbout data={data} />
                  </Col>

                  <Col
                    lg={{ size: 3, order: 1 }}
                    sm={{ size: 12 }}
                    xs={{ order: 2 }}
                  >
                    <Card>
                      <CardBody>
                        <h5 className="mb-75"> نقش ها</h5>
                        <ShowRoles data={data.roles} />
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <h5 className="mb-75">شماره موبایل :</h5>
                        <CardText>
                          {data.homeAdderess ? data.phoneNumber : "وارد نشده"}
                        </CardText>
                        <div className="mt-2">
                          <h5 className="mb-75">آدرس کاربر :</h5>
                          <CardText>{data.homeAdderess}</CardText>
                        </div>
                        <div className="mt-2">
                          <h5 className="mb-75">آدرس تلگرام :</h5>
                          <CardText>
                            {data.telegramLink
                              ? data.telegramLink
                              : "وارد نشده"}
                          </CardText>
                        </div>
                        <div className="mt-2">
                          <h5 className="mb-75">آدرس لینکدین :</h5>
                          <CardText>
                            {data.linkdinProfile
                              ? data.linkdinProfile
                              : "وارد نشده"}
                          </CardText>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col
                    lg={{ size: 6, order: 1 }}
                    sm={{ size: 12 }}
                    xs={{ order: 2 }}
                  >
                    <GoalOverview
                      percent={data.profileCompletionPercentage}
                      Completed={data.profileCompletionPercentage / 10}
                      inProgress={10 - data.profileCompletionPercentage / 10}
                    />
                  </Col>
                </Row>
              </section>
            ) : null}

            {Step == 2 ? <CourseList data={data.courses} /> : null}

            {Step == 3 ? (
              <ReserveCourseList data={data.coursesReseves} />
            ) : null}
          </div>
        </Fragment>
      ) : null}
    </>
  );
};

export default Profile;
