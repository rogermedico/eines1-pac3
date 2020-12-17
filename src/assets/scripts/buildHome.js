import { buildFooter } from './buildFooter';
import { HOME_BOOKS_NUMBER, CATEGORY_PAGE_NAME, BOOK_PAGE_NAME } from './constants';

export function buildHome(data){

	for (const topic in data){

		/* sublist of books to show in home */
		const books = data[topic].slice(0,HOME_BOOKS_NUMBER);

		/* Section contaienr */
		const sectionContainer = document.createElement('div');
		sectionContainer.classList.add('home--main--content--section');
		document.querySelector('#home-content').appendChild(sectionContainer);

		/* Section title */
		const h3 = document.createElement('h3');
		h3.classList.add('home--main--content--section--subtitle-2');
		sectionContainer.appendChild(h3);

		/* Title link */
		const titleLink = document.createElement('a');
		titleLink.textContent = topic;
		titleLink.classList.add('link', 'animated-title');
		titleLink.setAttribute('href', `${CATEGORY_PAGE_NAME}?t=${topic}`);
		h3.appendChild(titleLink);

		/* Books container */
		const booksSection = document.createElement('div');
		booksSection.classList.add('home--main--content--section--books');
		sectionContainer.appendChild(booksSection);
		
		for(const book in books){

			/* figure link */
			const figureLink = document.createElement('a');
			figureLink.classList.add('home--main--content--section--books--link',`home--main--content--section--books--figure-${book}`);
			figureLink.setAttribute('href', `${BOOK_PAGE_NAME}?id=${books[book].ID}`);
			booksSection.appendChild(figureLink);

			/* figure */
			const fig = document.createElement('figure');
			fig.classList.add('home--main--content--section--books--figure');
			figureLink.appendChild(fig);

			/* img */
			const img = document.createElement('img');
			img.classList.add('home--main--content--section--books--figure--img');
      img.setAttribute('srcset', `${books[book].thumbnail} 130w, ${books[book].cover} 320w`);
      img.setAttribute('sizes', '(max-width: 768px) 140px, 330px');
      img.setAttribute('src', books[book].cover);
			img.setAttribute('alt', `${books[book].title} cover`);
			fig.appendChild(img); 

			/* figcaption */
			const figcaption = document.createElement('figcaption');
      figcaption.classList.add('home--main--content--section--books--figure--figcaption');
      figcaption.textContent = books[book].title;
			fig.appendChild(figcaption);

		}

	}

		/* build footer links */
		buildFooter(data);

		/* remove loader (workaround for ie11)*/
		const loader = document.querySelector('#loader');
		loader.parentNode.removeChild(loader);

}