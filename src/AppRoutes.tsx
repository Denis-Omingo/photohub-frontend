import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/MyUserProfilePage";
import CreateAlbum from "./pages/CreateAlbum";
import GetMyAlbums from "./pages/GetMyAlbums";
import UpdateMyAlbumPage from "./pages/UpdateMyAlbumPage";
import Layout from "./layouts/layout";
import UpdateMyUserProfilePage from "./pages/UpdateMyUserProfilePage";
import MyUserProfilePage from "./pages/MyUserProfilePage";
import Hero from "./components/Hero";
import UpdateMyPhotoPage from "./pages/UpdateMyPhotoPage";
import GetAlbumByIdPage from "./pages/GetAlbumByIdPage";
import GetAllUserProfile from "./pages/GetAllUserProfile";
import AlbumDetails from "./pages/AlbumDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>
        <Hero/>
    </Layout>} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Layout>
            <HomePage />
            </Layout>
            } />
        <Route path="/my-albums" element={<Layout><GetMyAlbums /></Layout>} />
        <Route path="/user/:userId" element={<Layout><UserPage /></Layout>} />
        <Route path="/user/view-profile" element={<Layout><MyUserProfilePage /></Layout>} />
        <Route path="/all-users/user/:userId" element={<Layout><GetAllUserProfile/></Layout>} />
        <Route path="/user/update-profile" element={<Layout><UpdateMyUserProfilePage /></Layout>} />
        <Route path="/user/create-album" element={<Layout><CreateAlbum /></Layout>} />
        <Route path="/albums/update-album/:albumId" element={<Layout><UpdateMyAlbumPage /></Layout>} />
        <Route path="/albums/:albumId" element={<Layout><GetAlbumByIdPage /></Layout>} />
        <Route path="/albums/view-user-album/:albumId" element={<Layout><AlbumDetails /></Layout>} />
        <Route path="/albums/:albumId/photos/:photoId" element={<Layout><UpdateMyPhotoPage /></Layout>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
