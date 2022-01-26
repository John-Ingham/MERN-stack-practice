import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import App from './App'
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)))
ReactDOM.render(
  <Provider store={store}>
    {/*  ^^ Assigns the new store to the variable store above */}
    <App />
  </Provider>,
  document.getElementById('root'),
)
