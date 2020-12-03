import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SET_USER } from '../store/actions';
import '../styles/login.scss';

const Login = ({ text }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({login: "", password: ""});
  
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser, isEqual);
  const registeredUsers = useSelector((state) => state.registeredUsers, isEqual);
  
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    setUser({login: "", password: ""})
  }

  const login = (e) => {
    e.preventDefault();
    const { login, password } = user;
    if(login && password) {
      let findedUser = registeredUsers.find(el => el.login.toLowerCase() === user.login.toLowerCase() && el.password === user.password)
      if(findedUser) {
        dispatch({ type: SET_USER, user: {login: login, role: findedUser.role} });
        toast.success("Вход в учетную запись успешно выполнен.");
        closeModal();
      }else {
        toast.error("Неверный логин или пароль!");
      }
    }else {
      toast.error("Пожалуйста, заполните все поля!")
    }
  }

  const logout = () => {
    dispatch({ type: SET_USER, user: {login: "Гость", role: "guest"} });
    localStorage.removeItem("newsUser");
    toast("Выход из учетной записи успешно выполнен")
  }

  return (
    <div className={`${modalIsOpen ? "modal modal--open" : "modal modal--close"}`}>
      <div onClick={closeModal} className="modal__outside"></div>
      <form className="modal__body">
        <input className="modal__body__input" onChange={onHandleChange} value={user.login} placeholder="Login" type="text" name="login"/>
        <input className="modal__body__input" onChange={onHandleChange} value={user.password} placeholder="Password" type="password" name="password" autoComplete="on"/>
        <button onClick={login} className="modal__body__btn btn">Вход</button>
      </form>
      <button className="modal__btn btn" onClick={currentUser.role === "guest" ? openModal : logout}>{currentUser.role === "guest" ? "Вход" : "Выход"}</button>
    </div>
  );
};

export default Login;
