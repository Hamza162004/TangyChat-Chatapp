import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LayoutLoader } from "./components/layout/Loaders";
import { AppProvider } from "./context/SideMenuStates";
import { SocketProvider } from "./context/Socket";

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const Login = lazy(() => import("./pages/Login"));
const Notfound = lazy(() => import("./pages/Notfound"));

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <SocketProvider>
          <Suspense fallback={<LayoutLoader />}>
            <Routes>
              {/* Public route: Login */}
              <Route exact path="/" element={<Login />} />

              {/* Protected routes */}
              <Route 
                exact 
                path="/chat/:chatId" 
                element={<ProtectedRoute><Chat /></ProtectedRoute>} 
              />
              <Route 
                path="/group" 
                element={<ProtectedRoute><Group /></ProtectedRoute>} 
              />
              <Route 
                path="/home" 
                element={<ProtectedRoute><Home /></ProtectedRoute>} 
              />
              {/* 404 Route */}
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Suspense>
        </SocketProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
