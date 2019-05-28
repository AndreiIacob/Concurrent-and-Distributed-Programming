import React from 'react';
import {NavLink} from 'react-router-dom'
import {TouchableOpacity} from "react-native";

const AbstractNavigation = (props) => {
    return (
        <NavLink to={props.to.web}  exact className="navLink">
            <TouchableOpacity style={props.style}>
            {props.children}
            </TouchableOpacity>
        </NavLink>
    )
}
export default AbstractNavigation;