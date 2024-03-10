import React, { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
        localStorage.removeItem("university")
        
        message.error("Something went wrong");

        navigate('/')
  }, [])

  return (
    <div>
      <Spinner />
    </div>
  );
};

export default Cancel;
