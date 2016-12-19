/*
  Import project dependencies

  if ( importing via node_modules ) {
    import thing from 'thing'
  }
  else if ( importing es5 ) {
    import * as thing from 'thing'
  }

  The webpack.ProvidePlugin (webpack.config.js)
  allows us to declare ['jquery', '$'] as global variables.
  Essentially, jQuery is built in.

*/

// Common helper scripts for projects
import * as deviceCheck from './scripts/app_helpers/deviceCheck';
import * as jumpLinkFix from './scripts/app_helpers/jump-link-fix';


//
// From here down are test scripts for testing this task runner.
// Delete everything from here down to customize your own project.
//
import * as a11yTabs from './scripts/a11y.tabs.js';
import * as selectize from 'selectize';

const es6 = 'ES6 is working.';
const isJqueryWorking = 'With global access to jQuery.';

console.log(es6);
$('.js-yo').text(isJqueryWorking);
$('.selectize').selectize();
