// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Article List Component
import CourseListTable from "../../@core/components/Articles/ArticleList/Table";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "../../@core/components/StatsHorizontal";
import BreadCrumbs from "../../@core/components/breadcrumbs";

// ** Icons Imports
import { BookOpen, Trash2, Book } from "react-feather";

// ** Apis Imports
import { getArticleListsAPI } from "../../@core/services/api/Articles/Article";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { CountUp } from "use-count-up";

const Article = () => {
  const [allArticles, setAllArticles] = useState();
  const [ArticleLists, setArticleLists] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(8);
  const [query, setQuery] = useState();
  const [refetch, setRefetch] = useState(false);
  const [MainFilter, setMainFilter] = useState(true);

  const [ActiveCount, setActiveCount] = useState();
  const [InActiveCount, setInActiveCount] = useState();

  const GetCounts = async () => {
    const getActive = await getArticleListsAPI(1, rowsOfPage, undefined, true);
    const getInActive = await getArticleListsAPI(
      1,
      rowsOfPage,
      undefined,
      false
    );

    setActiveCount(getActive.totalCount);
    setInActiveCount(getInActive.totalCount);
  };

  const fetchArticleLists = async (setData) => {
    try {
      const getArticleLists = await getArticleListsAPI(
        1,
        rowsOfPage,
        undefined,
        MainFilter
      );

      GetCounts();
      setData(getArticleLists);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchArticleLists(setArticleLists);
    fetchArticleLists(setAllArticles);
  }, []);

  useEffect(() => {
    const fetchArticleLists = async () => {
      try {
        const getArticleLists = await getArticleListsAPI(
          currentPage + 1,
          rowsOfPage,
          query,
          MainFilter
        );

        setArticleLists(getArticleLists);
      } catch (error) {
        return error;
      }
    };

    GetCounts();
    fetchArticleLists();
  }, [rowsOfPage, currentPage, query, refetch, MainFilter]);

  return (
    <div className="app-user-list">
      <BreadCrumbs
        title="لیست اخبار های آکادمی سپهر"
        data={[{ title: "مدیریت اخبار ها" }]}
      />

      <Row style={{ fontFamily: "IransnsNumber" }}>
        <Col lg="3" sm="6">
          <StatsHorizontal
            backgroundColor={MainFilter == true && "rgba(0, 0, 0, 0.133)"}
            onClick={() => {
              setMainFilter(true);
            }}
            color="success"
            statTitle="اخبار فعال"
            icon={<BookOpen size={20} />}
            renderStats={
              <h1 className="fw-bolder mb-75">
                <CountUp isCounting end={ActiveCount} duration={1} />
              </h1>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            backgroundColor={MainFilter == false && "rgba(0, 0, 0, 0.133)"}
            onClick={() => {
              setMainFilter(false);
            }}
            color="danger"
            statTitle="اخبار غیر فعال"
            icon={<BookOpen size={20} />}
            renderStats={
              <h1 className="fw-bolder mb-75">
                <CountUp isCounting end={InActiveCount} duration={2} />
              </h1>
            }
          />
        </Col>
      </Row>

      <CourseListTable
        users={ArticleLists}
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

export default Article;
