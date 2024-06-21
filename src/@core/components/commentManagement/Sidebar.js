// ** React Import
import { useEffect, useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from "reactstrap";

// ** Store & Actions
import { addUser } from "./store";
import { useDispatch } from "react-redux";
import { getComment, repcomment } from "../../../@core/services/api/panelAdmin";
import { Field, Formik } from "formik";

const defaultValues = {
  email: "",
  contact: "",
  company: "",
  fullName: "",
  username: "",
  country: null,
};

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const [keyys, setKeyys] = useState({ title: "", comm: "" });
  const [list, setList] = useState();

  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // // ** Function to handle form submit
  // const onSubmit = data => {
  //   setData(data)
  //   if (checkIsValid(data)) {
  //     toggleSidebar()
  //     dispatch(
  //       addUser({
  //         role,
  //         avatar: '',
  //         status: 'active',
  //         email: data.email,
  //         currentPlan: plan,
  //         billing: 'auto debit',
  //         company: data.company,
  //         contact: data.contact,
  //         fullName: data.fullName,
  //         username: data.username,
  //         country: data.country.value
  //       })
  //     )
  //   } else {
  //     for (const key in data) {
  //       if (data[key] === null) {
  //         setError('country', {
  //           type: 'manual'
  //         })
  //       }
  //       if (data[key] !== null && data[key].length === 0) {
  //         setError(key, {
  //           type: 'manual'
  //         })
  //       }
  //     }
  //   }
  // }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    setRole("دانشجو");
  };

  // const { id } = useParams();

  const allComment = async (search) => {
    try {
      const getCommentListt = await getComment(search);
      console.log(getCommentListt);
      setList(getCommentListt.comments);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  console.log(list);

  // const repCom = async () => {
  //   const dataa = new FormData();
  //   const comentListt = {
  //     CommentId: list.CommentId,
  //     CourseId: list.CourseId,
  //     Title: keyys.title,
  //     Describe: keyys.comm,
  //   };

  //   const keyss = Object.keys(comentListt);

  //   keyss.forEach((kk) => {
  //     const itemm = comentListt[kk];
  //     dataa.append(kk, itemm);
  //   });
  //   const coments = await repcomment(dataa);
  // };

  useEffect(() => {
    allComment();
    // repCom();
  }, []);

  return (
    <Sidebar
      size="lg"
      open={open}
      title="کامنت جدید"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Formik initialValues={{ title: "", comm: "" }} onSubmit={setKeyys}>
        <Form className="flex flex-col w-[100%] gap-2">
          <Field
            style={{
              background: "var(--background)",
              borderColor: "var(--text-col3)",
              borderRadius: 10,
            }}
            name="title"
            placeholder="عنوان "
            className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
          />

          <div className="flex ">
            <Field
              style={{
                height: 200,
                background: "var(--background)",
                borderColor: "var(--text-col3)",
                borderRadius: 10,
              }}
              as="textarea"
              name="comm"
              placeholder="متن "
              className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
            />
          </div>
          <Button>پاسخ دادن</Button>
        </Form>
      </Formik>
    </Sidebar>
  );
};

export default SidebarNewUsers;
