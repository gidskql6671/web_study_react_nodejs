import React from 'react';
import styled from "styled-components";
import { RecoilRoot } from 'recoil';
import Header from './components/Header';

const Content = styled.div`
	text-align: center;
`;

function App() {
	return (
		<RecoilRoot>
			<Header/>
			<Content>
				내용
			</Content>
		</RecoilRoot>
	);
}

export default App;
