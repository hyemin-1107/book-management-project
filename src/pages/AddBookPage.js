import { useState } from "react"
import { useRecoilState } from "recoil";
import { booksState } from "../utills/recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const AddBookPage = () => {

    const [books, setBooks] = useRecoilState(booksState);

    const [newBook, setNewBook] = useState({
        id: "",
        title: "",
        author: "",
        publisher: "",
        publishDate: "",
        price: "",
        description: "",
        image: "",
        quantity: "",
    });

    const navigate = useNavigate();


    const handleInputChange = (e) => {

        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewBook(prevBook => ({
                        ...prevBook,
                        [name]: reader.result,
                    }));
                };
                reader.readAsDataURL(file);
            } 
        } else {

            setNewBook(prevBook => ({
                ...prevBook,
                [name]: value,
            }));
        }
    };

    const addBook = (books, setBooks, bookToAdd) => {
        
        const updatedBooks = [ bookToAdd, ...books];

        localStorage.setItem("books", JSON.stringify(updatedBooks));

        setBooks(updatedBooks);
    };


    const handleSubmit = (e) => {
        
        e.preventDefault();
  
        if (!newBook.title || !newBook.author || !newBook.publisher) {
            alert("책 제목, 저자, 출판사를 입력하였는지 확인해주세요.")
            return;
        }

        const newId = books.length + 1;
    
        const bookToAdd = { ...newBook, id: newId };
         
        addBook(books, setBooks, bookToAdd);

        alert("도서가 성공적으로 추가되었습니다.");
        navigate("/");
    };

    return (
        <AddBookPageWrap>
            <h1>도서 추가</h1>
            <AddBookForm onSubmit={handleSubmit}>
                {ADD_BOOK_INPUT.map((data) => (
                    <input
                        key={data.name}
                        type={data.type}
                        name={data.name}
                        placeholder={data.placeholder}
                        value={data.type !== "file" ? newBook[data.name] : ""}
                        onChange={handleInputChange}
                        quantity={data.quantity}
                        accept={data.accept}
                    />
                ))}
                <button type="submit">도서 추가</button>
            </AddBookForm>
        </AddBookPageWrap>
    )
};

export default AddBookPage;

const AddBookPageWrap = styled.div`
    margin: 90px auto 0;
    width: 630px;

    h1{
        text-align: center;
        margin-bottom: 40px;
    }
`

const AddBookForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 8px;

    font-size: 14px;
  }

  button {
    padding: 8px;
    margin-top: 16px;

    font-size: 16px;
    font-weight: 700;

    background-color: #1b5ac2;
    color: white;
    
    border-radius: 3px;
    border: none;
    
    cursor: pointer;
  }
`

const ADD_BOOK_INPUT = [
    { name: "title", placeholder: "책 제목", type: "text" },
    { name: "description", placeholder: "책 소개", type: "text" },
    { name: "author", placeholder: "저 자", type: "text" },
    { name: "publisher", placeholder: "출판사", type: "text" },
    { name: "publishDate", placeholder: "출판일", type: "date" },
    { name: "price", placeholder: "가 격", type: "number" },
    { name: "quantity", placeholder: "수량", type: "number"},
    { name: "image", placeholder: "이미지", type: "file", accept: "image/*" },
];