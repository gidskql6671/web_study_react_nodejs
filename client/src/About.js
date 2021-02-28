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
					<Col md={6}>
						<h5> 한것들 </h5>
						<ul>
							<li> 나중에 axios로 구현</li>
						</ul>
					</Col>
					<Col md={6}>
						<h5> 관심 분야</h5>
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