function books(){
const list = document.querySelector('.book-list-categories-list');
const cardBook = document.querySelector('.card-book');
const categories = ["Architecture", "Art & Fashion", "Biography", "Business", "Crafts & Hobbies", "Drama", "Fiction", "Food & Drink", "Health & Wellbeing", "History & Politics", "Humor", "Poetry", "Psychology", "Science", "Technology", "Travel & Maps"];
let newCategories = [];
const cotegories_list = ["Architecture", "Art", "Biography & Autobiography", "Business", "Crafts & Hobbies", "Drama", "Fiction", "Cooking", "Health & Wellbeing", "History", "Humor", "Poetry", "Psychology", "Science", "Technology", "Travel"];
let ind = 0;
let card = '';
let maxResult = 0;
let ratingValue = [];
let ratingsCount = '';
let booksId = [];
let localBook;

function categoriesF(){
    for (let i = 0; i < categories.length; i++){
        newCategories.push(`<li class='book-list-categories-list__list-book'>${categories[i]}</li>`);
    }
    list.innerHTML = newCategories.join('');
    activCategories(ind);
}
let allLi = '';
function activCategories(ind){
    allLi = document.querySelectorAll('.book-list-categories-list__list-book');
    allLi[ind].id = `categoriesActive`;
}
function clickCategories(){
    for (let i = 0; i < allLi.length; i++){
        allLi[i].addEventListener('click', function (){
            allLi[ind].removeAttribute('id');
            ind = newCategories.indexOf(newCategories[i]);
            activCategories(ind);
            card = '';
            maxResult = 0;
            ratingValue = [];
            useRequest(maxResult, ind);
        });
    }
}
async function useRequest(maxResult, ind) {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${cotegories_list[ind]}"&key=AIzaSyCcvD2L3e-yGHFXA1JMZag-Jec9Ig12824&printType=books&startIndex=${maxResult}&maxResults=6&langRestrict=en`);
    const jsonData = await res.json();
    display(jsonData);
}
function display(jsonData) {
    for (let i = 0; i < jsonData.items.length; i++) {
        let price = '';
        if (jsonData.items[i].saleInfo.retailPrice == undefined) {
            price = '';
        } else {
            price = `$${jsonData.items[i].saleInfo.retailPrice.amount}`;
        }
        let description = '';
        if (jsonData.items[i].volumeInfo.description == undefined) {
            description = '';
        } else {
            description = `${jsonData.items[i].volumeInfo.description}`;
        }
        if (jsonData.items[i].volumeInfo.averageRating == undefined) {
            ratingValue.push(0);
        } else {
            ratingValue.push(jsonData.items[i].volumeInfo.averageRating * 50 / 5);
        }
        if (jsonData.items[i].volumeInfo.ratingsCount == undefined) {
            ratingsCount = '';
        } else {
            ratingsCount = jsonData.items[i].volumeInfo.ratingsCount + ' review';
        }
        const cardBlock = `
            <div class="card-book-singl">
            <div class="card-book__block-book"><img src="${jsonData.items[i].volumeInfo.imageLinks.thumbnail}" alt="" class="card-book__img-book"></div>
            <div class="card-book-info">
            <p class="card-book__authors">${jsonData.items[i].volumeInfo.authors}</p>
            <p class="card-book__title">${jsonData.items[i].volumeInfo.title}</p>
            <div class="rating">
                 <div class="star">
                    <div class="star_active" style="width: ${ratingValue[i]}%"></div>
                    <div class="ratingsCount">${ratingsCount}</div>
                 </div>
            </div>
                 <p class="card-book__description">${description}</p>
                 <p class="card-book__price">${price}</p>
                 <button class="card-book__button" id="${jsonData.items[i].id}">BUY NOW</button>
            </div>                    
        </div>`;
        card = card + cardBlock;
    }
    cardBook.innerHTML = card;
    storage();
    startBook(localBook);
}
function storage(){
    localBook = JSON.parse(localStorage.getItem("booksId"));
    if (localBook === null){
        localBook = [];
    }
    if (booksId.length === localBook.length){
        inTheCard();
        buyNow();
        initCounter(booksId);
    }else {
        startBook(localBook);
    }
}
function buyNow(){
    let all_btn_buyNow = '';
    all_btn_buyNow = document.querySelectorAll('.card-book__button');
    for (let i = 0; i < all_btn_buyNow.length; i++){
        all_btn_buyNow[i].addEventListener('click', () => {
            let buyId = `${all_btn_buyNow[i].id}`;
            booksId.push(`${all_btn_buyNow[i].id}`);
            booksId = Array.from(new Set(booksId));
            localStorage.setItem('booksId', JSON.stringify(booksId));
            initBtnBuy(buyId);
        });
    }
}
function initBtnBuy(buyId){
    document.querySelector(`#${buyId}`).setAttribute('class', 'card-book__button-active');
    document.querySelector(`#${buyId}`).innerText = 'IN THE CART';
    storage();
}
function inTheCard(){
    let all_btn_inTheCart = document.querySelectorAll('.card-book__button-active');
    for (let i = 0; i < all_btn_inTheCart.length; i++){
        all_btn_inTheCart[i].addEventListener('click', () => {
            let inId = `${all_btn_inTheCart[i].id}`;
            let del = booksId.indexOf(`${all_btn_inTheCart[i].id}`);
            if (del === 0){
                booksId = [];
            }else {
                booksId.splice(`${del}`, `${del}`);
            }
            localStorage.setItem('booksId', JSON.stringify(booksId));
            initBtnIn(inId);
        });
    }
}
function initBtnIn(inId){
    document.querySelector(`#${inId}`).setAttribute('class', 'card-book__button');
    document.querySelector(`#${inId}`).innerText = 'BUY NOW';
    storage();
}
function startBook(localBook){
    if (localBook.length > 0){
        for (let i = 0; i < localBook.length; i++) {
            if ((document.querySelector(`#${localBook[i]}`)) !== null){
            document.querySelector(`#${localBook[i]}`).setAttribute('class', 'card-book__button-active');
            document.querySelector(`#${localBook[i]}`).innerText = 'IN THE CART';
            }
            booksId = localBook;
        }
        initCounter(booksId);
        storage();
    }
}
let loadMore = document.querySelector('.book-list-book__load-more');
loadMore.addEventListener('click', () => {
    maxResult += 6;
    useRequest(maxResult, ind);
});
function initCounter(booksId){
    if (booksId.length > 0){
        let counterNumber = `<p class="number">${booksId.length}</p>`;
        document.querySelector('.navigation-icon-counter').style.display = 'flex';
        document.querySelector('.navigation-icon-counter').innerHTML = counterNumber;
    }else {
        document.querySelector('.navigation-icon-counter').style.display = 'none';
    }
}
    useRequest(maxResult, ind);
    categoriesF();
    clickCategories();
}
export {books};