import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Button, Spinner } from 'react-bootstrap';

import './About.scss';


const About = () => {
	let [data, setData] = useState({});
	
	useEffect(() => {
		axios.get('/api/about')
		.then((res) => {
			setData(res.data);
		})
	}, []);
	
	return (
		<div>
			<h2> About </h2>
			<hr className="hr-headline"/>
			<div>
				<h4 className="summary"> { data.summary ? data.summary : <Spinner animation="border" /> } </h4>
				<Row>
					<Col md={6} className="activity">
						<h5> activity </h5>
						<ul>
							{
								data.activity
								?	data.activity.map((activity, i) =>{
										return <li key={i}> {activity} </li>
									})
								: <Spinner animation="border" />
							}
						</ul>
					</Col>
					<Col md={6} className="interest">
						<h5> Interests </h5>
						<ul>
							{
								data.interest
								?	data.interest.map((interest, i) =>{
										return <li key={i}> {interest} </li>
									})
								: <Spinner animation="border" />
							}
						</ul>
					</Col>
				</Row>
			</div>
		</div>
	);
};


export default About;