import { BrowserRouter } from 'react-router-dom'
import Router from './router/router'
import { ConfigProvider } from 'antd'
import './App.css'

function App() {
  return (
    <ConfigProvider theme={{token:{
      colorPrimary:'#00b96b'
    }}}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  )
  // return <RouterProvider router={router} />
}

export default App
