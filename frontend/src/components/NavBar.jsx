import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import AuthForm from "./Auth-form";
import RegisterForm from "./Register-form";


function NavBar() {
  



  return (



<>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
   </BrowserRouter>




<Link to="/login">Войти</Link>;
<Link to="/register">Зарегистрироваться</Link>;

</>



   





  );



}
export default NavBar



