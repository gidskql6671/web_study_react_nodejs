import React, {useState} from 'react';
import axios from 'axios';


const Post = () => {
	let [posts, setPosts] = useState();
	
	return (
		<div>
			<button onClick={() => {
					axios.get('/post')
					.then((data) => {setPosts(data)})
					.catch((e) => {console.log(e)});
				}}> Click me! </button>
			<p> {posts} </p>
		</div>
	);
};


export default Post;