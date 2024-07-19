import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./componants/home/home"
import Demo from "./componants/demo/demo"
import Homeheader from "./componants/home/header/homeheader";
import Demoheader from "./componants/demo/demoheader";
import { Blog } from "./context/contex";
import { ToastContainer } from 'react-toastify';
import Profile from "./componants/home/profile/profile";
import Write from "./componants/home/write/write";
import Singelpost from "./componants/common/posts/singelpost";
import Editpost from "./componants/common/posts/editpost";
import Filterpost from "./componants/demo/filterpost";

function App() {

  const {currentuser} = Blog();

  return (
    <>
      {currentuser ? <Homeheader/> : <Demoheader/>}
      <ToastContainer/>
      <Routes>
        {currentuser && <Route path="/" element={<Home/>}/>}
        {!currentuser && <Route path="/demo" element={<Demo/>}/> }
        <Route path="/profile/:userId" element={<Profile/>}/>
        <Route path="/write" element={<Write/>}/>
        <Route path="/post/:postId" element={<Singelpost/>}/>
        <Route path='/editpost/:postId' element={<Editpost/>}/>
        <Route path='/filter/:tag' element={<Filterpost/>}/>
        <Route path="*" element={<Navigate to={!currentuser ? '/demo' : '/home'}/>}/>
      </Routes>
    </>
  )
}

export default App
