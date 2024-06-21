// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather";
import Cards from "./Cards.js";

import { getCourseReserveAPI } from "../../@core/services/api/Course/Courses.js";
import { useParams } from "react-router-dom";
import ReserveList from "../../@core/components/course/ReserveList/Table.js";

const UserTabs = ({ active, toggleTab, data }) => {
  const param = useParams();
  const [aa, setReserveData] = useState([{ asd: 1 }, { asd: 2 }]);

  const GetReserve = async (id) => {
    const Reserve = await getCourseReserveAPI(id);
    console.log(Reserve);
    //setReserveData(Reserve);
  };

  useEffect(() => {
    GetReserve(param.id);
  }, []);

  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">توضیحات دوره</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">رزرو کننده ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">نظرات</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <Cards data={data} />
        </TabPane>
        <TabPane tabId="2">
          <ReserveList data={aa} />
        </TabPane>
        <TabPane tabId="3">
          <h2>Khodafez</h2>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
