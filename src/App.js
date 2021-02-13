/*eslint-disable*/

import React, {useState} from 'react';
import { Jumbotron, Button, Col, Row, Card, Container, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import datas from './data.js';
import Detail from './detail.js';


function App() {
	
	return (
		<div className="App">
				
			{/* <TestModal /> */}
			{/* <TestUseState /> */}
			{/*<TestInput1 /> */}
			{/* <TestPost /> */}
			{/* <TestBootstrap /> */}
				
			<TestRouter />
			
		</div>
	);
}

function TestRouter(){
	return(
	<div>
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="#home">Nav-Bar</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link><Link to="/"> home </Link></Nav.Link>
					<Nav.Link><Link to="/detail"> detail </Link></Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		
		<Switch>
			<Route path="/" exact>
				<Jumbotron className="siteJumbotron">
					<h1>Hello, world!</h1>
					<p>
					This is a simple hero unit, a simple jumbotron-style component for calling
					extra attention to featured content or information.
					</p>
					<p>
						<Button variant="primary">Learn more</Button>
					</p>
				</Jumbotron>
			</Route>
			<Route path="/detail">
				<Detail />
			</Route>
		</Switch>
		
	</div>
	);
}

function TestBootstrap(){
	let [post, setPost] = useState(datas);
	
	return(
		<div>
			<Jumbotron className="siteJumbotron">
				<h1>Hello, world!</h1>
				<p>
				This is a simple hero unit, a simple jumbotron-style component for calling
				extra attention to featured content or information.
				</p>
				<p>
					<Button variant="primary">Learn more</Button>
				</p>
			</Jumbotron>
			<Container>
				<Row>
					{
						post.map((data, i) => {
							return(
								<Col md={4}> 
									<Card><Card.Body>
										<Card.Title> {data.title} </Card.Title>
										<Card.Subtitle className="mb-2 text-muted">{data.price}</Card.Subtitle>
										<Card.Text>
											{data.content}
										</Card.Text>
									</Card.Body></Card>
								</Col>
							)
						})
					}
				</Row>
			</Container>
		</div>
	);

}



function TestPost(){
	let [posts, setPosts] = useState([]);
	let [inputValue, setInputValue] = useState({});
	
	
	function changeInput(e){
		let {name, value} = e.target;
		
		/* 새로운 오브젝트를 만들어서 업데이트 */
		// let newObject = {...inputValue};
		// newObject[name] = value;
		// setInputValue(newObject);
		
		/* 비구조화 할당을 통한 업데이트 */
		setInputValue(
			{
				...inputValue,
				[name]: value
			}
		);
	}
	function createPost(){
		let newArray = [...posts];
		let {name, contents} = {...inputValue};
		
		newArray.push({name: name, contents: contents});
		setPosts(newArray);
	}
	function deletePost(i){
		console.log(i);
		let newArray = [...posts];
		newArray.splice(i, 1);
		setPosts(newArray);
	}
	
	
	
	return(
		<div>
			<div>
				<span> 글 제목 : </span> <input name="name" onChange={changeInput} />
				<span> 글 내용 : </span> <input name="contents" onChange={changeInput} />
				<button onClick={createPost}> 글 생성 </button>
			</div>
			
			{posts.map(function(data, i){
				return(
					<div className="post" key={i}>
						<h3> {data.name} </h3>
						<p> {data.contents} </p>
						<button onClick={(e)=>{deletePost(i)}}> 삭제 </button>
					</div>
				);
			})}
		</div>
	);
}

function Modal(props){
	let {data, num} = props;
	
	return(
		<div className="modal">
			<h2>{data[num]}</h2>
			<p>날짜</p>
			<p>상세내용</p>
		</div>
	);
}
function TestModal(){
	let [modal, setmodal] = useState(false);
	let [seletedNumber, setSeletedNumber] = useState(0);
	let [testData, setTestData] = useState(["aaaaa", "bbbbbb", "cccccc"]);
	
	return(
		<div>
			<div>
			{
				testData.map(function(data, i){
					return(
						<div className="post" key={i} onClick={()=>{setSeletedNumber(i)}}>
							<h3>{data}</h3>
							<hr />
						</div>
					);
				})
			}
			</div>
			<button onClick={()=>{setmodal(data=>!data)}}> ON </button>
			{
				modal === true
				? <Modal data={testData} num={seletedNumber}></Modal>
				: null
			}
		</div>
	);
}

function TestUseState(){
	let [test, setTest] = useState(0);
	let [a, setA] = useState([1,2]);
	
	function asd(i){
		let newArray = [...a];
		newArray[i] += 1;
		setA(newArray);
	}
	
	return(
		<div>
			<p><span onClick={()=>{setTest(data=>data+1)}}>Click : </span>  {test}</p>

			<p onClick={()=>{asd(0);}}>aaaaaaaa</p>
			<p onClick={()=>{asd(1);}}>bbbbbbbb</p>
			<p>{a[0]}</p>
			<p>{a[1]}</p>
		</div>
	);
}

function TestInput1(){
	let [inputValue, setInputValue] = useState("");
	
	return(
		<div>
			<input onChange={(e)=>{ setInputValue(e.target.value) }} />
			
			<p> input 값 : {inputValue} </p>
		</div>
	);
}

export default App;
