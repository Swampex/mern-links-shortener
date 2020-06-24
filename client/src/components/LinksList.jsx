import React from "react";
import {NavLink} from "react-router-dom";
import {Link} from 'react-router-dom'

export const LinksList = ({links}) => {

    if (!links.length) {
        return (
            <p className='center'>Заведите первую <NavLink to='/create'>ссылку</NavLink></p>
        )
    }

    return (
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Оригинальная</th>
                <th>Сокращенная</th>
                <th>Детальная информация</th>
            </tr>
            </thead>

            <tbody>
            { links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td><Link to={`detail/${link._id}`}>Перейти</Link></td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}
