// ** React Imports
import { Fragment, useContext } from "react";

// ** Reactstrap Imports
import { Row, Col, Card, CardTitle, CardBody } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Custom Components

import StatsVertical from "./StatsVertical";

// ** Icons Imports
import { Eye, Heart, ShoppingBag, MessageSquare, Award } from "react-feather";

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
            stats={data.likeCount}
            statTitle="دانشجوها"
          />
        </Col>
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<MessageSquare size={21} />}
            color="warning"
            stats={data.likeCount}
            statTitle="نظر"
          />
        </Col>
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<ShoppingBag size={21} />}
            color="danger"
            stats={data.likeCount}
            statTitle="خرید موفق"
          />
        </Col>
        <Col xl="3" md="5" sm="6">
          <StatsVertical
            icon={<Award size={21} />}
            color="warning"
            stats={data.likeCount}
            statTitle="نفر پسندیدن"
          />
        </Col>

        {/* Stats With Icons */}
      </Row>
      <Card>
        <CardBody>
          <CardTitle className="mb-60" tag="h4">
            {data.title}
          </CardTitle>
          <p className="mb-0">{data.describe}</p>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Cards;
