import { TOPICS, N_ELEMENTS_PAGE, CATEGORY_PAGE_NAME, BOOK_PAGE_NAME, LOCATIONS } from './constants';
import { buildFooter } from './buildFooter';
import { getHomeUrl, searchToJSON } from './url';

export function buildCategory(data){

  /* Get search */
  const search = searchToJSON();

  /* check if category is correct */
  if(!Object.keys(TOPICS).includes(search.t)){ 
    window.location.href = getHomeUrl();
  }
  else{

    /* build pagination */
    const actualPage = pagination(data,search);

    /* build content section (books) */
    content(data,search,actualPage);
    
    /* build footer links */
		buildFooter(data);
  }

}

function content(data,search,actualPage){

  /* set title */
  const titleSpan = document.createElement('span');
  titleSpan.classList.add('animated-title');
  titleSpan.textContent = search.t;
  const title = document.querySelector('#category-title');
  title.classList.add('category--main--subtitle');
  title.appendChild(titleSpan);

  /* set tags */
  const tags = TOPICS[search.t].split(',');
  tags.forEach(t =>{
    /* tag link */
    const tagLink = document.createElement('a');
    tagLink.setAttribute('href', '#');
    tagLink.classList.add('category--tags--link');
    tagLink.textContent = t;
    document.querySelector('#category-tags').appendChild(tagLink);

  });

  /* make books section */
  const content = document.querySelector('#category-content');
  const booksSection = document.createElement('div');
  booksSection.classList.add('category--content--books');
  content.insertBefore(booksSection,content.childNodes[0]);

  /* add books to books section acording to actual page*/
  const firstBook = ((actualPage-1)*N_ELEMENTS_PAGE);
  const books = (data[search.t]).splice(firstBook,N_ELEMENTS_PAGE);

  for(const book in books){

    /* figure link */
    const figureLink = document.createElement('a');
    figureLink.classList.add('category--content--books--link');
    figureLink.setAttribute('href', `${BOOK_PAGE_NAME}?id=${books[book].ID}`);
    booksSection.appendChild(figureLink);

    /* figure */
    const fig = document.createElement('figure');
    fig.classList.add('category--content--books--figure');
    figureLink.appendChild(fig);

    /* img */
    const img = document.createElement('img');
    img.classList.add('category--content--books--figure--img');
    img.setAttribute('srcset', `${books[book].thumbnail} 130w, ${books[book].cover} 320w`);
    img.setAttribute('sizes', '(max-width: 768px) 140px, 330px');
    img.setAttribute('src', books[book].cover);
    img.setAttribute('alt', `${books[book].title} cover`);
    fig.appendChild(img); 

    /* figcaption */
    const figcaption = document.createElement('figcaption');
    figcaption.classList.add('category--content--books--figure--figcaption');
    figcaption.textContent = books[book].title
    fig.appendChild(figcaption);

  }
    
		/* remove loader (workaround for ie11)*/
		const loader = document.querySelector('#loader');
		loader.parentNode.removeChild(loader);

}

function pagination(data,search){

  /* number of pages acording to number of books in topic and number of elements per page defined in constants */
  const nPages = Math.trunc(data[search.t].length/N_ELEMENTS_PAGE)+1;

  /* if only one page pagination is not needed */
  if(nPages == 1) return;

  /* determine the page to show */
  let actualPage = 1;
  search.p = parseInt(search.p);
  if(search.p && Number.isInteger(search.p) && (search.p > 0) && (search.p <= nPages)) actualPage = search.p;
  
  /* make pagination section */
  const content = document.querySelector('#category-content');
  const pagSection = document.createElement('div');
  pagSection.classList.add('category--content--pagination');
  content.appendChild(pagSection);

  for(let i=1;i<=nPages;i++){

    /* make page link */
    const pageLink = document.createElement('a');
    pageLink.setAttribute('href', `${CATEGORY_PAGE_NAME}?t=${search.t}&p=${i}`);
    pageLink.classList.add('category--content--pagination--link','link');
    if(i==actualPage) pageLink.classList.add('category--content--pagination--link-active');
    pageLink.textContent = i;
    pagSection.appendChild(pageLink);
  }

  return actualPage;

}