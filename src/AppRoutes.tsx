import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout";

const AppRoutes = ()=>{
    return(
        <Routes>
           <Route path="/" element={<Layout>HOME PAGE=start from 1.00.00 and MobileNav Component</Layout>}/> 
           <Route path="/user-profile" element={<span>Edit personal profile</span>}/> 
           <Route path="/user" element={<span>USER PAGE: Show users's information</span>}/>
           <Route path="/album" element={<span>Album PAGE: show all photos in the album</span>}/> 
           <Route path="/photo" element={<span>Photo PAGE: to edit photo title</span>}/>
           <Route path="*" element={<Navigate to="/"/>}/>  
        </Routes>
    )
};

export default AppRoutes;