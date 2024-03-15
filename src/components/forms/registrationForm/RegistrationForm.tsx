import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../customInput/CustomInput";
import Button, { ButtonProps } from "../../customButton/CustomButton";
import { useCreateUserMutation } from "../../../redux/api/usersApi";

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const [createUser] = useCreateUserMutation();

    const registrationButtonProps: ButtonProps = {
        type: "submit",
        variant: "primary",
        color: "blue",
        width: "300px"
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            userName: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Некорректный email").required("Обязательное поле"),
            userName: Yup.string().required("Обязательное поле"),
            password: Yup.string().required("Обязательное поле")
        }),
        onSubmit: async (values) => {
            const { email, userName, password } = values;
            const result = await createUser({ email, userName, password });
            if (result) {
                navigate("/login");
            }
        }
    });

    return (
        <div>
            <h3>Регистрация</h3>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Введите email"
                    width="300px"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                )}

                <Input
                    type="text"
                    label="Имя пользователя"
                    name="userName"
                    placeholder="Введите имя пользователя"
                    width="300px"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.userName && formik.errors.userName && (
                    <div style={{ color: "red" }}>{formik.errors.userName}</div>
                )}

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
                {formik.touched.password && formik.errors.password && (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}

                <Link to="/login">У меня есть аккаунт, войти</Link>
                <div>
                    <Button {...registrationButtonProps}>Зарегистрироваться</Button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
