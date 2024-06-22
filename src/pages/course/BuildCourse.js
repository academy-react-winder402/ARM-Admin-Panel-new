import { Fragment } from "react";
import CardMedal from "../../@core/components/course/CardMedal";
import BreadCrumbs2 from "../../@core/components/course/buildCourse/BreadCrumbs2";
import FormVizard from "../../@core/components/course/buildCourse/FormVizard";
import CreateCourse from "../../@core/components/createCourseWizard";
const YourList = () => {
  return (
    <Fragment>
      <BreadCrumbs2
        title="اضافه کردن دوره"
        data={[{ title: "Datatables" }, { title: "Datatables Basic" }]}
      />
      <CreateCourse type={"modern-horizontal"} />
    </Fragment>
  );
};

export default YourList;
