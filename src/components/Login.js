import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Login() {
  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / username"
                  className="form-control inp_text"
                  id="email"
                />

                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>

                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />

                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>

                <Link to="/">
                  <button type="submit">Login</button>
                </Link>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
