/* eslint-disable */

import React, {useState, lazy, Suspense } from 'react';
import { Nav, Container, Navbar, Row, Col, Image, Spinner } from 'react-bootstrap';
import './App.scss';
import { Link, Route, Switch } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Home from './Home.js';
//let Detail = lazy(() => {return import('./Detail.js')});
//let Post = lazy(() => {return import('./Post.js')});




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
			hi
		</div>
		
	);
};

/*
const Profile = ({toggleImage = true, color = 'white'}) =>{
	
	return(
		<div style={{color: color}}>
			{ toggleImage && <Image src="images/profile.png" roundedCircle className="image-profile mb-3" />}
			<h4> 김동환 </h4>
			<p> ASD AAA</p>
		</div>
	);
};



			<Container fluid className="container-navbar">
				<Navbar expand="md" variant="dark">
					<Navbar.Brand as={Link} to="/"> Home </Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link as={Link} to="/detail">Detail</Nav.Link>
							<Nav.Link as={Link} to="/post">Post</Nav.Link>
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
							<Route path="/detail" component={Detail} />
							<Route path="/post" component={Post} />
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
		
*/


export default App;
