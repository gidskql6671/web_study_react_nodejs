import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'scss/Pagination.scss';

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
		
		// 한번에 최대 7개의 번호를 보여줄 것임.
		let start_index = currentPage - 3, end_index = currentPage + 3;
		
		// 페이지 개수가 6개 이하인 경우
		if (start_index <= 0 && end_index > totalPages){
			start_index = 1;
			end_index = totalPages;
		}
		// 현재 페이지 번호가 1, 2, 3인 경우
		else if (start_index <= 0){
			start_index = 1;
			end_index = 7;
		}
		// 현재 페이지 번호가 totalPages, totalPages - 1, totalPages - 2인 경우
		else if (end_index > totalPages){
			end_index = totalPages;
			start_index = totalPages - 6;
		}
		
		for(let i = start_index; i <= end_index; i++)
			pages.push(i);
		
		
		setPageNumbers(pages);
	}, [totalPosts, currentPage]);
	
	
	return <div className="pagination-post"><ul >
		{
			pageNumbers.map((page) => {
				return <li key={page} > <Button key={page} onClick={() => { paginate(page) }}> {page} </Button> </li>
			})
		}
	</ul></div>
		
};


export default Pagination;