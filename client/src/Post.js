import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import 'scss/Post.scss';

const Post = ( {match} ) => {
	let [posts, setPosts] = useState([]);
	let [maxPage, setMaxPage] = useState(1);
	let [pages, setPages] = useState([]);
	const style = {color: "black", width: "18rem"};
	let currentPage = match.params.page ?  parseInt(match.params.page): 1;
	
	
	useEffect(() => {
		axios.get('/api/post/pageCount')
		.then(( {data} ) =>{
			let maxPage = data.count;
			
			setMaxPage( maxPage );
			
			// 페이지 버튼? 구현중... 나중에 인터넷 찾아봐서 더 잘 만들어보자.
			let pageIndex = parseInt((currentPage - 1) / 5); // page의 인덱스를 나타냄. 1~5까지가 0번째, 6~10까지가 1번째
			const pageElements = [];
			
			pageElements.push({ name: "left" ,value: pageIndex * 5})
			for (let i = pageIndex * 5 + 1; i <= (pageIndex + 1) * 5 && i <= maxPage; i++)
				pageElements.push({ name: "page" ,value: i});
			pageElements.push({ name: "right" ,value: (pageIndex + 1) * 5 + 1})
			setPages(pageElements);
		})
		.catch(err => console.log("fecth pageCount error"));
		
		axios.get('/api/post/page/' + currentPage)
			.then((res) => {
				setPosts(res.data);
			});
		
		console.log("rendering");
	}, [match.params.page]);
	
	
	return (
		<div>
			<h2> Post </h2>
			<hr className="hr-headline"/>
			<ul>
			{
				posts.map((post, i) =>{
					return <li key={i}>
						<MyCard id={post._id} name={post.title} age={post.content} />
					</li>
				})
			}
			</ul>
			<div className="container-pages">
				{
					pages.map((page, i) =>{
						if (page.name == 'left'){
							return <Link key={i} to={`/post/page/${page.value}`} className="pagination-post"><Button> &#xE000; </Button></Link>	
						}
						else if (page.name == 'right'){
							return <Link key={i} to={`/post/page/${page.value}`} className="pagination-post"><Button>  &#xE001; </Button></Link>	
						}	
						
						return <Link key={i} to={`/post/page/${page.value}`} className="pagination-post"><Button> {page.value} </Button></Link>		
					})
				}
			</div>
		</div>
	);
};

const MyCard = ({id, name, age}) => {
	return <div>
		<p> {id} </p>
		<h4> {name} </h4>
		<p> {age}살 </p>
		<hr />
	</div>
}


export default Post;