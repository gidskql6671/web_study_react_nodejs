import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Button } from 'react-bootstrap';


const Post = () => {
	let [posts, setPosts] = useState([]);
	const style = {color: "black", width: "18rem"};
	
	useEffect(() => {
		axios.get('/api/post')
		.then((res) => {
			console.log(res);
			setPosts(res.data);
		})
	}, []);
	
	return (
		<div>
			<Card style={style}>
				<Card.Header>Database Items</Card.Header>
				<ListGroup variant="flush">
					{
						posts.map((post, i) =>{
							return <ListGroup.Item key={i}>
								<MyCard id={post._id} name={post.title} age={post.content} />
							</ListGroup.Item>
						})
					}
				</ListGroup>
			</Card>
		</div>
	);
};

const MyCard = ({id, name, age}) => {
	return <div>
		<p> {id} </p>
		<h4> {name} </h4>
		<p> {age}살 </p>
	</div>
}


export default Post;