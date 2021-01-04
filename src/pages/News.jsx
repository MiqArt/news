import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { SEARCH_LIST } from '../store/actions';
import NewsList from '../components/NewsList';
import NewsForm from '../components/NewsForm';
import '../styles/news.scss';

const News = () => {
  let { news, currentUser, filterForSearch, filteredNews } = useSelector((state) => {
    return { news: state.news, currentUser: state.currentUser, filterForSearch: state.filterForSearch, filteredNews: state.filteredNews }
  }, isEqual);
  const dispatch = useDispatch();
  
  const onHandleChange = (e) => {
    const { value } = e.target;
    if(value) {
      dispatch({ type: SEARCH_LIST, text: value, filterForSearch: true });
    }else {
      dispatch({ type: SEARCH_LIST, text: "", filterForSearch: false });
    }
  }

  return (
    <div className="news container">
      <div className="news__search fullWidth">
        <input placeholder="Поиск" onChange={onHandleChange} className="news__search__input" type="text" name="search"/>
        <SearchIcon className="news__search__icon"/>
      </div>
      {currentUser.role === "user" && <NewsForm user={currentUser.login} />}
      <NewsList currentUser={currentUser} allNews={news} news={filterForSearch ? filteredNews : news} />
    </div>
  );
};

export default News;
