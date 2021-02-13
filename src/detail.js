/*eslint-disable*/

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';


function Detail(){
	
	let history = useHistory();
	
	return(
	<Card><Card.Body>
		<Card.Title> Detail Title </Card.Title>
		<Card.Subtitle className="mb-2 text-muted">Detail Subtitle</Card.Subtitle>
		<Card.Text>
			Detail
		</Card.Text>
		{/* useHistory는 주로 링크 자체가 아닌 버튼이나 다른 상호작용을 통한 이동을 구현하기위해 사용 */}
		<Button variant="danger" onClick={()=>{ history.goBack() }}> 뒤로가기 </Button> 
	</Card.Body></Card>
	);
}

export default Detail;