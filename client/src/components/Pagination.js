import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*
	postsperPage : 페이지당 포스트 개수 (기본값 : 10)
	totalPosts : 총 페이지 개수
	currentPage : 현재 페이지
*/
const Pagination = ( { postsPerPage = 10, totalPosts, currentPage, paginate } ) => {
	
	// 총 페이지 개수.
	const totalPages = Math.ceil(totalPosts / postsPerPage);
	
	let [pageNumbers, setPageNumbers] = useState([]);
	

	useEffect(() => {
		let pages = [];
		
		for(let i = currentPage - 4; i <= currentPage + 5; i++){
			if (i <= 0 || i > totalPages){
				continue;
			}
			
			pages.push(i);
		}
		
		setPageNumbers(pages);
	}, [totalPosts, currentPage]);
	
	return <ul className="pagination" >
		{
			pageNumbers.map((page) => {
				return <li key={page} > <Button key={page} onClick={() => { paginate(page) }}> {page} </Button> </li>
			})
		}
	</ul>
};


export default Pagination;