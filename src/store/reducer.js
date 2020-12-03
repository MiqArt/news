import { createStore, compose } from 'redux';
import { RESET_STATE, SET_LIST, SEARCH_LIST, CREATE_ITEM, REMOVE_ITEM, EDIT_ITEM, SET_USER } from './actions';
import createReducer from './createReducer';

const initialState = {
  news: [],
  registeredUsers: [{login: "admin", password: "1111", role: "admin"}, {login: "user", password: "2222", role: "user"}, {login: "user2", password: "3333", role: "user"}],
  currentUser: {login: "Гость", role: "guest"},
  filterForSearch: false,
  filteredNews: []
}

const reducer = createReducer(initialState, {
  [RESET_STATE]: () => {
    return initialState;
  },
  [SET_LIST]: (state, action) => {
    let newState = [...action.list];
    return {
      ...state,
      news: newState
    };
  },
  [SEARCH_LIST]: (state, action) => {
    let filteredNews = state.news.filter(el => el.title.includes(action.text) || el.text.includes(action.text));
    return {
      ...state,
      filterForSearch: action.filterForSearch,
      filteredNews
    };
  },
  [CREATE_ITEM]: (state, action) => {
    let filteredNews = [...state.filteredNews];
    filteredNews.push(action.newItem);
    return {
      ...state,
      filteredNews: filteredNews
    };
  },
  [REMOVE_ITEM]: (state, action) => {
    let newState = state.filteredNews.filter(el => el.id !== action.id)
    return {
      ...state,
      filteredNews: newState
    };
  },
  [EDIT_ITEM]: (state, action) => {
    let newState = [...state.filteredNews].map(el => {
      if(el.id === action.id) {
        return {...el, approved: true}
      }else {
        return el
      }
    });
    return {
      ...state,
      filteredNews: newState
    };
  },
  [SET_USER]: (state, action) => {
    localStorage.setItem("newsUser", JSON.stringify(action.user))
    return {
      ...state,
      currentUser: action.user
    };
  }
});

const store = createStore(reducer, compose());
export default store;