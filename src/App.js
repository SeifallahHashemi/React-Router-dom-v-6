import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.js";
import Redirect from "./pages/Redirect.js";
import "./App.css";
import LogInOut from "./components/LoginLogout/LogInOut";
import UserChangePassword from "./pages/UserChangePassword.js";
import { useContext } from "react";
import AuthContext from "./store/auth-context.js";
import NotFound from "./pages/NotFound.js";
import Profile from './pages/Profile';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<LogInOut />} />
        <Route path="/userProfile">
          {authCtx.isLoggedIn && <Route index element={<UserChangePassword />}/>}
          {!authCtx.isLoggedIn && <Route index element={<Navigate to="/" replace={true} />}/>}
        </Route>
        <Route path="/profile">
          {authCtx.isLoggedIn && <Route index element={<Profile />}/>}
          {!authCtx.isLoggedIn && <Route index element={<Navigate to="/" replace={true} />}/>}
        </Route>
        {/* <Route path="/profile" element={<Profile />}/> */}
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Layout>
  );
}

export default App;
