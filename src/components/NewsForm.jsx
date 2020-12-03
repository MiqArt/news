import React, { useState } from 'react';
import { toast } from 'react-toastify';
import firebase from '../Api/firebase';
import { useDispatch } from 'react-redux';
import { CREATE_ITEM } from '../store/actions';


const NewsForm = ({ user }) => {
  const [data, setData] = useState({ title: "", text: "" });
  const dispatch = useDispatch();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const addNews = async (e) => {
    e.preventDefault();
    if (data.title && data.text) {
      try{
        const newsRef = firebase.database().ref("news");
        let newData = { ...data, author: user, createdAt: new Date().toLocaleDateString('en-GB'), approved: false }
        let res = await newsRef.push(newData);
        dispatch({ type: CREATE_ITEM, newItem: {id: res.key, ...newData} });
        setData({ title: "", text: "" });
        toast.success("Новость успешно добавлена.");
      }catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Пожалуйста, заполните все поля!");
    }
  }

  return (
    <form className="news__form">
      <input placeholder="Название" className="news__form__title" onChange={onHandleChange} value={data.title} type="text" name="title" />
      <textarea placeholder="Текст" className="news__form__text" onChange={onHandleChange} value={data.text} name="text" cols="54" rows="5"></textarea>
      <button onClick={addNews} className="news__form__btn btn">Добавить</button>
    </form>
  );
};

export default NewsForm;
