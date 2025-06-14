import { call, put, takeEvery, select, delay } from 'redux-saga/effects'
import axios from 'axios'
import {
  FETCH_NEWS_REQUEST,
  FETCH_MORE_NEWS_REQUEST,
  fetchNewsSuccess,
  fetchNewsFailure,
  fetchMoreNewsSuccess,
  fetchMoreNewsFailure
} from '../actions/newsActions'

const API_URL = 'http://localhost:7071/api/news'

function* fetchNews() {
  try {
    const response = yield call(axios.get, API_URL)
    yield put(fetchNewsSuccess(response.data))
  } catch (error) {
    yield put(fetchNewsFailure(error.message))
    yield delay(3000)
    yield put({ type: FETCH_NEWS_REQUEST })
  }
}

function* fetchMoreNews() {
  try {
    const state = yield select()
    const lastId = state.news.items.length > 0 
      ? state.news.items[state.news.items.length - 1].id 
      : null
    
    const url = lastId ? `${API_URL}?lastSeenId=${lastId}` : API_URL
    
    const response = yield call(axios.get, url)
    yield put(fetchMoreNewsSuccess(response.data))
  } catch (error) {
    yield put(fetchMoreNewsFailure(error.message))
    yield delay(3000)
    yield put({ type: FETCH_MORE_NEWS_REQUEST })
  }
}

export default function* newsSaga() {
  yield takeEvery(FETCH_NEWS_REQUEST, fetchNews)
  yield takeEvery(FETCH_MORE_NEWS_REQUEST, fetchMoreNews)
}
