import React, {useState} from 'react';
import axios from 'axios';
import { Card, ListGroup, Button } from 'react-bootstrap';


const Post = () => {
	let [posts, setPosts] = useState([]);
	const style = {color: "black", width: "18rem"};
	
	return (
		<div>
			<button onClick={() => {
					axios.get('/api/post')
					.then(({ data }) => { 
						console.log(data);
						setPosts(data);
						
					})
				}}> Click me! </button>
			<Card style={style}>
				<Card.Header>Database Items</Card.Header>
				<ListGroup variant="flush">
					{
						posts.map((post, i) =>{
							return <ListGroup.Item key={i}>
								<MyCard id={post._id} name={post.name} age={post.age} />
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