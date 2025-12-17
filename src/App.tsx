import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import './App.less'
import Router from './router/router'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  )
  // return <RouterProvider router={router} />
}

export default App
