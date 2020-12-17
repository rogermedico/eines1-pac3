import { BOOK_PAGE_NAME, CATEGORY_PAGE_NAME, LOCATIONS, N_RELATED_BOOKS } from './constants';
import { buildFooter } from './buildFooter';
import { getHomeUrl, searchToJSON } from './url';

function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export function buildBook(data){

  /* Get search */
  const search = searchToJSON();

  /* search for the book */
  let allBooks = [];
  let book = {};
  Object.values(data).forEach(topic => allBooks = allBooks.concat(topic));
  book = allBooks.find(b => b.ID === search.id);

  /* check if book is correct */
  if(!book){ 
    window.location.href = getHomeUrl();
  }

  /* search book topics */
  const bookTopics = [];
  Object.entries(data).map(([k,v])=>{
    if(v.find(b => b.ID == book.ID)) bookTopics.push(k)
  });

  /* build content book info */
  bookInfo(book,bookTopics);

  /* build related books */
  relatedBooks(data,bookTopics);
  
  /* build footer links */
  buildFooter(data);

}

function bookInfo(book,bookTopics){

  /* set title */
  const titleSpan = document.createElement('span');
  titleSpan.classList.add('animated-title');
  titleSpan.textContent = book.title;
  const title = document.querySelector('#book-title');
  title.classList.add('book--main--subtitle');
  title.appendChild(titleSpan);

  /* cover */
  const cover = document.createElement('img');
  cover.setAttribute('src',book.cover);
  cover.setAttribute('alt',`${book.cover} cover`);
  cover.classList.add('book--main--content--cover--img');
  document.querySelector('#book-cover').appendChild(cover);
  
  /* book details */
  const detailsSection = document.querySelector('#book-content');

  /* author */
  const authorContainer = document.createElement('div');
  authorContainer.classList.add('book--main--content--info--detail');
  const authorLegend = document.createElement('div');
  authorLegend.classList.add('book--main--content--info--detail--legend');
  authorLegend.textContent = 'Author';
  authorContainer.appendChild(authorLegend);
  const author = document.createElement('div');
  author.classList.add('book--main--content--info--detail--value');
  author.textContent = book.author;
  authorContainer.appendChild(author);
  detailsSection.appendChild(authorContainer);

  /* publisher */
  const publisherContainer = document.createElement('div');
  publisherContainer.classList.add('book--main--content--info--detail');
  const publisherLegend = document.createElement('div');
  publisherLegend.classList.add('book--main--content--info--detail--legend');
  publisherLegend.textContent = 'Publisher';
  publisherContainer.appendChild(publisherLegend);
  const publisher = document.createElement('div');
  publisher.classList.add('book--main--content--info--detail--value');
  publisher.textContent = book.publisher;
  publisherContainer.appendChild(publisher);
  detailsSection.appendChild(publisherContainer);

  /* year */
  const yearContainer = document.createElement('div');
  yearContainer.classList.add('book--main--content--info--detail');
  const yearLegend = document.createElement('div');
  yearLegend.classList.add('book--main--content--info--detail--legend');
  yearLegend.textContent = 'Year';
  yearContainer.appendChild(yearLegend);
  const year = document.createElement('div');
  year.classList.add('book--main--content--info--detail--value');
  year.textContent = book.publisher_date;
  yearContainer.appendChild(year);
  detailsSection.appendChild(yearContainer);

  /* language */
  const languageContainer = document.createElement('div');
  languageContainer.classList.add('book--main--content--info--detail');
  const languageLegend = document.createElement('div');
  languageLegend.classList.add('book--main--content--info--detail--legend');
  languageLegend.textContent = 'Language';
  languageContainer.appendChild(languageLegend);
  const language = document.createElement('div');
  language.classList.add('book--main--content--info--detail--value');
  language.textContent = book.language;
  languageContainer.appendChild(language);
  detailsSection.appendChild(languageContainer);

  /* pages */
  const pagesContainer = document.createElement('div');
  pagesContainer.classList.add('book--main--content--info--detail');
  const pagesLegend = document.createElement('div');
  pagesLegend.classList.add('book--main--content--info--detail--legend');
  pagesLegend.textContent = 'Pages';
  pagesContainer.appendChild(pagesLegend);
  const pages = document.createElement('div');
  pages.classList.add('book--main--content--info--detail--value');
  pages.textContent = book.pages;
  pagesContainer.appendChild(pages);
  detailsSection.appendChild(pagesContainer);

  /* content */
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('book--main--content--info--detail');
  const contentLegend = document.createElement('div');
  contentLegend.classList.add('book--main--content--info--detail--legend');
  contentLegend.textContent = 'Content';
  contentContainer.appendChild(contentLegend);
  const content = document.createElement('div');
  content.classList.add('book--main--content--info--detail--value');
  content.textContent = decodeHtml(book.content_short);
  contentContainer.appendChild(content);
  detailsSection.appendChild(contentContainer);

  /* categories */
  const categoriesContainer = document.createElement('div');
  categoriesContainer.classList.add('book--main--content--info--detail');
  const categoriesLegend = document.createElement('div');
  categoriesLegend.classList.add('book--main--content--info--detail--legend');
  categoriesLegend.textContent = 'Categories';
  categoriesContainer.appendChild(categoriesLegend);
  const categories = document.createElement('div');
  categories.classList.add('book--main--content--info--detail--value');
  bookTopics.forEach(topic =>{
    /* categories link */
    const categoriesLink = document.createElement('a');
    categoriesLink.setAttribute('href', `${CATEGORY_PAGE_NAME}?t=${topic}`);
    categoriesLink.classList.add('link');
    categoriesLink.textContent = topic;
    categories.appendChild(categoriesLink);
    const separator = document.createTextNode(', ');
    categories.appendChild(separator);
  });
  categories.removeChild(categories.lastChild);
  categoriesContainer.appendChild(categories);
  detailsSection.appendChild(categoriesContainer);
    
  /* tags */
  const tagsContainer = document.createElement('div');
  tagsContainer.classList.add('book--main--content--info--detail');
  const tagsLegend = document.createElement('div');
  tagsLegend.classList.add('book--main--content--info--detail--legend');
  tagsLegend.textContent = 'Tags';
  tagsContainer.appendChild(tagsLegend);
  const tags = document.createElement('div');
  tags.classList.add('book--main--content--info--detail--value');
  book.tags.forEach(t =>{
    /* tag link */
    const tagLink = document.createElement('a');
    tagLink.setAttribute('href', '#');
    tagLink.classList.add('link');
    tagLink.textContent = t.name;
    tags.appendChild(tagLink);
    const separator = document.createTextNode(', ');
    tags.appendChild(separator);
  });
  tags.removeChild(tags.lastChild);
  tagsContainer.appendChild(tags);
  detailsSection.appendChild(tagsContainer);

  /* download link */
  const downloadContainer = document.createElement('div');
  downloadContainer.classList.add('book--main--content--info--download');
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', book.url_download);
  downloadLink.classList.add('book--main--content--info--download--link');
  downloadContainer.appendChild(downloadLink);
  const downloadIcon = document.createElement('i');
  downloadIcon.classList.add('fas', 'fa-download','book--main--content--info--download--icon');
  downloadIcon.setAttribute('aria-hidden','true');
  const downloadText = document.createTextNode('Download Book');
  downloadLink.appendChild(downloadIcon);
  downloadLink.appendChild(downloadText);
  detailsSection.appendChild(downloadContainer);

  /* remove loader (workaround for ie11)*/
  const loader = document.querySelector('#loader');
  loader.parentNode.removeChild(loader);

}

