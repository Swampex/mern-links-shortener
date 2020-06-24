import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <NavLink to='/' className='brand-logo left header-name'>Сократи ссылку</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Создание</NavLink></li>
                    <li><NavLink to='/links'>Список</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выход</a></li>
                </ul>
            </div>
        </nav>
    )
}

