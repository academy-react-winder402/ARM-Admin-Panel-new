// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";

// ** Custom Components
import UILoader from "@components/ui-loader";
import Breadcrumbs from "@components/breadcrumbs";
import GoalOverview from "../../@core/components/ui-elements/cards/analytics/GoalOverview";

// ** Reactstrap Imports
import { Row, Col, Button } from "reactstrap";

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

const Profile = () => {
  // ** States
  const [data, setData] = useState({});

  useEffect(async () => {
    let data = await GetUserDetail(7);
    setData(data);
  }, []);

  return (
    <>
      {data.id ? (
        <Fragment>
          <Breadcrumbs
            title="Profile"
            data={[{ title: "کاربران" }, { title: "پروفایل" }]}
          />
          <div id="user-profile">
            <Row>
              <Col sm="12">
                <ProfileHeader data={data} />
              </Col>
            </Row>
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
                  lg={{ size: 6, order: 1 }}
                  sm={{ size: 12 }}
                  xs={{ order: 2 }}
                >
                  <GoalOverview
                    percent={data.profileCompletionPercentage}
                    Completed={data.profileCompletionPercentage * 10}
                    inProgress={10 - data.profileCompletionPercentage * 10}
                  />
                </Col>
              </Row>
            </section>
          </div>
        </Fragment>
      ) : null}
    </>
  );
};

export default Profile;
