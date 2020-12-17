import { CATEGORY_PAGE_NAME } from './constants';

export function buildFooter(data){
    for (const topic in data){

        /* footer links container */
        const footerLinkContainer = document.querySelector('#footer-links');
        const footerLinkDiv = document.createElement('div');
        footerLinkDiv.classList.add('footer--right--link-container');
        footerLinkContainer.appendChild(footerLinkDiv);

        /* footer link */
        const footerLink = document.createElement('a');
		footerLink.textContent = topic;
		footerLink.classList.add('link');
		footerLink.setAttribute('href', `${CATEGORY_PAGE_NAME}?t=${topic}`);
        footerLinkDiv.appendChild(footerLink);

    }
}