import React from "react";
import { useLocation } from "react-router-dom";

const StudentRegister = () => {

    const location = useLocation();

    return (
        <div>
            <h3>{ location.state.email }</h3>
            <h3>{ location.state.password }</h3>
        </div>
    )
}

export default StudentRegister