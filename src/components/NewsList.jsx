import React, { useEffect } from 'react';
import firebase from '../Api/firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { SET_LIST, REMOVE_ITEM, EDIT_ITEM } from '../store/actions';
import { ReactComponent as RemoveIcon } from '../icons/remove.svg';
import { ReactComponent as ApproveIcon } from '../icons/approve.svg';
import { ReactComponent as XIcon } from '../icons/x.svg';



const NewsList = ({ allNews, news, currentUser }) => {
  const dispatch = useDispatch();
  
  let availableNews = news;
  if (currentUser.role === "guest") {
    availableNews = news.filter(el => el.approved)
  } else if (currentUser.role === "user") {
    availableNews = news.filter(el => el.author === currentUser.login || el.approved)
  }

  const onHandleEdit = async (id) => {
    try{
      const newsItemRef = firebase.database().ref("news").child(id);
      if(allNews.some(el => el.id === id)) {
        await newsItemRef.update({approved: true});
        dispatch({ type: EDIT_ITEM, id });
        toast.success("Новость успешно одобрена.");
      }else {
        throw new Error("Новость уже удалена")
      }
    }catch (error) {
      toast.error(error.message);
    }
  }

  const onHandleRemove = async (id) => {
    try{
      const newsItemRef = firebase.database().ref("news").child(id);
      if(allNews.some(el => el.id === id)) {
        await newsItemRef.remove();
        dispatch({ type: REMOVE_ITEM, id });
        toast.success("Новость успешно удалена.");
      }else {
        throw new Error("Новость уже удалена")
      }
    }catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const newsRef = firebase.database().ref("news");
    newsRef.on('value', (snapshot) => {
      const news = snapshot.val();
      let newList = [];
      for (let id in news) {
        newList.push({ id, ...news[id] })
      }
      dispatch({ type: SET_LIST, list: newList });
    })
  }, [])

  return (
    <div className={`news__list ${currentUser.role === "user" ? "" : "fullWidth"}`}>
      {
        availableNews.length ?
          availableNews.map((el) => {
            return (
              <div className="news__card" key={el.id}>
                {currentUser.role === "admin" && el.approved &&
                  <button onClick={() => onHandleRemove(el.id)} className="news__card__btn--x btn">
                    <XIcon className="remove-icon" />
                  </button>
                }
                <span className="news__card__title">{el.title}</span>
                <span className="news__card__date">{el.createdAt}</span>
                <span className="news__card__text">{el.text}</span>
                {
                  currentUser.role === "admin" && !el.approved && (
                    <div className="news__card__btn-group">
                      <button onClick={() => onHandleEdit(el.id)} className="news__card__btn--approve btn">
                        <ApproveIcon className="approve-icon" />
                      </button>
                      <button className="news__card__btn--remove btn">
                        <RemoveIcon onClick={() => onHandleRemove(el.id)} className="remove-icon" />
                      </button>
                    </div>
                  )
                }
              </div>
            )
          }) :
          <span className="news__list__emptyText">Пустая лента :(</span>
      }
    </div>
  );
};

export default NewsList;
