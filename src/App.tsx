import { BrowserRouter } from 'react-router-dom'
import Router from './router/router'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
  // return <RouterProvider router={router} />
}

export default App
