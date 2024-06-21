// ** React Imports
import { Fragment, lazy, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import { getItem } from "../../@core/services/common/storage.services.js";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";
const Home = lazy(() => import("../../pages/Home"));

/* Member pages*/
const MembersList = lazy(() => import("../../pages/Users/Users.jsx"));
const MemberDetail = lazy(() => import("../../pages/UserProfile/index.js"));
const MemberEdit = lazy(() => import("../../pages/Users/EditUser.jsx"));
const AddUser = lazy(() => import("../../pages/Users/AddUser.jsx"));
const EditUser = lazy(() => import("../../pages/Users/EditUser.jsx"));

/* Courses pages */
const ListOfCourse = lazy(() => import("../../pages/course/Courses.jsx"));
const CreateCourse = lazy(() => import("../../pages/course/BuildCourse.js"));
const CoursesGroup = lazy(() => import("../../pages/CourseGroup/Courses.jsx"));
const CourseDetail = lazy(() =>
  import("../../pages/CourseDetail/CourseDetail.jsx")
);

/* Articles pages */
const ListOfArticle = lazy(() => import("../../pages/Articles/Article.jsx"));
const AddArticle = lazy(() => import("../../pages/Articles/AddArticle.jsx"));
const EditArticle = lazy(() => import("../../pages/Articles/EditArticle.jsx"));
const ArticleCategory = lazy(() =>
  import("../../pages/Articles/CategoryList.jsx")
);

/* comments pages */
const Comments = lazy(() =>
  import("../../@core/components/commentManagement/index.js")
);

const BuildCourse = lazy(() => import("../../pages/course/BuildCourse"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const AddNews = lazy(() => import("../../pages/News/AddNews"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },

  // Members
  {
    path: "/Users",
    element: <MembersList />,
  },
  {
    path: "/Users/Detail/:id",
    element: <MemberDetail />,
  },
  {
    path: "/Users/Edit",
    element: <MemberEdit />,
  },
  {
    path: "/Users/Add",
    element: <AddUser />,
  },
  {
    path: "/Users/Edit",
    element: <EditUser />,
  },

  // Course
  {
    path: "/Courses",
    element: <ListOfCourse />,
  },
  {
    path: "/Courses/AddCourse",
    element: <CreateCourse />,
  },
  {
    path: "/Courses/Detail/:id",
    element: <CourseDetail />,
  },
  {
    path: "/CoursesGroup",
    element: <CoursesGroup />,
  },

  // News
  {
    path: "/Articles",
    element: <ListOfArticle />,
  },
  {
    path: "/AddArticle",
    element: <AddArticle />,
  },
  {
    path: "/EditArticle/:id",
    element: <EditArticle />,
  },
  {
    path: "/ArticleCategory",
    element: <ArticleCategory />,
  },

  // Comments
  {
    path: "/Comment",
    element: <Comments />,
  },

  // Others
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/buildCourse",
    element: <BuildCourse />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  /* {
    path: "/AddNews",
    element: <AddNews />,
  }, */
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];
  const navigate = useNavigate();
  useEffect(() => {
    const token = getItem("token");
    {
      !token && navigate("/login");
    }
  }, []);

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
