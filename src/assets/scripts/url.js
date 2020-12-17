import { LOCATIONS } from './constants';

function extractPathName(){
  const path = window.location.pathname.split('/');
  const actualPage = path[path.length-1];
  return actualPage;
}

export function getHomeUrl(){
  const path = window.location.pathname;
  const newPath = `${path.substring(0,path.lastIndexOf('/'))}/${LOCATIONS.home[0]}`;
  return newPath;
}

export function iAmInHome(){
  if(LOCATIONS.home.includes(extractPathName())) return true;
  else return false;
}

export function iAmInCategory(){
  if(LOCATIONS.category.includes(extractPathName())) return true;
  else return false; 
}

export function iAmInBook(){
  if(LOCATIONS.book.includes(extractPathName())) return true;
  else return false;
}

export function searchToJSON(){
  const search = location.search.substring(1);
  if(search) return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  else return {};
}