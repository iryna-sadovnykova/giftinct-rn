import React from 'react';

if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    collapseGroups: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
  });

  require('./src/wdyr/registerComponents').registerWdyrComponents();
}
