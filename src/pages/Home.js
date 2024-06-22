import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Row,
  Col,
} from "reactstrap";
import { useContext, useEffect, useState } from "react";
import CardCongratulations from "../@core/components/Card Congratulations/CardCongratulations";
import StatsVertical from "../@core/components/Stats Vertical/StatsVertical";
import { User, FileText, File } from "react-feather";
import SupportTracker from "../@core/components/Support Tracker/SupportTracker.js";
import SupportTracker2 from "../@core/components/Support Tracker/SupportTracker2.js";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import StatsCard from "../@core/components/StatsCard";
import toast from "react-hot-toast";

import { dashboardReportAPI } from "../@core/services/api/dashboard/dashboard-report.api";

const Home = () => {
  const { colors } = useContext(ThemeColors);
  const [dashboardReport, setDashboardReport] = useState();

  useEffect(() => {
    const fetchDashboardReport = async () => {
      try {
        const getDashboardReport = await dashboardReportAPI();

        setDashboardReport(getDashboardReport);
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات داشبورد به وجود آمد !");
      }
    };

    fetchDashboardReport();
  }, []);
  return (
    <div>
      <Row>
        <Col sm="12">
          <CardCongratulations />
        </Col>
        <Col>
          <StatsCard
            cols={{ xl: "3", sm: "6" }}
            dashboardData={dashboardReport}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
