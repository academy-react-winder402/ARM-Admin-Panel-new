// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** User List Component
import CourseListTable from "../../@core/components/course/CourseList/Table";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "../../@core/components/StatsHorizontal";
import BreadCrumbs from "../../@core/components/breadcrumbs";

// ** Icons Imports
import { BookOpen, Trash2, Book } from "react-feather";

// ** Core Imports
import { getCourseListsAPI } from "../../@core/services/api/Course/Courses";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { CountUp } from "use-count-up";

const Users = () => {
  const [allUsers, setAllUsers] = useState();
  const [userLists, setUserLists] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(8);
  const [query, setQuery] = useState();
  const [refetch, setRefetch] = useState(false);

  const [MainFilter, setMainFilter] = useState(1);

  const fetchUserLists = async (setData) => {
    try {
      const getUserLists = await getCourseListsAPI(1, rowsOfPage, undefined);

      setData(getUserLists);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchUserLists(setUserLists);
    fetchUserLists(setAllUsers);
  }, []);

  useEffect(() => {
    const fetchCourseLists = async () => {
      try {
        const getUserLists = await getCourseListsAPI(
          currentPage + 1,
          rowsOfPage,
          query
        );

        setUserLists(getUserLists);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseLists();
  }, [rowsOfPage, currentPage, query, refetch]);

  return (
    <div className="app-user-list">
      <BreadCrumbs
        title="لیست دوره های آکادمی سپهر"
        data={[{ title: "مدیریت دوره ها" }]}
      />

      <Row style={{ fontFamily: "IransnsNumber" }}>
        <Col lg="3" sm="6">
          <StatsHorizontal
            backgroundColor={MainFilter == 1 && "rgba(0, 0, 0, 0.133)"}
            onClick={() => {
              setMainFilter(1);
            }}
            color="warning"
            statTitle="همه دوره ها"
            icon={<BookOpen size={20} />}
            renderStats={
              <h1 className="fw-bolder mb-75">
                <CountUp isCounting end={100} duration={3.2} />
              </h1>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            backgroundColor={MainFilter == 2 && "rgba(0, 0, 0, 0.133)"}
            onClick={() => {
              setMainFilter(2);
            }}
            color="success"
            statTitle="دوره های فعال"
            icon={<BookOpen size={20} />}
            renderStats={
              <h1 className="fw-bolder mb-75">
                <CountUp isCounting end={100} duration={3} />
              </h1>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            backgroundColor={MainFilter == 3 && "rgba(0, 0, 0, 0.133)"}
            onClick={() => {
              setMainFilter(3);
            }}
            color="danger"
            statTitle="دوره های حذف شده"
            icon={<Trash2 size={20} />}
            renderStats={
              <h1 className="fw-bolder mb-75">
                <CountUp isCounting end={100} duration={3} />
              </h1>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            backgroundColor={MainFilter == 4 && "rgba(0, 0, 0, 0.133)"}
            onClick={() => {
              setMainFilter(4);
            }}
            color="primary"
            statTitle="دوره های درحال بگذاری"
            icon={<Book size={20} />}
            renderStats={
              <h1 className="fw-bolder mb-75">
                <CountUp isCounting end={100} duration={3} />
              </h1>
            }
          />
        </Col>
      </Row>

      <CourseListTable
        users={userLists}
        rowsOfPage={rowsOfPage}
        currentPage={currentPage}
        query={query}
        setRowsOfPage={setRowsOfPage}
        setCurrentPage={setCurrentPage}
        setQuery={setQuery}
        setRefetch={setRefetch}
        refetch={refetch}
      />
    </div>
  );
};

export default Users;
