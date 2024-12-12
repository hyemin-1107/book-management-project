![header](https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=300&section=header)

# 📚 Book Management Project

책을 관리하고 재고를 확인하며, 필요 시 삭제하거나 수량을 조정할 수 있는 도서 관리 웹 애플리케이션입니다.
React를 기반으로 제작되었으며 로컬 스토리지를 활용하여 데이터를 저장하고 관리합니다.

---

### 🚀 주요 기능

- **도서 목록 조회** : 등록된 도서를 목록으로 확인할 수 있습니다.
- **도서 수량 관리** : 도서의 재고 수량을 증가 또는 감소시킬 수 있습니다.
- **도서 삭제** : 불필요한 도서를 목록에서 삭제할 수 있습니다.
- **모달 창을 통한 상세 정보 확인** : 각 도서의 상세 정보를 모달로 확인 가능합니다.
- **로컬 스토리지 연동** : 도서 목록과 상태가 로컬 스토리지에 저장됩니다.

---

### 🛠️ 기술 스택

- **프론트엔드** : React, Styled-Components
- **상태 관리** : Recoil
- **데이터 저장소** : Local Storage

---

### 📂 폴더 구조

```bash
📦 book-management-project 
┣ 📂 public 
┃ ┗ 📜 books.json
┣ 📂 src 
┃ ┣ 📂 pages
┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┣ 📜 DetailedPage.js
┃ ┃ ┃ ┣ 📜 Pagination.js
┃ ┃ ┃ ┗ 📜 SearchBook.js
┃ ┃ ┣ 📜 AddBookPage.js
┃ ┃ ┗ 📜 Main.js
┃ ┣ 📂 utills
┃ ┃ ┗ 📜 recoil.js
┣ 📜 App.js
┣ 📜 index.css
┗ 📜 index.js
```

---
---

### 💻 설치 및 실행 방법

#### 1. 프로젝트 클론
```bash
git clone https://github.com/your-username/book-management-project.git
cd book-management-project
```
#### 2. 프로젝트 URL

이 프로젝트는 Vercel을 통해 배포되었습니다. 배포된 웹 애플리케이션을 아래 링크에서 확인할 수 있습니다.
```bash
https://book-management-eight-henna.vercel.app
```

---

### 📖 사용 방법

도서 목록에서 정보를 확인합니다.

- **제목과 저자로 필터링하고 검색할 수 있습니다.**
- **도서의 상세정보를 입력하여 목록에 추가할 수 있습니다.**
- **+ 또는 - 버튼으로 도서의 재고 수량을 조정할 수 있습니다.**
- **삭제 버튼을 클릭하여 도서를 목록에서 제거할 수 있습니다.**
- **모달을 통해 선택한 도서의 상세 정보를 확인할 수 있습니다.**

---

### 🖼️ 화면 예시

- **도서 목록이 정렬되어 있고 상단에 검색 기능이 있습니다.**
- **모달 창을 열면 각 도서의 상세 정보와 수량 조절 기능이 있습니다.**

**이미지**


---

### 📖 구현 과정

목업 데이터를 활용하여 데이터를 구성했습니다. 
public폴더에 books.json파일 생성 후 국립중앙도서관의 도서 목록 일부를 가져와 사용했습니다.
https://www.bigdata-culture.kr/bigdata/user/data_market/detail.do?id=63513d7b-9b87-4ec1-a398-0a18ecc45411


Recoil을 사용하여 전역 상태를 관리하고 있습니다. booksState atom을 정의하여 책 목록 데이터를 관리하고 상태를 여러 컴포넌트에서 공유할 수 있도록 했습니다.
```bash
// recoil.js

import { atom } from 'recoil';
export const booksState = atom({
  key: 'booksState',
  default: [],
});
```

---
json파일을 불러오고, 로컬 스토리지에 저장된 데이터를 결합하고 상태를 업데이트합니다.
```bash
//Main.js

//외부 데이터를 로드하고 기존 데이터와 결합하는 함수
const loadBooksData = (data) => {
    // 로컬 스토리지에 저장된 데이터가 있다면 가져온다.
    const saveBooks = JSON.parse(localStorage.getItem("books")) || [];

    // Map 객체가 키-값 쌍을 저장하기 때문에 book.id를 키로, book 객체를 값으로 저장
    // 중복된 book.id를 가진 책이 있을 경우 마지막으로 등장한 책이 저장
    // Map 객체의 값만 추출하기위해 .values()사용
    const joinBooks = [
        ...new Map([...data, ...saveBooks].map(book => [book.id, book])).values()
    ];

        setBooks(joinBooks);
        setFilteredBooks(joinBooks);
        setTotalItems(joinBooks.length);
    };

const loadBooksJSON = () => {
    fetch('/books.json') // 'public' 폴더에서 바로 접근
        .then(response => response.json())
        .then(data => {
            loadBooksData(data);
        })
        .catch(error => console.error("데이터를 불러올 수 없습니다.", error));
};
```

