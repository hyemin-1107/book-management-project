import styled from "styled-components";

const BookList = (props) => {

    const { currentPageItems, onClickModal } = props;

    return (
        <ul>
            {currentPageItems.map(book => (
                <li key={book.id} onClick={() => onClickModal(book.id)}>
                    <BookListButton>
                        <span>
                            <p>{book.id}.</p>
                            <h2>{book.title}</h2>
                        </span>
                        <div>
                            <strong>{book.author}</strong>
                            <p>{book.publisher}</p>
                        </div>
                    </BookListButton>
                </li>
            ))}
        </ul>
    )
}

export default BookList;


const BookListButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 8px 18px;
    gap: 30px;

    width: 100%;

    border-bottom: .5px solid #999;

    background-color: #fff;

    cursor: pointer;

    strong{

    }

    span{
        display: flex;
        align-items: center;

        font-size: 16px;
        font-weight: 600;
        
        gap: 6px;
    }
        
    div{
        display: flex;
        align-items: center;

        gap: 14px;
        p{
            color: #333;
        }

    }
`