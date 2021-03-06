import * as React from 'react';
import { render } from 'react-dom';
import 'regenerator-runtime/runtime';
import App from './containers/App';
import './index.scss';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
  console.log(whyDidYouRender);
  whyDidYouRender(React);
}

render(<App />, document.getElementById('app'));
