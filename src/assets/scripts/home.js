/* Common polyfills to support old browsers */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

/* Polyfill to support fetch */
// import 'whatwg-fetch';

import { getData } from './getData';
import { buildHome } from './buildHome';

(async () => {

  /* get data */
  const data = await getData();
  // console.log(data);
  
  /* build page */
  buildHome(data);

})();