---
새로운 책을 추가할 때 setBooks를 사용하여 상태를 업데이트하고 localStorage에도 책 목록을 저장합니다.
```bash
// AddBookPage.js

const addBook = (books, setBooks, bookToAdd) => {
    // 기존 데이터, 새로 추가된 데이터
    const updatedBooks = [...books, bookToAdd];
    // 로컬 스토리지에 저장
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.publisher) {
        alert("책 제목, 저자, 출판사를 입력하였는지 확인해주세요.")
        return;
    }

    // 새로운 도서 ID 생성
    const newId = books.length + 1;
    // 새로운 도서 객체 생성
    const bookToAdd = { ...newBook, id: newId };
    //기존의 책 목록과 새로 추가된 책을 합친 배열 반환  
    addBook(books, setBooks, bookToAdd);

    alert("도서가 성공적으로 추가되었습니다.");
    navigate("/");
};
```
---

handleDeleteBook 함수에서는 책 삭제 전 사용자에게 확인을 요청하고 확인 후 책을 삭제하고 상태를 업데이트합니다.
```bash
// DetailedPage.js

const handleDeleteBook = (id) => {
    if (window.confirm("정말 이 도서를 삭제하시겠습니까?")) {

        // 해당 아이디 뺀 값만 담아서 상태 변경
        const updatedBooks = books.filter(b => b.id !== id);
        setBooks(updatedBooks);
        // 로컬 스토리지에 변경된 상태 덮어쓰기
        localStorage.setItem("books", JSON.stringify(updatedBooks));
        // 필터링된 리스트 렌더링
        setFilteredBooks(updatedBooks);
        onClickCloseButton();
    }
};
```

---

handleQuantityChange 함수에서는 도서 수량을 변경한 후 상태와 localStorage를 업데이트합니다.
```bash
//DetailedPage.js

const handleQuantityChange = (id, newQuantity) => {
    //수량이 바뀌는 id는 quantity키의 값을 변경시키고 아닌 id는 그대로 두는 새로운 배열
    const updatedQuantityBooks = books.map(b =>
        b.id === id ? { ...b, quantity: newQuantity } : b
    );

    // 상태와 로컬 스토리지에 업데이트된 데이터 저장
    setBooks(updatedQuantityBooks);
    localStorage.setItem("books", JSON.stringify(updatedQuantityBooks));
};
```

---

selectedBook이 있을 때만 모달을 보여주고 상태를 통해 모달을 제어합니다.
```bash
//Main.js

const onClickModal = (id) => {
    // 선택된 책의 정보를 추적하고 이를 모달에 전달
    setSelectedBookId(id);
    setIsModal(true);
};
// modal 컴포넌트의 인자로 전달, id 일치하는 데이터 찾기
const selectedBook = books.find(book => book.id === selectedBookId);

// id 일치하는 데이터의 상세정보를 보여줌
{selectedBook && (
        <DetailedPageModal
            book={selectedBook}
            isModal={isModal}
            onClickCloseButton={onClickCloseButton}
            setFilteredBooks={setFilteredBooks}
            setTotalItems={setTotalItems}
        />
)}
```

---

검색어를 입력하면 입력된 검색어에 맞는 책만 필터링하여 표시합니다.
```bash
//Main.js
// 부모 컴포넌트
const handleSearch = (result) => {
    setFilteredBooks(result); // 검색 결과 반영
    setTotalItems(result.length);
    setPage(1); // 어디서 검색하든 처음 페이지로 돌아가서 렌더링
};
return (
   <SearchBook books={books} handleSearch={handleSearch} />
)

// SearchBook.js
// 자식 컴포넌트
const [keyword, setKeyword] = useState(""); // ""의 공백이 있으면 인풋 클릭시 자동 띄어쓰기가 된다.

const handleFilterBooksSearch = () => {
    // 상태 searchType 기본값 "title"로 설정, 동일한 키워드 있을 시 포함하는 배열 생성 
    const filterBooks = books.filter(book =>
        book[searchType].toLowerCase().includes(keyword.toLowerCase())
    );
    handleSearch(filterBooks);
};
```

---
토탈 도서 수를 계산하여 배열에 담고 페이지를 표시합니다. 
handlePageChange는 다른 페이지 클릭시 브라우저 상단으로 이동합니다.
```bash
// Pagination.js
    
const totalPages = Math.ceil(setBooks.length / limit);

//totalPages를 배열에 담아서 나열
const pageNumber = [];
for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
}

const handlePageChange = (number) => {
    onChangePage(number);
    window.scrollTo({ top: 0, behavior: "smooth" })
}
```
---
---

##













