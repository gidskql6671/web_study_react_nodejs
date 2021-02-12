import React, {useState} from 'react';
import './App.css';

function App() {
	let [a, b] = useState([1,2]);
	let [modal, setmodal] = useState(false);
	
	function asd(i){
		let newArray = [...a];
		newArray[i] += 1;
		b(newArray);
	}
	
	
	return (
		<div className="App">
			<div>
				<p onClick={()=>{asd(0);}}>aaaaaaaa</p>
				<p onClick={()=>{asd(1);}}>bbbbbbbb</p>
				<p>{a[0]}</p>
				<p>{a[1]}</p>
				
				<p onClick={()=>{setmodal(!modal)}}> ccccc</p>
			</div>
			{
				modal === true
				? <Modal></Modal>
				: null
			}
		</div>
	);
}

function Modal(){
	return(
		<div className="modal">
			<h2>제목</h2>
			<p>날짜</p>
			<p>상세내용</p>
		</div>
	)
}

export default App;
