import { TOPICS, MAX_RESULTS, ENDPOINT } from './constants';

function getEndpoint(url) {
  const response = fetch(url)
  .then(response => response.json())
  .catch(err => console.log('Error: ', err));
  return response;
}

function makeResults(results){
  return `&results_range=0,${results}`;
}

function makeRequestOptions(options,resultsNumber = MAX_RESULTS){
  return `?any_tags=[${options}]${makeResults(resultsNumber)}`;
};

export function requestAll() {
  return getEndpoint(ENDPOINT.OPEN_LIBRA + makeRequestOptions(Object.values(TOPICS).join()));
}

export function requestTopic(topics,resultsNumber) {
  return getEndpoint(ENDPOINT.OPEN_LIBRA + makeRequestOptions(topics,resultsNumber));
}

export function requestBook(id){
  return getEndpoint(`${ENDPOINT.OPEN_LIBRA}?id=${id}`);
}