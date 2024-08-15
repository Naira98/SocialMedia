import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Form = () => {
    const [isLogin, setIsLogin] = useState(true);

  return isLogin ? <LoginForm setIsLogin={setIsLogin}/> : <RegisterForm setIsLogin={setIsLogin} />
   
}

export default Form