import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import UserPage from "./pages/UserPage";


const AppRoutes = ()=>{
    return(
        <Routes>
           <Route path="/" element={<Layout>
                <HomePage/>
           </Layout>}/> 
           <Route path="/user/update-profile" element={<Layout><UserProfilePage/></Layout>}/>
           <Route path="/user" element={
            <Layout>
                <UserPage/>
            </Layout>
           }/>
           <Route path="/album" element={<span>Album PAGE: show all photos in the album</span>}/> 
           <Route path="/photo" element={<span>Photo PAGE: to edit photo title</span>}/>
           <Route path="*" element={<Navigate to="/"/>}/>  
        </Routes>
    )
};

export default AppRoutes;