import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../customInput/CustomInput";
import Button, { ButtonProps } from "../../customButton/CustomButton";
import { useLoginMutation } from "../../../redux/api/loginApi";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();

    const loginButtonProps: ButtonProps = {
        type: "submit",
        variant: "primary",
        color: "blue",
        width: "300px"
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Некорректный email").required("Обязательное поле"),
            password: Yup.string().required("Обязательное поле")
        }),
        onSubmit: async (values) => {
            const result = await login({ email: values.email, password: values.password });
            if ("data" in result) {
                const { token } = result.data;
                localStorage.setItem("token", token);
                localStorage.setItem("isAuth", "true");
                navigate("/");
            }
        }
    });

    return (
        <div>
            <h3>Вход</h3>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Введите сообщение"
                    width="300px"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null
                }

                <Input
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Введите пароль"
                    width="300px"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                    formik.touched.password && formik.errors.password ? (
                        <div style={{ color: "red" }}>{formik.errors.password}</div>
                    ) : null
                }

                <Link to="/registration">Нет аккаунта, зарегистрируйтесь</Link>
                <div>
                    <Button {...loginButtonProps}>Войти</Button>
                </div>
            </form >
        </div >
    );
};

export default LoginForm;
