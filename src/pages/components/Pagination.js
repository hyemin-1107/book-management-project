import React from "react";
import { useRecoilState } from "recoil";
import { booksState } from "../../utills/recoil";
import styled from "styled-components";

const Pagination = (props) => {

    const { onChangePage, page, limit } = props;
    const [setBooks] = useRecoilState(booksState);

    const totalPages = Math.ceil(setBooks.length / limit);

    const pageNumber = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumber.push(i);
    }

    const handlePageChange = (number) => {
        
        onChangePage(number);
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <PaginationButtonWrap>
            {pageNumber.map(number => (
                <PaginationButton
                    key={number}
                    onClick={() => handlePageChange(number)}
                    $isSelected={page === number}
                >
                    {number}
                </PaginationButton>
            ))}
        </PaginationButtonWrap>
    )
};

export default Pagination;

const PaginationButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const PaginationButton = styled.button`
    margin: 30px 6px 90px;

    width: 40px;
    height: 40px;
    
    font-weight: bold;
    
    background: ${(props) => (props.$isSelected ? "white" : "#1b5ac2")};
    color: ${(props) => (props.$isSelected ? "#1b5ac2" : "white")};
    
    border: 1px solid #777;
    border-radius: 3px;
    
    cursor: ${(props) => (props.$isSelected ? "revert" : "pointer")};

    &:hover {
        background: ${(props) => (props.$isSelected ? "white" : "white")};
        color: ${(props) => (props.$isSelected ? "#1b5ac2" : "#1b5ac2")};
    }
`