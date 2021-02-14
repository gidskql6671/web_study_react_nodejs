/*eslint-disable*/

import React, {useState} from 'react';
import { Jumbotron, Button, Col, Row, Card, Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import './practice.scss';
import datas from './practice-data.js';
import Detail from './practice-detail.js';



export function TestRouter(){
	let [post, setPost] = useState(datas);
	
	
	// option 값에 따라 content를 정렬. 0일시 title, 1일시 id
	function sortContent(params){
		let {option} = params;
		let newPost = [...post];
		
		if (option == 0){
			newPost.sort((data1, data2)=>{
				let d1 = data1.title.toUpperCase();
				let d2 = data2.title.toUpperCase();

				if (d1 < d2)
					return -1;
				else
					return 1;
			})
		}
		else if (option == 1){
			newPost.sort((data1, data2)=>{
				return data1.id - data2.id;
			})
		}
		
		setPost(newPost);
	}
	
	//
	function fecthDatas(){
		axios.get('https://codingapple1.github.io/shop/data2.json')
		.then((result)=>{ setPost(prev => [...prev, ...result.data]) })
		.catch((e) => {console.log(e)});
	}
	
	return(
	<div>
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="#home">Nav-Bar</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={Link} to="/"> home </Nav.Link>
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
				<div>
					<Button variant="primary" className="m-3" onClick={() => {sortContent({option: 0})}}> Sort by Title</Button>
					<Button variant="primary" className="m-3" onClick={() => {sortContent({option: 1})}}> Sort by id</Button>
				</div>
					<CardContent post={post} />
				<Button variant="primary" onClick={fecthDatas}> 더보기 </Button>
			</Route>
			<Route path="/detail/:id">
				<Detail post={post} setPost={setPost}/>
			</Route>
		</Switch>
		
	</div>
	);
}

function CardContent(props){
	let {post} = props;
	let history = useHistory();
	
	return(
		<div>
			<Container>
				<Row>
					{
						post.map((data, i) => {
							return(
								<Col md={4} key={i}> 
									<Card><Card.Body>
										<Card.Title> {data.title} </Card.Title>
										<Card.Subtitle className="mb-2 text-muted">{data.price}</Card.Subtitle>
										<Card.Text>
											{data.content}
										</Card.Text>
										<Button onClick={()=>{history.push("/detail/" + data.id)}}> Detail </Button>
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

export function TestPost(){
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

export function Modal(props){
	let {data, num} = props;
	
	return(
		<div className="modal">
			<h2>{data[num]}</h2>
			<p>날짜</p>
			<p>상세내용</p>
		</div>
	);
}
export function TestModal(){
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

export function TestUseState(){
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

export function TestInput1(){
	let [inputValue, setInputValue] = useState("");
	
	return(
		<div>
			<input onChange={(e)=>{ setInputValue(e.target.value) }} />
			
			<p> input 값 : {inputValue} </p>
		</div>
	);
}

