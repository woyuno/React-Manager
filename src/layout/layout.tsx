import api from '@/api/api'
import Menu from '@/components/Menu/Menu'
import NavFooter from '@/components/NavFooter/NavFooter'
import NavHeader from '@/components/NavHeader/NavHeader'
import { userBearStore } from '@/store/store'
import { Layout } from 'antd'
import React, { useEffect } from 'react'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
const { Content, Sider } = Layout

const App: React.FC = () => {
  const updateUserInfo = userBearStore(state => state.updateUserInfo)

  useEffect(() => {
    getUserInof()
  }, [])

  const getUserInof = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }
  return (
    <Layout>
      <Sider>
        <Menu />
      </Sider>
      <Layout>
        <NavHeader />
        <Content className='content' style={{ height: '90vh', padding: '20px', overflowY: 'auto' }}>
          <div className='wrapper'>
            <Outlet />
          </div>
          <NavFooter />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
