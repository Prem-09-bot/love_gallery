import { useState } from "react";
import axios from "axios";
import "./index.css";

function Login(){
  const [data,setData] = useState({email:"",password:""});

  const login = async ()=>{
    const res = await axios.post("http://localhost:5000/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    window.location="/gallery";
  };

  return(
        <div className="Container">
            <div className="card">
      <h2>Welcome❤️</h2>
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button onClick={login}>Enter🎉</button>
    </div>
    </div>
  );
}

export default Login;