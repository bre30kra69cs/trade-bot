import React from 'react';
import {createRoot} from 'react-dom/client';

import {App} from './app/App';

import './styles/reset.css';
import './styles/utils.css';
import './styles/root.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
