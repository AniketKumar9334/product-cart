
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userActions';
import {ProtectedRoute} from "protected-route-react"


function App() {
  const { user, message, error, loading, isAuthentication } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (message) {
      toast.success(message)
    }

  }, [error, message, isAuthentication])


  return (
    <>
      <BrowserRouter>

        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<ProtectedRoute redirect={'/profile'} isAuthenticated={!isAuthentication}>
            <Login loading={loading} />
          </ProtectedRoute>
          } />
          <Route path="/register" element={<ProtectedRoute  redirect={'/profile'}  isAuthenticated={!isAuthentication} >
            <Register loading={loading} />
          </ProtectedRoute>} />
          <Route path="/:id" element={<ProtectedRoute  isAuthenticated={isAuthentication}>
            <ProductDetails />
          </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthentication}>
            <Profile user={user} />
            </ProtectedRoute>
            }
           />
        </Routes>
      </BrowserRouter>
        <Toaster />
    </>
  )
}

export default App