function relatedBooks(data,bookTopics){

  /* build related book figure */
  const relatedBooksSection = document.querySelector('#book-related');

  /* title */
  const titleSpan = document.createElement('span');
  titleSpan.classList.add('animated-title');
  titleSpan.textContent = 'Related Books';
  const title = document.createElement('h2');
  title.classList.add('book--related--subtitle');
  title.appendChild(titleSpan);
  relatedBooksSection.appendChild(title);

  /* container */
  const bookRelatedContainer = document.createElement('div');
  bookRelatedContainer.classList.add('book--related--container');
  relatedBooksSection.appendChild(bookRelatedContainer);

  const relatedBooksLog = [];

  for(let i=0;i<N_RELATED_BOOKS;i++){

    /* get the book topic */
    const bookTopic = bookTopics[i%bookTopics.length];

    /* get random book from that topic */
    let randomNumber = Math.floor(Math.random() * data[bookTopic].length);
    let relatedBook = data[bookTopic][randomNumber];

    /* avoid duplicate related books (don't do a while loop to avoid infinite loops in really short topics) */
    for(let i=0;i<100;i++){
      if(!relatedBooksLog.includes(relatedBook.ID)){
        relatedBooksLog.push(relatedBook.ID);
        break;
      }
      else{
        randomNumber = Math.floor(Math.random() * data[bookTopic].length);
        relatedBook = data[bookTopic][randomNumber];
      }
    }

    /* figure link */
    const figureLink = document.createElement('a');
    figureLink.classList.add('book--related--container--link', `book--related-${i}`);
    figureLink.setAttribute('href', `${BOOK_PAGE_NAME}?id=${relatedBook.ID}`);
    bookRelatedContainer.appendChild(figureLink);

    /* figure */
    const fig = document.createElement('figure');
    fig.classList.add('book--related--container--figure');
    figureLink.appendChild(fig);

    /* img */
    const img = document.createElement('img');
    img.classList.add('book--related--container--figure--img');
    img.setAttribute('srcset', `${relatedBook.thumbnail} 130w, ${relatedBook.cover} 320w`);
    img.setAttribute('sizes', '(max-width: 768px) 140px, 330px');
    img.setAttribute('src', relatedBook.cover);
    img.setAttribute('alt', `${relatedBook.title} cover`);
    fig.appendChild(img); 

    /* figcaption */
    const figcaption = document.createElement('figcaption');
    figcaption.classList.add('book--related--container--figure--figcaption');
    figcaption.textContent = relatedBook.title
    fig.appendChild(figcaption);

  }

}