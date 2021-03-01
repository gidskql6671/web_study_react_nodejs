/* eslint-disable */

import React, {useState, lazy, Suspense } from 'react';
import { Nav, Container, Navbar, Row, Col, Image, Spinner, Button } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import 'scss/App.scss';

import Home from './Home.js';
let Post = lazy(() => {return import('./Post.js')});
let About = lazy(() => {return import('./About.js')});




const App = () => {
	
	const isPc = useMediaQuery({
		query: "(min-width:1200px)"
	});
	const isNotPc = useMediaQuery({
		query : "(max-width:1200px)"
	});
	
	let [toggleProfile, setToggleProfile] = useState(false);
	
	return (
		<div className="App">
			<Container fluid className="container-navbar">
				<Navbar expand="md">
					<Navbar.Brand as={Link} to="/"> Home </Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link as={Link} to="/achievement">Achieves</Nav.Link>
							<Nav.Link as={Link} to="/post">Post</Nav.Link>
							<Nav.Link as={Link} to="/about">About</Nav.Link>
							<Nav.Link href="https://github.com/gidskql6671"><FontAwesomeIcon id="github-icon" icon={faGithub} /></Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Container>
			
			<Row className="container-main">
				{ isPc && 
					<Col xl="2" className="container-profile">
						<Profile />
					</Col>
				}
				<Col className="container-content">	
					<Suspense fallback={ <div className="text-center"> <Spinner animation="border" /> </div> }>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/post/:page" component={Post} />
							<Route path="/post" component={Post} />
							<Route path="/about" component={About} />
						</Switch>
					</Suspense>
				</Col>
			</Row>
			
			{	isNotPc && <Image src="images/profile.png" roundedCircle className="image-toggle-profile" onClick={
							() => {setToggleProfile(prev => !prev);}}/>
			}
			{
				isNotPc && toggleProfile 
				?
				<div className="container-profile-mini arrow_box">
					<Profile toggleImage={false}  />
				</div>
				: null
			}
		</div>
		
	);
};


const Profile = ({toggleImage = true, color = '#222222'}) =>{
	
	return(
		<div style={{color: color}}>
			{ toggleImage && <Image src="images/profile.png" roundedCircle className="image-profile mb-3" />}
			<h4> 김동환 </h4>
			<p> ASD AAA</p>
		</div>
	);
};



export default App;
