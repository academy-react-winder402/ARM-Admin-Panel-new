import "./Styles/Login.css";

// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginAPI } from "../@core/services/api/auth";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { setItem } from "../@core/services/common/storage.services";
import toast from "react-hot-toast";

const Login = () => {
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const navigate = useNavigate();
  const validation = yup.object({
    phoneOrGmail: yup
      .string()
      .required("ایمیل یا شماره همراه خود را وارد کنید" + " * "),
    password: yup.string().required("رمز عبور الزامیست" + " * "),
  });

  const LogInUser = async (userObj) => {
    const user = await loginAPI(userObj);

    if (user.success) {
      if (
        user.roles.includes("Administrator") ||
        user.roles.includes("Teachers")
      ) {
        toast.success("ورود با موفقیت انجام شد");
        setItem("token", user.token);
        navigate("/");
      } else {
        toast.error("شما دسترسی مورد نیاز را ندارید");
      }
    } else {
      toast.error("اطلاعات حساب کاربری یا رمز عبور نادست است");
    }
  };

  const onSubmit = (values) => {
    console.log(values);
    LogInUser(values);
  };

  return (
    <div className="auth-wrapper auth-cover" dir="rtl">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
          dir="rtl"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              به پنل مدیریت خوش آمدید ! 👋
            </CardTitle>
            <CardText className="mb-2">لطفا برای ادامه کار وارد شوید</CardText>
            <Formik
              initialValues={{
                phoneOrGmail: "",
                password: "",
                rememberMe: true,
              }}
              onSubmit={onSubmit}
              validationSchema={validation}
            >
              <Form className="auth-login-form mt-2">
                <div className="mb-1 CustomInput">
                  <Label
                    className="form-label"
                    for="login-email"
                    style={{ fontSize: "20px" }}
                  >
                    ایمیل
                  </Label>
                  <Field
                    id="phoneOrGmail"
                    name="phoneOrGmail"
                    placeholder="ایمیل یا شماره موبایل خود را وارد کنید"
                    autoFocus
                  />
                  <ErrorMessage
                    name="phoneOrGmail"
                    component={"span"}
                    className="Error"
                  />
                </div>
                <div className="mb-1 CustomInput">
                  <Label
                    className="form-label"
                    for="login-email"
                    style={{ fontSize: "20px" }}
                  >
                    رمز عبور
                  </Label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="رمز عبور خود را وارد کنید"
                    autoFocus
                  />
                  <ErrorMessage
                    name="password"
                    component={"span"}
                    className="Error"
                  />
                </div>
                <div className="form-check mb-1">
                  <Input type="checkbox" id="rememberMe" name="rememberMe" />
                  <Label className="form-check-label" for="remember-me">
                    مرا به خاطر بسپار
                  </Label>
                </div>
                <Button type="submit" color="primary" block>
                  ورود
                </Button>
              </Form>
            </Formik>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
