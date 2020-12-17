/* call to endpoint max results */
export const MAX_RESULTS = 200;

/* sugar to sessionstorage stored info key */
export const SUGAR = 'eines1pac1';

/* number of books shown in homepage. Optimized for 4. Unexpected behaviour if changed */
export const HOME_BOOKS_NUMBER = 4;

/* name of category and book page */
export const CATEGORY_PAGE_NAME = 'category.html';
export const BOOK_PAGE_NAME = 'book.html';

/* topics and his tags to make calls to endpoint it's possible to add more topics without change anyting else */
export const TOPICS = {
    HTML: 'html,html5,mvc,w3c',
    CSS: 'css3,css,css-2,CSSDoc,estilos,maquetacion,bootstrap,canvas,responsive,estilos,guia-de-estilo,presentacion,comunicacion,diseno-2',
    JavaScript: 'javascript,jquery,dom,typescript,json-2,ajax,ecmascript',
    Backend: '.net,asp,php,mysql,node-js,mongodb,ruby-on-rails,postgreesql,asp,bases-de-datos,hosting,net,python,node,sql,unix,php-2,java,apache,nosql',
    Frameworks: 'framework,angular,codeigniter,react,react-js,react-native,mvc,rxjs,vue,laravel'
}

/* Endpoint to make calls */
export const ENDPOINT = {
    /* https://openlibra.com/es/page/public-api public API enpoint */
    OPEN_LIBRA: 'https://www.etnassoft.com/api/v1/get/'
}

/* locations of site */
export const LOCATIONS = {
    home: ['index.html',''],
    category: ['category.html'],
    book: ['book.html']
}

/* number of elements in category page */
export const N_ELEMENTS_PAGE = 12;

/* related books number. Optimized for 4. Unexpected behaviour if changed */
export const N_RELATED_BOOKS = 4;