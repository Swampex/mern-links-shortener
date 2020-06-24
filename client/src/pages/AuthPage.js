import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();

    const [form, setForm] = useState({email: '', password: ''});
    const changeHandler = event => {
        setForm( {...form, [event.target.name]: event.target.value} )
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error])

    useEffect( () => {
        window.M.updateTextFields()
    }, [] )

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', "POST", {...form})
            console.log('register data: ', data)
            message(data.message)
        }
        catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', "POST", {...form})
            console.log('login data: ', data)
            auth.login(data.token, data.userid)
            message(data.message)
        }
        catch (e) {}
    }

    return (
        <div>
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className={"input-grey"}
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className={"input-grey"}
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className={"btn yellow darken-3 auth_btn"}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>

                        <button
                            className={"btn grey lighten-1-3 black-text auth_btn"}
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;
