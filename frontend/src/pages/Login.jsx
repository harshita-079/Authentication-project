import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../context/userContext';
import axios from 'axios';

function Login() {
  let navigate=useNavigate();
    let {serveUrl}=useContext(dataContext);
    let [email,setEmail]=useState();
    let [password,setPassword]=useState();

    const handleLogin=async (e)=>{
     e.preventDefault();
     try{
      let data=await axios.post(serveUrl+"/api/login",{
        email,password
      },{withCredentials:true})
      console.log(data);
     }catch(e){
      console.log(e.response.data.message);
      alert(e.response.data.message);
     }
    };   
    return (
      <div className='w-full h-[100vh] bg-[black] flex justify-center items-center'>
        <div className='w-[90%] max-w-[400px] h-[500px] bg-[#044513] flex justify-center items-center flex-col gap-2 rounded-sm'>
          <h1 className='text-white font-extrabold text-[20px]'>Login</h1>
          <form 
          className='w-[100%] flex flex-col justify-center items-center gap-[10px]'
          onSubmit={handleLogin}>
          <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={email}
          className='w-[80%] h-[50px] bg-white border-none outline-none rounded-lg px-[10px] py-[5px]'
          onChange={(e)=>setEmail(e.target.value)}/>
          <input 
          type="password" 
          name="password" 
          placeholder="password" 
          value={password}
          className='w-[80%] h-[50px] bg-white border-none outline-none rounded-lg px-[10px] py-[5px]'
          onChange={(e)=>setPassword(e.target.value)}/>
          <button type='submit' className='bg-[#0d7fb8] px-[10px] py-[5px] rounded-lg text-black font-semibold'>Login</button>
          <h4 className='text-white'>want create a new account ? <span 
          className='text-[#0de3eb] underline decoration-1 cursor-pointer'
          onClick={()=>navigate("/signup")}>Signup</span></h4>
          </form>
        </div>
      </div>
    )
}

export default Login
