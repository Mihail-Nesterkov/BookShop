
const list = document.querySelector('.book-list-categories-list');
const cardBook = document.querySelector('.card-book');
const categories = ["Architecture", "Art & Fashion", "Biography", "Business", "Crafts & Hobbies", "Drama", "Fiction", "Food & Drink", "Health & Wellbeing", "History & Politics", "Humor", "Poetry", "Psychology", "Science", "Technology", "Travel & Maps"];
let newCategories = [];
const cotegories_list = ["Architecture", "Art", "Biography & Autobiography", "Business", "Crafts & Hobbies", "Drama", "Fiction", "Cooking", "Health & Wellbeing", "History", "Humor", "Poetry", "Psychology", "Science", "Technology", "Travel"];
let ind = 0;

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
            useRequest(maxResult);
        });
    }
}
let arr;
let card = '';
let maxResult = 0;
let ratingValue = [];
let ratingsCount = '';
let booksId = new Map();

function useRequest(maxResult) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${cotegories_list[ind]}"&key=AIzaSyCcvD2L3e-yGHFXA1JMZag-Jec9Ig12824&printType=books&startIndex=${maxResult}&maxResults=6&langRestrict=en`)
        .then((response) => {
            const result = response.json();
            return result;
        })
        .then((data) => {
            arr = data;
            display(arr);
        })
        .catch(() => {
            console.log('error');
        });
}
function display(arr) {
    for (let i = 0; i < arr.items.length; i++) {
        let price = '';
        if (arr.items[i].saleInfo.retailPrice == undefined) {
            price = '';
        } else {
            price = `$${arr.items[i].saleInfo.retailPrice.amount}`;
        }
        let description = '';
        if (arr.items[i].volumeInfo.description == undefined) {
            description = '';
        } else {
            description = `${arr.items[i].volumeInfo.description}`;
        }
        if (arr.items[i].volumeInfo.averageRating == undefined) {
            ratingValue.push(0);
        } else {
            ratingValue.push(arr.items[i].volumeInfo.averageRating * 50 / 5);
        }
        if (arr.items[i].volumeInfo.ratingsCount == undefined) {
            ratingsCount = '';
        } else {
            ratingsCount = arr.items[i].volumeInfo.ratingsCount + ' review';
        }
        const cardBlock = `
            <div class="card-book-singl">
            <div class="card-book__block-book"><img src="${arr.items[i].volumeInfo.imageLinks.thumbnail}" alt="" class="card-book__img-book"></div>
            <div class="card-book-info">
            <p class="card-book__authors">${arr.items[i].volumeInfo.authors}</p>
            <p class="card-book__title">${arr.items[i].volumeInfo.title}</p>
            <div class="rating">
                 <div class="star">
                    <div class="star_active" style="width: ${ratingValue[i]}%"></div>
                    <div class="ratingsCount">${ratingsCount}</div>
                 </div>
            </div>
                 <p class="card-book__description">${description}</p>
                 <p class="card-book__price">${price}</p>
                 <button class="card-book__button" id="${arr.items[i].id}">BUY NOW</button>
            </div>                    
        </div>`;
        card = card + cardBlock;
    }
    cardBook.innerHTML = card;
    let localBook = new Map(JSON.parse(localStorage.myMap));
    startBook(localBook);
    buyNow();
    inTheCard();
    initCounter(booksId);
}
function buyNow(){
    let all_btn_buyNow = '';
    all_btn_buyNow = document.querySelectorAll('.card-book__button');
    for (let i = 0; i < all_btn_buyNow.length; i++){
        all_btn_buyNow[i].addEventListener('click', () => {
            let buyId = `${all_btn_buyNow[i].id}`;
            booksId.set(`${all_btn_buyNow[i].id}`, `${all_btn_buyNow[i].id}`);
            localStorage.myMap = JSON.stringify(Array.from(booksId.entries()));
            initCounter(booksId);
            initBtnBuy(buyId);
        });
    }
}
function initBtnBuy(buyId){
    document.querySelector(`#${buyId}`).setAttribute('class', 'card-book__button-active');
    document.querySelector(`#${buyId}`).innerText = 'IN THE CART';
    inTheCard();
}
function inTheCard(){
    let all_btn_inTheCart = document.querySelectorAll('.card-book__button-active');
    for (let i = 0; i < all_btn_inTheCart.length; i++){
        all_btn_inTheCart[i].addEventListener('click', () => {
            let inId = `${all_btn_inTheCart[i].id}`;
            booksId.delete(`${inId}`);
            localStorage.myMap = JSON.stringify(Array.from(booksId.entries()));
            initCounter(booksId);
            initBtnIn(inId);
        });
    }
}
function initBtnIn(inId){
    document.querySelector(`#${inId}`).setAttribute('class', 'card-book__button');
    document.querySelector(`#${inId}`).innerText = 'BUY NOW';
    buyNow();
}
function startBook(localBook){
    booksId = localBook;
    for (let key of localBook.keys()) {
        if (document.querySelector(`#${key}`) !== null) {
            document.querySelector(`#${key}`).setAttribute('class', 'card-book__button-active');
            document.querySelector(`#${key}`).innerText = 'IN THE CART';
        }
    }
}
let loadMore = document.querySelector('.book-list-book__load-more');
loadMore.addEventListener('click', () => {
    maxResult += 6;
    useRequest(maxResult);
});
function initCounter(booksId){
    if (booksId.size > 0){
        let counterNumber = `<p class="number">${booksId.size}</p>`;
        document.querySelector('.navigation-icon-counter').style.display = 'flex';
        document.querySelector('.navigation-icon-counter').innerHTML = counterNumber;
    }else {
        document.querySelector('.navigation-icon-counter').style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', categoriesF);
document.addEventListener('DOMContentLoaded', useRequest(ind));
document.addEventListener('DOMContentLoaded', clickCategories);

export {list, categories, cotegories_list, categoriesF, activCategories, useRequest};