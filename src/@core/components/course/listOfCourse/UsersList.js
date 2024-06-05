// ** User List Component
// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, BookOpen } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UsersList = () => {
  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="همه دوره ها"
            icon={<BookOpen size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">6</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="دوره های فعال"
            icon={<BookOpen size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">6</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="دوره های حذف شده"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">3</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="دوره های در حال برگذاری"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">0</h3>}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UsersList;
