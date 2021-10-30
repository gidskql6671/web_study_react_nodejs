import styled from "styled-components";

const HeaderContainer = styled.header`
    background-color: gray;
    width: 100%;
    margin-top: 0;
    display: flex;
    justify-content: center;
`;
const Title = styled.h2`
`;

function Header(){
    return (
        <HeaderContainer>
            <Title> Header </Title>
        </HeaderContainer>
    );
}

export default Header;