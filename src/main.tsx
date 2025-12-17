import { App as AntdAPP } from 'antd'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AntdAPP>
    <App />
  </AntdAPP>
  // </StrictMode>
)
