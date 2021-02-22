import React, {useState} from 'react';
import axios from 'axios';


const Post = () => {
	let [posts, setPosts] = useState();
	
	return (
		<div>
			<button onClick={() => {
					axios.get('/api/post')
					.then((data) => {setPosts(data)})
				}}> Click me! </button>
			<p> {posts} </p>
		</div>
	);
};


export default Post;