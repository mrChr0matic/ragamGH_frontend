import { useEffect, useState } from 'react';
import './styles.scss'
import { Link } from 'react-router-dom';

export default function Login(){

    const [logged,setLogged]=useState(false);

    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");

        if(codeParams && localStorage.getItem("accessToken")===null){
            (async () => {
                await fetch(`https://ragamgh-backend.onrender.com/getAccessToken/?code=${codeParams}`,{
                    method:"GET"
                }).then((res)=>{
                    return res.json();
                }).then((data)=>{
                    console.log(data);
                    if(data.access_token){
                        localStorage.setItem("accessToken",data.access_token);
                        setLogged(true);
                        console.log(logged);
                    }
                })
              })();
        }
    },[])

    const ghLogin=()=>{
      window.location.assign(`https://github.com/login/oauth/authorize?client_id=`+import.meta.env.VITE_REACT_APP_CLIENT_ID);
    }

    const ghLogout=()=>{
        localStorage.removeItem("accessToken");
        setLogged(false);
    }
    return(
        <div className='login'>
            {logged && <Link style={{ position: 'absolute',  width:'100%'}} to='/home'><button className='home-button'>Home</button></Link>}
            <h1 className='heading'>GH Ragam</h1>
            <div className='box'>
                <h1>Welcome! This website was created as part of the Ragam Tech Team inductions</h1>
                <button className='button-3' onClick={ghLogin}>Login</button>
                <button className='button-3' onClick={ghLogout}>Logout</button>
            </div>
        </div>
    );
}