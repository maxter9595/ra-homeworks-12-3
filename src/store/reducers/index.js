import { combineReducers } from 'redux'
import newsReducer from './newsReducer'

export default combineReducers({
  news: newsReducer
})
