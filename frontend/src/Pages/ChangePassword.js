import React from "react";
import { Col, Row, Form, Input } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import NavDefaultLayout from "../components/NavDefaultLayout";
import Spinner from "../components/Spinner";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function ChangePassword({ match }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function onFinish(reqObj) {
    reqObj._id = user._id;
    reqObj.role = user.role;

    if (user.password !== reqObj.oldpassword) {
      message.error("You have entered wrong old password");
    } else {
      try {
        axios.post("http://localhost:8000/api/users/changepassword", reqObj);
  
        const user = localStorage.getItem("user");
  
        if (user) {
          const parsedData = JSON.parse(user);
          parsedData.password = reqObj.password;
          localStorage.setItem("user", JSON.stringify(parsedData));
        }
  
        setTimeout(() => {
          message.success("Password updated successfully");
  
          if (JSON.parse(localStorage.getItem("user")).username !== "admin@gmail.com" && JSON.parse(localStorage.getItem("user")).role === "student")
              navigate("/student/home");
          else if(JSON.parse(localStorage.getItem("user")).role === "professor")
              navigate("/professor/home");
          else if(JSON.parse(localStorage.getItem("user")).role === "university")
              navigate("/university/students");
          else 
              navigate("/admin");
        }, 500);
      } catch (error) {
        message.success("Something went wrong");
        console.log(error);
      }
    }
  }
  const LayoutComponent = user?.role === "professor" ? NavDefaultLayout : DefaultLayout;
  return (
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Change Password</h3>

            <hr />
            <Form.Item
              initialValue={user.email}
              name="email"
              label="Email"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="oldpassword"
              label="Old Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="New Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <div className="text-right">
              <button className="btn btn-primary">Change Password</button>
            </div>
          </Form>
        </Col>
      </Row>
  );
}

export default ChangePassword;