import React from 'react';
import ReactDom from 'react-dom';

import './index.css';

import Popular from './components/Popular.js';
import Battle from './components/Battle.js';
// Component 
// State
// Lifecycle
// UI

class App extends React.Component {
    render() {
        return ( 
            <div className = "container" >
                {/* <Popular /> */}
                <Battle />
            </div>
        )
    }
};

const root = document.getElementById('app');
ReactDom.render(<App /> , root);