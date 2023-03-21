import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./scenes/LoginPage/LoginPage";
import HomePage from "scenes/HomePage/HomePage";
import UserWidget from "scenes/Widgets/UserWidget";
import ProfilePage from "scenes/ProfilePage/ProfilePage";
import Prefetch from "features/auth/Prefetch";
import Layout from "components/Layout";
import Public from "scenes/HomePage/Public";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  // Pass selected mode as an argument to themeSettings so that createTheme can generate a theme with given options
  // After that useMemo is going to memoize and cache results returned from createTheme and only run again when the dependency has altered

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route element={<Prefetch />}>
          <Route path="/home" element={user ? <HomePage /> : <LoginPage />} />
          <Route path="/:id" element={user ? <UserWidget /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile/:id"
            element={user ? <ProfilePage /> : <LoginPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
