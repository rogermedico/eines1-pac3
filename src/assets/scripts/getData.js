import { TOPICS, SUGAR } from './constants';
import { requestTopic } from './api';

/* Transform all HTTP cover calls to HTTPS */
function patchCoverHTTPCalls(data){
  Object.values(data).forEach( topic => {
    topic.forEach( book => {
      if((/^http:/).test(book.cover)){
        book.cover = book.cover.replace(/^http:\/\//i, 'https://');
      } 
    })
  })
  return data;
}

/* Remove all books with HTTP cover calls */
function removeCoverHTTPCalls(data){
  Object.entries(data).forEach( ([k,topic]) => {
    data[k] = topic.filter( book => (/^https:/).test(book.cover));
  })

  return data;
}

/* get data and retunr it as a object */
export async function getData(){

  let data = {};
  const requests = {
    topics: [],
    functions:[]
  } 

  /* for each topic get info related to it from session storage or make a call to endpoint */
  for (const topic in TOPICS){
    let books = JSON.parse(sessionStorage.getItem(`${SUGAR}${topic}`));
    
    /* If info found in sessionstorage populate data object */
    if(books) {
      data[topic] = books;
    }
    /* If info not found store call to endpoint */
    else{
      requests.topics.push(topic);
      requests.functions.push(requestTopic(TOPICS[topic]));  
    }
  }

  /* make calls to endpoint from each missing topic concurrently */
  await Promise.all(requests.functions).then( responses => 
    Promise.all(responses)
      .then( response => {
        for(let i in response){
          if(response[i]){
          sessionStorage.setItem(`${SUGAR}${requests.topics[i]}`,JSON.stringify(response[i]));
          data[requests.topics[i]] = response[i];
          }
          else {
            console.log('Fetch failed');
            break;
          }
        }
      })
  );

  /* remove http cover calls to avoid conflicts with netlify */
  data = removeCoverHTTPCalls(data);
  // data = patchCoverHTTPCalls(data);

  return data;

}