// ** React Imports
import { Fragment, useContext } from "react";

// ** Reactstrap Imports
import { Row, Col, Card, CardTitle, CardBody } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Custom Components

import StatsVertical from "./StatsVertical";

// ** Icons Imports
import {
  Eye,
  Heart,
  ShoppingBag,
  MessageSquare,
  Award,
  Users,
} from "react-feather";

const Cards = ({ data }) => {
  // ** Context
  const context = useContext(ThemeColors);

  return (
    <Fragment>
      <Row>
        {/* Stats With Icons */}
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<Eye size={21} />}
            color="info"
            stats={data.courseUserTotal}
            statTitle="دانشجوها"
          />
        </Col>
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<MessageSquare size={21} />}
            color="warning"
            stats={data.courseLikeTotal}
            statTitle="نظر"
          />
        </Col>
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<ShoppingBag size={21} />}
            color="danger"
            stats={data.paymentDoneTotal}
            statTitle="شهریه ناکامل"
          />
        </Col>
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<ShoppingBag size={21} />}
            color="success"
            stats={data.paymentDoneTotal}
            statTitle="شهریه کامل"
          />
        </Col>
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<Award size={21} />}
            color="warning"
            stats={data.courseLikeTotal}
            statTitle="نفر پسندیدن"
          />
        </Col>
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<Users size={21} />}
            color="primary"
            stats={data.courseGroupTotal}
            statTitle="گروه های دوره"
          />
        </Col>
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<Users size={21} />}
            color="success"
            stats={data.reserveUserTotal}
            statTitle=" تعداد رزرو شده "
          />
        </Col>

        {/* Stats With Icons */}
      </Row>
      <Card>
        <CardBody>
          <CardTitle className="mb-60" tag="h4">
            توضیحات مقالات :
          </CardTitle>
          <p className="mb-0">{data.describe}</p>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Cards;
