import React, { useState } from "react";
import styled from "styled-components";

const SearchBook = (props) => {
    
    const { dischargeBooks, handleSearch } = props;

    const [searchType, setSearchType] = useState("title");
    const [keyword, setKeyword] = useState("");

    const handleFilterBooksSearch = () => { 
        
        const filterBooks = dischargeBooks.filter(book =>
            book[searchType].toLowerCase().includes(keyword.toLowerCase())
        );
        handleSearch(filterBooks);
    }

    return (
            <SearchWrap>
                <Select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="title">제목</option>
                    <option value="author">저자</option>
                </Select>

                <div>
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleFilterBooksSearch()}
                    />

                    <button onClick={handleFilterBooksSearch}>검색</button>
                </div>
            </SearchWrap>
    )
};

export default SearchBook;

const SearchWrap = styled.section`
    display: flex;

    margin-bottom: 60px;
    gap: 8px;

    div{
        height: 40px;
        width: 498px;
        
        border: 1px solid #1b5ac2;
        border-radius: 3px;
        
        background: #fff;
    }

    input{
       width: 390px;
       
       padding: 12px 10px;
       
       border: 0px;
       border-radius: 3px;
       
       float: left;
       
       outline: none;
    }

    button{
        width: 80px;
        height: 100%;
        
        font-weight: 600;
        
        color: #fff;
        background-color: #1b5ac2;
        
        float: right;

        cursor: pointer;
    }
`

const Select = styled.select`
    width: 90px;
    padding: 3px;

    cursor: pointer;
`