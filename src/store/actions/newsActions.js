export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST'
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE'

export const FETCH_MORE_NEWS_REQUEST = 'FETCH_MORE_NEWS_REQUEST'
export const FETCH_MORE_NEWS_SUCCESS = 'FETCH_MORE_NEWS_SUCCESS'
export const FETCH_MORE_NEWS_FAILURE = 'FETCH_MORE_NEWS_FAILURE'

export const fetchNewsRequest = () => ({
  type: FETCH_NEWS_REQUEST
})

export const fetchNewsSuccess = (news) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: news
})

export const fetchNewsFailure = (error) => ({
  type: FETCH_NEWS_FAILURE,
  payload: error
})

export const fetchMoreNewsRequest = () => ({
  type: FETCH_MORE_NEWS_REQUEST
})

export const fetchMoreNewsSuccess = (news) => ({
  type: FETCH_MORE_NEWS_SUCCESS,
  payload: news
})

export const fetchMoreNewsFailure = (error) => ({
  type: FETCH_MORE_NEWS_FAILURE,
  payload: error
})
