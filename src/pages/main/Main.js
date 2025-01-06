import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { booksState } from "../../atom/recoil";
import styled from "styled-components";
import DetailedPageModal from "./components/DetailedPage";
import Pagination from "./components/Pagination";
import BookList from "./components/BookList";
import SearchBookSection from "./components/SearchBookSection";
import HeaderContent from "./components/Header";

const Main = () => {

    const [dischargeBooks, setDischargeBooks] = useRecoilState(booksState);

    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [isModal, setIsModal] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [filteredBooks, setFilteredBooks] = useState([]);
    
    const onClickModal = (id) => {

        setSelectedBookId(id);
        setIsModal(true);
    };

    const onClickCloseButton = () => {

        setIsModal(false);
    };

    const selectedBook = dischargeBooks.find(book => book.id === selectedBookId);

    const loadBooksData = (data) => {

        const saveBooks = JSON.parse(localStorage.getItem("books")) || [];
      
        const joinBooks = [
            ...new Map([...data, ...saveBooks].map(book => [book.id, book])).values()
        ];

        setDischargeBooks(joinBooks);
        setFilteredBooks(joinBooks);
        setTotalItems(joinBooks.length);
    };

    const loadBooksSavedData = () => {

        fetch('booksData/books.json')
            .then(response => response.json())
            .then(data => {
                loadBooksData(data);
            })
            .catch(error => console.error("데이터를 불러올 수 없습니다.", error));
    };

    useEffect(() => {

        loadBooksSavedData();
    }, []);

    const onChangePage = (newPage) => {

        setPage(newPage);
    };

    const handleSearch = (result) => {
        
        setFilteredBooks(result);
        setTotalItems(result.length);
        setPage(1);
    };

    const startIndex = (page - 1) * limit;

    const currentPageItems = filteredBooks.slice(startIndex, startIndex + limit);

    return (
        <MainPage>
            <HeaderContent />

            <SearchBookSection
                handleSearch={handleSearch}
            />

            <BookList
                currentPageItems={currentPageItems}
                onClickModal={onClickModal}
            />

            {selectedBook && (
                <DetailedPageModal
                    book={selectedBook}
                    isModal={isModal}
                    onClickCloseButton={onClickCloseButton}
                    setFilteredBooks={setFilteredBooks}
                    setTotalItems={setTotalItems}
                />
            )}

            {filteredBooks.length === 0 ? (
                <p style={{ textAlign: "center" }}>검색 결과가 없습니다.</p>
            ) : (
                <Pagination
                    page={page}
                    totalItems={filteredBooks}
                    limit={limit}
                    onChangePage={onChangePage}
                />
            )}
        </MainPage>
    )
};

export default Main;

const MainPage = styled.main`
    margin: 120px auto 0;
    width: 58%;

    ul{
        margin: 0;
        padding: 0;
        
        h2{
            padding-left: 6px;

            font-size: 16px;
            text-align: left;
        }
    }
`