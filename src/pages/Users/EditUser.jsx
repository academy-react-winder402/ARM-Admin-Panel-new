import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Button, Input, Label } from "reactstrap";

function EditUser() {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={{
          phoneOrGmail: "",
          password: "",
          rememberMe: true,
        }}
        onSubmit={onSubmit}
        //validationSchema={validation}
      >
        <Form className="auth-login-form mt-2">
          <div className="mb-1 ">
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
          <div className="mb-1 ">
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
          <button type="submit" color="primary" block>
            ورود
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default EditUser;
