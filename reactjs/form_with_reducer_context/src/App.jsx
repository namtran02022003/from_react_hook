import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AppContext from './contexts/AppContext'
import FormSignUp from './components/form/FormSignUp'
import ListUsers from './components/tables/ListUsers'

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormSignUp />}></Route>
          <Route path="/list_user" element={<ListUsers />}></Route>
          <Route path="/edit_user/:id" element={<FormSignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext>
  )
}

export default App
