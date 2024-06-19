import { BubbleController } from "chart.js";
import { Bubble } from "react-chartjs-2";

import {
  Mail,
  Home,
  Airplay,
  Circle,
  User,
  Menu,
  List,
  BookOpen,
  Coffee,
  Edit,
} from "react-feather";

export default [
  {
    id: "Home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/Home",
  },
  {
    id: "Users",
    title: "کاربران",
    icon: <User size={20} />,
    navLink: "/Users",
  },

  {
    id: "Courses",
    title: "دوره ها",
    icon: <List />,
    badgeText: "4",
    children: [
      {
        id: "listOfCourse",
        title: "لیست دوره ها",
        icon: <BookOpen />,
        navLink: "/courses",
      },
    ],
  },

  {
    id: "News",
    title: "اخبار",
    icon: <List size={20} />,
    children: [
      {
        id: "NewsList",
        title: "لیست اخبار",
        icon: <List size={12} />,
        navLink: "Articles",
      },
      {
        id: "AddNews",
        title: "ایجاد خبر جدید",
        icon: <List size={12} />,
        navLink: "/AddArticle",
      },
      {
        id: "ArticleCategory",
        title: " لیست دسته بندی ها ",
        icon: <List size={12} />,
        navLink: "/ArticleCategory",
      },
    ],
  },
];
