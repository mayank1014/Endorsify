import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from 'antd'
import Spinner from '../components/Spinner'
import DefaultLayout from '../components/DefaultLayout'
import '../css/StudentHomePage.css'

const StudentHomePage = () => {
    const [allProfessors, setAllProfessors] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/professors/getallprofessors")
            .then((response) => {
                console.log(response.data)
                setAllProfessors(response.data);
            })
            .catch((error) => {
                console.error("Error fetching professors : ", error);
            });
    }, []);

    return (
        <div className="professors-container">
            <div>{allProfessors.length<=0 && (<Spinner />)}</div>
            <Row justify="center" gutter={[16, 16]}>
                {allProfessors.map(professor => (
                    <Col lg={5} sm={12} xs={24} key={professor.id}>
                        <div className='professor-card'>
                            <img 
                                src={`data:image/jpeg;base64,${professor.profilePhoto}`}
                                alt="Professor Profile"
                                className='professor-img'
                            />
                            <div className='professor-details'>
                                <p className='professor-name'>{professor.name}</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default StudentHomePage;