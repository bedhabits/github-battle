import React from 'react';
import ReactDom from 'react-dom';

import './index.css';

// Component 
// State
// Lifecycle
// UI


class App extends React.Component {
    render() {
        return ( 
            <div>
                Hello Yooo!
            </div>
        )
    }
};

const root = document.getElementById('app');
ReactDom.render( 
    <App />, root
)