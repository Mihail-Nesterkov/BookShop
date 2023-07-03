import './body/reset.css';
import './body/index.css';
import './body/header/header.css';
import './body/header/header-wrapper/head-wrapper.css';
import './body/header/header-wrapper/navigation/navigation.css';
import './body/header/header-wrapper/navigation/navigation-list/navigation-list.css';
import './body/header/header-wrapper/navigation-icon/navigation-icon-list/navigation-icon-list.css';
import './body/main/wrapper/slader/slader.css';
import './body/main/book-list/book-list.css';
import './body/main/book-list/book-list-categories/book-list-categories.css';
import './body/main/book-list/book-list-book/book-list-book.css';

import {initSlader} from "./js/slader.js";
import * as books from './body/main/book-list/book-list-categories/book-list-categories';
initSlader();
books.books();