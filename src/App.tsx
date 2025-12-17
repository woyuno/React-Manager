import { App as AntdAPP, ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import './App.less'
import router from './router/router'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <AntdAPP>
        <RouterProvider router={router} />
      </AntdAPP>
    </ConfigProvider>
  )
}

export default App
