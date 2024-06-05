// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather";
import Cards from "./Cards.js";

// ** User Components
// import InvoiceList from './InvoiceList'
// import SecurityTab from './SecurityTab'
// import Connections from './Connections'
// import BillingPlanTab from './BillingTab'
// import UserTimeline from './UserTimeline'
// import Notifications from './Notifications'
// import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab, data }) => {
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
          {/* <UserProjectsList />
          <UserTimeline />
          <InvoiceList /> */}
          <Cards data={data} />
        </TabPane>
        <TabPane tabId="2">
          <h2>Salam</h2>
        </TabPane>
        <TabPane tabId="3">
          <h2>Khodafez</h2>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
