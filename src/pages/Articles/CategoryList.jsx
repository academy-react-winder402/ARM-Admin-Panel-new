// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Article List Component
import CourseListTable from "../../@core/components/Articles/CategoryList/Table.js";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "../../@core/components/StatsHorizontal";
import BreadCrumbs from "../../@core/components/breadcrumbs";

// ** Icons Imports
import { BookOpen, Trash2, Book } from "react-feather";

// ** Apis Imports
import { NewsCategoryApi } from "../../@core/services/api/Articles/Article";

// ** Styles
import "@styles/react/apps/app-users.scss";
import "./Style.css";
import { CountUp } from "use-count-up";

const ArticleCategory = () => {
  const [ArticleLists, setArticleLists] = useState([]);

  const fetchArticleLists = async (setData) => {
    try {
      const NewsCategory = await NewsCategoryApi();
      setData(NewsCategory);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchArticleLists(setArticleLists);
  }, []);

  return (
    <div className="app-user-list" style={{ position: "relative" }}>
      <div style={{ marginTop: "20px", marginBottom: "50px" }}>
        <BreadCrumbs
          title="لیست دسته بندی های اخبار آکادمی سپهر"
          data={[{ title: "مدیریت  دسته بندی ها" }]}
        />
      </div>

      <div
        className="btn-primary-DDDD"
        style={{
          width: "fit-content",
          scale: "1.3",
          position: "absolute",
          left: "23px",
          top: "0",
          padding: "20px",
        }}
      >
        افزودن دسته بندی
      </div>

      <CourseListTable users={ArticleLists} />
    </div>
  );
};

export default ArticleCategory;
