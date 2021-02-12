/*eslint-disable*/

import React, {useState} from 'react';
import './App.css';

function App() {
	let [modal, setmodal] = useState(false);
	let [seletedNumber, setSeletedNumber] = useState(0);
	let [testData, setTestData] = useState(["aaaaa", "bbbbbb", "cccccc"]);
	
	return (
		<div className="App">
			<TestPropsChildren>
				<div>
					{
						testData.map(
							function(data, i){
								return(
									<div className="post" onClick={()=>{setSeletedNumber(i)}}>
										<h3>{data}</h3>
										<hr />
									</div>
								);
							}
						)
					}
				</div>
				<button onClick={()=>{setmodal(data=>!data)}}> ON </button>
				
				{/* <Test1 /> */}
				
				{
					modal === true
					? <Modal data={testData} num={seletedNumber}></Modal>
					: null
				}
			</TestPropsChildren>
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

function Test1(){
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

function TestPropsChildren(props){ // wrapper 역할로 사용...
	return(
		<div className="wrapper">
			{props.children}
		</div>
	);
}

export default App;
