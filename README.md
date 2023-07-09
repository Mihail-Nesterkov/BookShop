# BookShop

ЗАДАНИЕ

В рамках проекта вам необходимо:

Сверстать главную страницу интернет-магазина Bookshop.
Подключить Google Books API так, чтобы данные о книгах подгружались с сервера.
Подключить созданный вами ранее слайдер.
Поработать над правильной организацией проекта:
реализовать модульную структуру;
подключить Webpack;
настроить сборку с минификацией.
Применить пройденные вами ранее инструменты оптимизации.

ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ

В рамках проекта нужно создать одну (главную) страницу книжного магазина. На странице должен быть следующий набор элементов:

1
Шапка сайта
Шапка содержит логотип, навигацию и набор кнопок. Ссылки в меню можно оставить пустыми, так как реализация остальных страниц сайта в проекте не предусмотрена.

2 
Слайдер
Под шапкой сайта располагается слайдер. Чтобы сократить время разработки, рекомендуем вам использовать слайдер, которые вы создали при прохождении модулей по JavaScript.

Слайдер автоматически пролистывает изображения каждые 5 секунд, а после последнего изображения вновь переключается на первое. Перелистывать изображения можно также с помощью точек под слайдером.
Справа от слайдера располагаются цветные блоки. Их нужно сверстать как ссылки, адреса ссылок можно оставить пустыми.

3
Список категорий и список книг
Под слайдером в левой части экрана располагается список категорий. Активная категория должна быть выделена визуально.
По умолчанию в качестве активной выбрана первая категория в списке. Клик на неактивную категорию делает её активной, и список книг перезагружается, чтобы отобразить книги из этой категории.

Список книг подгружается из Google Books API в соответствии с выбранной категорией. Для списка книг необходимо реализовать ленивую загрузку: сначала подгружаются первые 6 книг, по клику на кнопку «Load more» — ещё 6, и так далее.

4
Карточка книги
В карточке книги должна быть отображена следующая информация:

Обложка. Если API не возвращает обложку, подставить вместо неё любую картинку-плейсхолдер.
Автор. Если авторов несколько, перечислить их через запятую.
Заголовок.
Рейтинг: от 1 до 5 звёздочек плюс общее количество отзывов. Если в данных о книге нет рейтинга, не показывать эту строчку.
Описание. Если текст в описании занимает больше 3-х строк, его нужно обрезать и добавить в конце многоточие.
Цена с указанием валюты. Если в данных о книге нет цены, не показывать эту строчку.
Под описанием каждой книги должна быть кнопка «Buy now». При клике на неё товар добавляется в корзину, а кнопка меняет внешний вид (см. скриншот выше). При повторном нажатии на кнопку товар убирается из корзины.

Информация о книгах, добавленных в корзину, должна сохраняться в localStorage.
