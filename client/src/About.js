import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

import './About.scss';


const About = () => {
	return (
		<div>
			<h2> About </h2>
			<hr class="hr-headline"/>
			<div>
				<h4 class="summary"> 요약~ </h4>
				<Row>
					<Col md={6} class="activity">
						<h5> activity </h5>
						<ul>
							<li> 나중에 axios로 구현</li>
						</ul>
					</Col>
					<Col md={6} class="interest">
						<h5> Interests </h5>
						<ul>
							<li> 나중에 axios로 구현 </li>
						</ul>
					</Col>
				</Row>
			</div>
		</div>
	);
};


export default About;