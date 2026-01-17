import './App.css'
import Left from './home/left/left'
import Right from './home/right/right'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from './context/useAuth'
import { Toaster } from 'react-hot-toast'

function App() {

  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen w-screen overflow-hidden bg-slate-900 text-white">
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />   
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
