// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import Chart from "react-apexcharts";
import { HelpCircle } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

/* custom component */
import { CountUp } from "use-count-up";

const GoalOverview = ({ percent, inProgress, Completed }) => {
  const options = {
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      colors: ["#51e5a8"],
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "77%",
          },
          track: {
            background: "#ebe9f1",
            strokeWidth: "120%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              color: "#5e5873",
              fontFamily: "IransnsNumber",
              fontSize: "2.86rem",
              fontWeight: "600",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          //gradientToColors: [props.success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      grid: {
        padding: {
          bottom: 30,
        },
      },
    },
    series = [percent];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">درصد تکمیل پروفایل </CardTitle>
      </CardHeader>
      <CardBody className="p-0">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={345}
        />
      </CardBody>
      <Row className="border-top text-center mx-0">
        <Col xs="6" className="border-end py-1">
          <CardText className="text-muted mb-0">مورد تکمیل شده</CardText>
          <h3 className="fw-bolder mb-0 mt-1">
            <CountUp isCounting end={Completed} duration={3.2} />
          </h3>
        </Col>
        <Col xs="6" className="py-1">
          <CardText className="text-muted mb-0"> تکمیل نشده </CardText>
          <h3 className="fw-bolder mb-0 mt-1">
            <CountUp isCounting end={inProgress} duration={3.2} />
          </h3>
        </Col>
      </Row>
    </Card>
  );
};
export default GoalOverview;
