import { BrowserRouter } from 'react-router-dom'
import Router from './router/router'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
  // return <RouterProvider router={router} />
}

export default App
