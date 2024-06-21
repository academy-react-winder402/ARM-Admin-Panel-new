/* eslint-disable semi */
// ** React Imports
import { useEffect, useState } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";
import UserInfoCard from "./UserInfoCard";
import UserTabs from "./UserTabs";

// ** Styles
import "@styles/react/apps/app-users.scss";

import ReserveList from "../../@core/components/course/ReserveList/Table";

import { getCourseByIdAPI } from "../../@core/services/api/Course/Courses";
import { useParams } from "react-router-dom";

const UserView = () => {
  const [data, setData] = useState({});
  const [active, setActive] = useState("1");
  const param = useParams();

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const fetch = async () => {
    const Course = await getCourseByIdAPI(param.id);
    setData(Course);
    //console.log(Course);
  };
  useEffect(() => {
    // setData({
    //   sort,
    //   q: Value,
    //   sortColumn,
    //   page: currentPage,
    //   status: statusValue,
    // });

    fetch();
  }, []);

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard data={data} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} data={data} />
        </Col>
      </Row>
    </div>
  );
};

export default UserView;
