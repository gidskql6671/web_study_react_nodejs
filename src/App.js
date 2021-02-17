import React, {useState, useEffect} from 'react';
import { Button, Nav, Container, Navbar } from 'react-bootstrap';
import './App.scss';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

import Home from './Home.js';
import Detail from './Detail.js';
import Post from './Post.js';

function App() {
	const isPc = useMediaQuery({
		query: "(min-width:1024px)"
	});
	const isTablet = useMediaQuery({
		query : "(min-width:768px) and (max-width:1023px)"
	});
	const isMobile = useMediaQuery({
		query : "(max-width:767px)"
	});
	
	
	return (
		<div className="App">
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

			{ isPc && <div className="container-profile">\
				ASDASDSAASasdasdadasddsaasd\
			</div>}
			
			<Container className="container-main">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/detail" component={Detail} />
					<Route path="/post" component={Post} />
				</Switch>
			</Container>
		</div>
		
	);
}




export default App;
