import React, { useContext, useRef, useState } from 'react'
import Profile from '../assets/Profile.png'
import axios from 'axios';
import {dataContext} from '../context/userContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  let {serveUrl} =useContext(dataContext);

  let [firstName,setFirstName]=useState("");
  let [lastName,setLastName]=useState("");
  let [userName,setUserName]=useState("");
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let navigate=useNavigate();
  let file=useRef(null);

  let [frontendImage,setFrontendImage]=useState(Profile);
  let [backendImage,setBackendImage]=useState(null);
  const handleFile=(e)=>{
    let file=e.target.files[0];
    console.log(file);
    setBackendImage(file);
    //imaeg show in frontend using url
    let image=URL.createObjectURL(file)
    setFrontendImage(image);
    console.log(image);
    

  }
  const handleSignUp=async(e)=>{
    e.preventDefault();

    try {
      let formdata=new FormData()
      formdata.append("firstName",firstName)
      formdata.append("lastName",lastName)
      formdata.append("userName",userName)
      formdata.append("email",email)
      formdata.append("password",password)
      if(backendImage){
        formdata.append("profileImage",backendImage)
      }
      let data= await axios.post(serveUrl+"/api/signup",formdata,
        {withCredentials:true,
          headers:{"Content-Type":"multipart/form-data"}
      });
      console.log(data);
    } catch (e) {
      console.log(e.response.data.message);
      alert(e.response.data.message);
    }
  }
  
  return (
    <div className='w-full h-[100vh] bg-[black] flex justify-center items-center'>
      <div className='w-[90%] max-w-[400px] h-[500px] bg-[#044513] flex justify-center items-center flex-col gap-2 rounded-sm'>
        <h1 className='text-white font-extrabold text-[20px]'>SignUp</h1>
        <form 
        className='w-[100%] flex flex-col justify-center items-center gap-[10px]'
        onSubmit={handleSignUp}>
          <input type='file' hidden ref={file} onChange={handleFile}></input>
        <div className='h-[100px] w-[100px] rounded-full bg-white overflow-hidden relative'>
          <img src={frontendImage} alt='' className='w-[100%] h-[100%]'/> 
          <div className='h-[100%] w-[100%] absolute bg-black opacity-0 hover:opacity-50 top-0 cursor-pointer text-white flex justify-center items-center font-semibold text-lg ' onClick={()=>{file.current.click()}}>+</div>
        </div>
        <div className='w-[80%] h-[50px] flex justify-center items-center gap-2 '>
          <input 
          type="text" 
          name="firstName" 
          placeholder="FirstName" 
          className='w-[50%] h-[100%] bg-white border-none outline-none rounded-lg px-[10px] py-[5px]'
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}/>
          <input 
          type="text" 
          name="lastName" 
          placeholder="LastName" 
          value={lastName}
          className='w-[50%] h-[100%] bg-white border-none outline-none rounded-lg px-[10px] py-[5px]'
          onChange={(e)=>setLastName(e.target.value)}/>
        </div>
        <input 
        type="text" 
        name="userName" 
        placeholder="Username" 
        value={userName}
        className='w-[80%] h-[50px] bg-white border-none outline-none rounded-lg px-[10px] py-[5px]'
        onChange={(e)=>setUserName(e.target.value)}/>
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
        <button 
        type='submit' 
        className='bg-[#0d7fb8] px-[10px] py-[5px] rounded-lg text-black font-semibold'
        >
         SignUp</button>
        <p className='text-white'>Already have an Account? <span className='text-[#0de3eb] underline decoration-1 cursor-pointer' onClick={()=>navigate("/login")}>Login</span></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
