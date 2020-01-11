import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { wait } from '@testing-library/react';

it('renders without crashing', async() => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  await wait()
  ReactDOM.unmountComponentAtNode(div);
});
