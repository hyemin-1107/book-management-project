import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBook from "./SearchBook";


const SearchBookSection = (props) => {

    const { handleSearch } = props;

    return (
        <SearchAddSection>
            <SearchBook handleSearch={handleSearch} />
            <Link to="/add-book">
                <AddBookButton>도서 추가</AddBookButton>
            </Link>
        </SearchAddSection>
    )
};

export default SearchBookSection;

const SearchAddSection = styled.section`
    display: flex;
    justify-content: center;

    gap: 22px;

    margin-bottom: 30px;
`

const AddBookButton = styled.button`
    width: 140px;
    height: 42px;
    
    font-weight: 600;

    color: #fff;
    background-color: #1b5ac2;
    
    border-radius: 3px;

    cursor: pointer;
`
