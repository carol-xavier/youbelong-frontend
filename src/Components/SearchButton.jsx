import styled, { ThemeProvider } from "styled-components";

function SearchButton(props) {
    const { id, category, icon, color, setColor } = props;

    return (
        <ThemeProvider theme={color.active === id ? selected : notSelected} key={id}>
            <Box key={id} onClick={() => setColor({ active: id })}>
                <Image>{icon}</Image>
                <h2>{category}</h2>
            </Box>
        </ThemeProvider>
    )
}

export default SearchButton;

const Box = styled.div`
    width: 6.4rem;
    height: 7.4rem;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.color}; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;

    & > h2{
        font-size: 1rem;
        color: #5B5858;
    }

`;

const Image = styled.div`
    font-size: 4rem;
    color: #D9D9D9;
`;

const notSelected = {
    color: '#CAC1C1'
}

const selected = {
    color: '#79BFD6'
};