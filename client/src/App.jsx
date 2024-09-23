
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React , {Suspense, lazy} from 'react'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { LayoutLoader } from './components/layout/Loaders'
import { AppProvider } from './context/SideMenuStates'


const Home = lazy(()=> import("./pages/Home"))
const Chat = lazy(()=> import("./pages/Chat"))
const Group = lazy(()=> import("./pages/Group"))
const Login = lazy(()=> import("./pages/Login"))
const Notfound = lazy(()=> import("./pages/Notfound"))

let user = true

function App() {

  return (
    <>
      <BrowserRouter>
      <AppProvider>
        <Suspense fallback={<LayoutLoader/>}>
        <Routes>
          <Route element={<ProtectedRoute user={user}/>}>
            <Route exact path='/' element={<Home/>}/>   
            <Route exact path='/chat/:chatId' element={<Chat/>}/>   
            <Route path='/group' element={<Group/>}/>   
          </Route>
          <Route exact path='/login' element={<ProtectedRoute user={!user} redirect='/'><Login/></ProtectedRoute>}/>


          <Route path='*' element={<Notfound/>}/>
        </Routes>
        </Suspense>
        </AppProvider>
      </BrowserRouter>
    </>
  )
}

export default App
