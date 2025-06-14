import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import NewsFeed from './components/NewsFeed'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <NewsFeed />
      </div>
    </Provider>
  )
}

export default App
