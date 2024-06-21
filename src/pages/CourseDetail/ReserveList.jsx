// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Article List Component
import CourseListTable from "../../@core/components/course/ReserveList/Table";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "../../@core/components/StatsHorizontal";
import BreadCrumbs from "../../@core/components/breadcrumbs";

// ** Icons Imports
import { BookOpen, Trash2, Book } from "react-feather";

// ** Apis Imports
import { getCourseReserveAPI } from "../../@core/services/api/Course/Courses.js";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useParams } from "react-router-dom";

const ArticleCategory = ({ teacherId }) => {
  const [ArticleLists, setArticleLists] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const param = useParams();

  const fetchArticleLists = async (setData) => {
    try {
      const NewsCategory = await getCourseReserveAPI(param.id);
      setData(NewsCategory);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchArticleLists(setArticleLists);
  }, []);

  useEffect(() => {
    const getAPI = async () => {
      try {
        const NewsCategory = await getCourseReserveAPI(param.id);
        setArticleLists(NewsCategory);
      } catch (error) {
        return error;
      }
    };
    getAPI();
  }, [refetch]);

  return (
    <div className="app-user-list" style={{ position: "relative" }}>
      <CourseListTable
        teacherId={teacherId}
        users={ArticleLists}
        setRefetch={setRefetch}
        refetch={refetch}
      />
    </div>
  );
};

export default ArticleCategory;
