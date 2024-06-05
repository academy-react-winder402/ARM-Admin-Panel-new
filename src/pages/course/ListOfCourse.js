import { Breadcrumb } from "reactstrap";
import Breadcrumbs from "../../@core/components/course/listOfCourse/Breadcrumbs";
import { Fragment } from "react";
import UsersList from "../../@core/components/course/listOfCourse/UsersList";
import Table from "../../@core/components/course/listOfCourse/Table";
const YourList = () => {
  return (
    <Fragment>
      <Breadcrumbs title="لیست دوره ها" />
      <UsersList />
      <Table />
    </Fragment>
  );
};

export default YourList;
