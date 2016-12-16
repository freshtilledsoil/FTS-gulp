/*
  Import project dependencies

  if ( importing via node_modules ) {
    import thing from 'thing'
  } else if ( importing es5 ) {
    import * as thing from 'thing'
  }

  The webpack.ProvidePlugin (gulpfile.js)
  allows us to declare ['jquery', '$']
  as global variables. AKA, jQuery is
  built in.

*/

import * as deviceCheck from './scripts/app_helpers/deviceCheck';
import * as jumpLinkFix from './scripts/app_helpers/jump-link-fix';
import * as a11yTabs from './scripts/tabs.js';
import * as selectize from 'selectize';

const es6 = 'ES6 is working.';
const isJqueryWorking = 'With global access to jQuery.';

console.log(es6);
$('.js-yo').text(isJqueryWorking);
$('.selectize').selectize();
