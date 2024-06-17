// ** User List Component
// ** Reactstrap Imports
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, BookOpen } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

const NewsList = () => {
  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6" style={{ cursor: "pointer" }}>
          <StatsHorizontal
            color="primary"
            statTitle="اخبار فعال"
            icon={<BookOpen size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">6</h3>}
          />
        </Col>
        <Col
          lg="3"
          sm="6"
          onClick={() => <Link to="/"></Link>}
          style={{ cursor: "pointer" }}
        >
          <StatsHorizontal
            color="success"
            statTitle="اخبار غیر فعال"
            icon={<BookOpen size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">6</h3>}
          />
        </Col>
      </Row>
    </div>
  );
};

export default NewsList;
