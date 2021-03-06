import { createStore } from 'redux'
let recordState;
const initialState = [
  {
    bookId: 0,
    bookName: "<<Test Book>>"
  }
]
const reducer = function (state = initialState, action) {
  recordState = state;
  switch (action.type) {
    case "addBook":
      return [
        ...state,
        {
          bookId: action.info.bookId,
          bookName: `<<${action.info.bookName}>>`
        }
      ]
    case "delBook":
      return state.filter(book => book.bookId != action.info.bookId)
    default:
      break;
  }
}
const store = createStore(reducer)

const addBook = document.getElementById('addBook');
const delBook = document.getElementById('delBook');
const bookList = document.getElementById('bookList');

const addBookBtn = document.createElement('button')
const bookNameInput = document.createElement('input')
const delBookBtn = document.createElement('button')
const bookIdInput = document.createElement('input')

addBookBtn.innerText = "Add Book"
delBookBtn.innerText = "Del Book"

addBookBtn.addEventListener('click', addBookFn)
delBookBtn.addEventListener('click', delBookFn)

addBook.appendChild(bookNameInput);
addBook.appendChild(addBookBtn);
delBook.appendChild(bookIdInput);
delBook.appendChild(delBookBtn);

function* generateID() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const generateId = generateID();
const genBookId = () => generateId.next().value;

function addBookFn() {
  const bookName = bookNameInput.value;
  if (bookName) {
    const bookId = genBookId();
    bookNameInput.value = "";
    const action = {
      type: "addBook",
      info: {
        bookId: bookId,
        bookName: bookName
      }
    }
    store.dispatch(action)
  } else {
    console.log("input bookname")
  }
}
function delBookFn() {
  const bookId = bookIdInput.value;
  if (bookId) {
    bookIdInput.value = "";
    const action = {
      type: "delBook",
      info: {
        bookId: bookId
      }
    }
    store.dispatch(action)
  } else {
    console.log("input bookid")
  }
}

const showState = store.subscribe(() => {
  console.log("New", store.getState());
  console.log("Old", recordState);
})

const showNewList = store.subscribe(() => {
  const currentState = store.getState()
  if (currentState.length !== recordState.length) {
    bookList.innerText = "";
    currentState.forEach(element => {
      bookList.appendChild(creatBookList(element))
    });
  }
})

function creatBookList(info) {
  const element = document.createElement('li')
  element.innerText = `BookID: ${info.bookId} BookName: ${info.bookName}`
  return element;
}