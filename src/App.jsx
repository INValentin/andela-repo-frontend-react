import Home from './components/home'
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom'

import Layout from './components/Layout'
import Portifolio from './components/Portifolio'
import CreateBlog from './components/CreateBlog'
import Article from './components/Article'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Signup from './components/Signup'
import Contact from './components/Contact'
import AdminContacts from './components/AdminContacts'
import ArticleAdmin from './components/ArticleAdmin'
import About from './components/About'
import UpdateBlog from './components/UpdateBlog'
import Dashboard from './components/Dashboard'
import AuthProvider, { useAuth } from './context/Auth'

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export const AppContent = (props) => {
  const { isAdmin } = useAuth()
  return <Router>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={isAdmin ? <CreateBlog /> : <Blogs />} path='/blog' />
        <Route element={<Portifolio />} path='/portifolio' />
        <Route element={<CreateBlog />} path='/create-blog' />
        <Route element={isAdmin ? <ArticleAdmin /> : <Article />} path='/article' />
        <Route element={isAdmin ? <AdminContacts /> : <Contact />} path='/contact' />
        <Route element={<Login />} path='/login' />
        <Route element={<Signup />} path='/signup' />
        <Route element={<ArticleAdmin />} path='/article_admin' />
        <Route element={<AdminContacts />} path='/admin-contacts' />
        <Route element={<About />} path='/about' />
        <Route element={<UpdateBlog />} path='/update-blog' />
        <Route element={<Dashboard />} path='/dashboard' />
      </Route>
    </Routes>
  </Router>
}

export default App
