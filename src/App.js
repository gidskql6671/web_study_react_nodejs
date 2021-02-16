import React, {useState, useEffect} from 'react';
import { Button, Nav, Container } from 'react-bootstrap';
import './App.scss';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Home from './Home.js';
import Detail from './Detail.js';

function App() {
	
	return (
		<div className="App">
			<Container fluid className="container-navbar">
				<Container>
					<Nav className="navbar-main">
						<Nav.Item>
							<Nav.Link eventKey="link-0" as={Link} to="/">Home</Nav.Link>
						</Nav.Item>
						<div className="ml-auto">
							<Nav.Item>
								<Nav.Link eventKey="link-1" as={Link} to="/detail">Detail</Nav.Link>
							</Nav.Item>
						</div>
					</Nav>
				</Container>
			</Container>

			<Container className="container-Main">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/detail" component={Detail} />
				</Switch>
			</Container>
		</div>
		
	);
}




export default App;
