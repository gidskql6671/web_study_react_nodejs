/*eslint-disable*/

import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Container, Alert } from 'react-bootstrap';

function Detail(props){
	let history = useHistory();
	let {id} = useParams();
	let {post: datas, setPost: setData} = props;
	let [toggleAlert, setToggleArert] = useState(true);
	
	let content = datas.find(element => element.id == id);
	
	useEffect(()=>{
		let timer = setTimeout( ()=>{ setToggleArert(false) }, 1000);
		
		return () => {clearTimeout(timer)};
	}, [ toggleAlert ]);
	
	
	return(
		<div>
			<Card><Card.Body>
				<Card.Title> {content.title} </Card.Title>
				<Card.Subtitle className="mb-2 text-muted">{content.price}</Card.Subtitle>
				<Card.Text>
					{content.content}
				</Card.Text>
				<Info stock={content.stock}/>
      			<Button className="mr-2" onClick={()=>{
						let newData = [...datas];
						newData.map((data) =>{if (data.id == id && data.stock > 0) data.stock -= 1;});
						setData(newData);
					}}> 주문하기 </Button>
				{/* useHistory는 주로 링크 자체가 아닌 버튼이나 다른 상호작용을 통한 이동을 구현하기위해 사용 */}
				<Button variant="danger" onClick={()=>{ history.goBack() }}> 뒤로가기 </Button> 
			</Card.Body></Card>
			{
				toggleAlert 
				? <Alert variant="warning"> 알림창 </Alert>
				: null
			}

		</div>
	);
}

function Info(props){
  return (
    <p>재고 : {props.stock}</p>
  )
}

export default Detail;