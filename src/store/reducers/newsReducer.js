import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  FETCH_MORE_NEWS_REQUEST,
  FETCH_MORE_NEWS_SUCCESS,
  FETCH_MORE_NEWS_FAILURE
} from '../actions/newsActions'

const initialState = {
  items: [],
  loading: false,
  loadingMore: false,
  error: null,
  hasMore: true
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        hasMore: action.payload.length >= 5
      }
      
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      
    case FETCH_MORE_NEWS_REQUEST:
      return {
        ...state,
        loadingMore: true,
        error: null
      }
      
    case FETCH_MORE_NEWS_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        items: [...state.items, ...action.payload],
        hasMore: action.payload.length >= 5
      }
      
    case FETCH_MORE_NEWS_FAILURE:
      return {
        ...state,
        loadingMore: false,
        error: action.payload
      }
      
    default:
      return state
  }
}

export default newsReducer
