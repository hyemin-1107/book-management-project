import { useRecoilState } from "recoil";
import { booksState } from "../../../atom/recoil";
import styled from "styled-components";


const DetailedPageModal = (props) => {
    
    const { isModal, book, onClickCloseButton, setFilteredBooks } = props;
    const [dischargeBooks, setDischargeBooks] = useRecoilState(booksState);

    const handleQuantityChange = (id, newQuantity) => {

        const updatedQuantityBooks = dischargeBooks.map(b =>
            b.id === id ? { ...b, quantity: newQuantity } : b
        );

        setDischargeBooks(updatedQuantityBooks);
        localStorage.setItem("books", JSON.stringify(updatedQuantityBooks));
    };
    
    const handleDeleteBook = (id) => {
        
        if (window.confirm("정말 이 도서를 삭제하시겠습니까?")) {

            const updatedBooks = dischargeBooks.filter(b => b.id !== id);
            setDischargeBooks(updatedBooks);

            localStorage.setItem("books", JSON.stringify(updatedBooks));
            
            setFilteredBooks(updatedBooks);

            onClickCloseButton();
        }
    };

    return (
        <ModalWrap $isModal={isModal}>
            <ModalContainer $isModal={isModal}>
                <BookInformationSection>
                    <img src={book.image} alt={book.title} />
                    <section>
                        <div>
                            <strong> No. {book.id}</strong>
                            <h1>{book.title}</h1>
                            <p>{book.description}</p>
                        </div>
                        <ul>
                            <li> 저 자 <div>{book.author}</div></li>
                            <li> 출판사 <div>{book.publisher}</div></li>
                            <li> 발행일 <div>{book.publishDate}</div></li>
                            <li> 가 격 <div>{book.price} 원</div></li>
                        </ul>
                    </section>
                </BookInformationSection>
                
                <BookQuantityWrap>
                    <button
                        onClick={() => handleQuantityChange(book.id, book.quantity - 1)}
                        disabled={book.quantity <= 0}
                    >
                        -
                    </button>
                    <span>재 고 : {book.quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(book.id, Number(book.quantity) + 1)}
                    >
                        +
                    </button>
                </BookQuantityWrap>
                 
                <ModalButton >
                    <DeleteButton onClick={() => handleDeleteBook(book.id)}>
                        Delete
                    </DeleteButton>

                    <CloseButton onClick={onClickCloseButton}>Close</CloseButton>
                </ModalButton>
            </ModalContainer>
        </ModalWrap>
    )
};

export default DetailedPageModal;

const ModalWrap = styled.div`
    display: ${(props) => (props.$isModal ? "block" : "none")};
    position: fixed;

    top: 0;
    left: 0;  
   
    width: 100%;
    height: 100%;

    background-color: rgba(0,0,0,0.1);
`

const ModalContainer = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);

    display: ${(props) => (props.$isModal ? "block" : "none")};
    align-items: center;
    justify-content: center;

    width: 1130px;
    height: 620px;
    
    font-size: 20px;    
    
    overflow: hidden;

    background: #fff;
    border-radius: 3px;

    animation: modal 0.3s ease;
    @keyframes modal {
        from {
          transform: translate(-50%, -60%);
        }
        to {
          transform: translate(-50%, -50%);
        }
      } 
`

const BookInformationSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px auto 0;
    gap: 66px;

    width: 960px;
    height: 430px;

    img{
        width: 220px;
        height: 330px; 
    }

    section{
        padding-bottom: 16px;

        border-bottom: .5px solid #999;

        div{

            strong{
                font-size: 18px;
            }
                
            h1{
                margin-bottom: 30px;
            }

            p{
                margin-bottom: 86px;
                
                font-size: 16px;
                font-style: italic;

                color: #333;

                word-break: keep-all;
            }
        }

        ul{
            display: grid;
            grid-template-columns: repeat(2, 350px);
            
            padding: 0px;
            margin: 0;

            font-size: 16px;
            font-weight: 500;

            li{
                display: flex;

                margin-bottom: 10px;
                font-weight: 700;

                div{
                    margin-left: 20px;
                    font-weight: 400;
                    color: #333;
                }
            }
        }
    }
`
const BookQuantityWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 10px;
    gap: 22px;

    font-weight: 700;
    
    button{
        width: 52px;
        height: 38px;

        font-weight: 700;
        font-size: 18px;

        background-color: #fff;
        border: .5px solid #999;

        cursor: pointer;
    }
`

const ModalButton = styled.div`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, 0);

    display: flex;
    justify-content: space-between;

    width: 390px; 
`

const CloseButton = styled.button`
    padding: 10px;

    width: 180px;

    font-size: 20px;
    font-weight: bold;
    
    color: #fff;
    background: #1b5ac2;


    border: none;
    border-radius: 3px;

    cursor: pointer;
`

const DeleteButton = styled.button`
    padding: 10px;

    width: 180px;

    font-size: 20px;
    font-weight: bold;
    
    color: #fff;
    background: #8b1c1c;

    border: none;
    border-radius: 3px;

    cursor: pointer;
`