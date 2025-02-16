// Book class: Represnts a Book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

// UI Class: Handle UI Tasks
class UI{
    static displayBooks(){


        const books= Store.getBooks();

        books.forEach((book)=>UI.addBookToList(book));
    }

    static addBookToList(book){
        const list=document.querySelector('#Book-list');

        const row=document.createElement('div');

        row.innerHTML=`
        <div class="flex flex-row justify-between border px-3">
        <div>${book.title}</div>
        <div>${book.author}</div>
        <div >${book.isbn}</div>
        <button style="background-color: rgb(220 38 38);"class="border rounded delete">X</button>
        </div>
        `
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.remove();
            UI.showAlert('Book Removed','black');
        }
    }

    static showAlert(message,className){
        const div=document.createElement('div');
        div.style.backgroundColor = className;
        div.className='border text-white alert';
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('#container');
        const form=document.querySelector('#Book-form');
        container.insertBefore(div,form);

        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }

    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
}

// Store Class: Handles Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books=Store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books= Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

// Event: Add a Book
document.querySelector('#Book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

    if(title===''|| author==='' || isbn===''){
        UI.showAlert('PLease fill in all fields','red');
    }
    else{
        const book= new Book(title,author,isbn);

        UI.addBookToList(book);

        Store.addBook(book);

        UI.showAlert('Book Added','green');

        UI.clearFields();
    }

});

//Event: Remove a Book

document.querySelector('#Book-list').addEventListener('click',(e)=>{
   UI.deleteBook(e.target);
   
   Store.removeBook(e.target.previousElementSibling.textContent);
})
