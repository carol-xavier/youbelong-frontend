import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';

Render();
function Render(){
    ReactDOM.render(
          <App />,
        document.querySelector('.root')
      );
}

export default Render;