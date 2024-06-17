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
        navLink: "/listOfCourse",
      },
      {
        id: "yourlist",
        title: "لیست دوره های شما",
        icon: <List />,
        navLink: "/yourlist",
      },
      {
        id: "reserveList",
        title: "دوره های رزروشده کاربران",
        icon: <Coffee />,
        navLink: "/reserveList",
      },
      {
        id: "buildCourse",
        title: "ساخت دوره جدید",
        icon: <Edit />,
        navLink: "/buildCourse",
      },
    ],
  },

  {
    id: "News",
    title: "اخبار",
    icon: <List size={20} />,
    navLink: "/News",
    children: [
      {
        id: "NewsList",
        title: "لیست اخبار",
        icon: <List size={12} />,
        navLink: "/ListOfNews",
      },
      {
        id: "AddNews",
        title: "ایجاد خبر جدید",
        icon: <List size={12} />,
        navLink: "/AddNews",
      },
      {
        id: "NewsGroup",
        title: "لیست دسته بندی",
        icon: <List size={12} />,
        navLink: "/News/NewsGroup",
      },
    ],
  },
];
