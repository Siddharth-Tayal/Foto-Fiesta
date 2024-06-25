import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser, loadUser } from "./redux/actions/user.action";
import HomePage from "./pages/HomePage";
import MyDetailNav from "./components/MyDetailNav";
import MyProfile from "./pages/MyProfile";
import CreatePost from "./pages/CreatePost";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import UpdateProfile from "./pages/UpdateProfile";
import AnyUser from "./pages/AnyUser";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

function App() {
  const { isAuthenticated } = useSelector(state => state.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])
  return (
    <BrowserRouter>
      {
        isAuthenticated && <MyDetailNav />
      }
      <Routes>
        <Route exact path='/' element={isAuthenticated ? <HomePage /> : <Login />} />
        <Route exact path='/account' element={isAuthenticated ? <MyProfile /> : <Login />} />
        <Route exact path='/newpost' element={isAuthenticated ? <CreatePost /> : <Login />} />
        <Route exact path='/password/update' element={isAuthenticated ? <UpdatePassword /> : <Login />} />
        <Route exact path='/profile/update' element={isAuthenticated ? <UpdateProfile /> : <Login />} />
        <Route path='/user/:id' element={isAuthenticated ? <AnyUser /> : <Login />} />
        <Route path='/search' element={isAuthenticated ? <SearchPage /> : <Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/api/v1/user/resetPassword/:token' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {
        isAuthenticated && <Header />
      }
    </BrowserRouter>
  );
}

export default App;
