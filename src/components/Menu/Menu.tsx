import { Menu as IMenu } from '@/types/types'
import * as Icons from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import './Menu.less'
const SideMenu = () => {
  const data: any = useRouteLoaderData('layout')
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  type MenuItem = Required<MenuProps>['items'][number]
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { pathname } = useLocation()
  // 生成每一个菜单项
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }
  function createIcon(name?: string) {
    if (!name) return <></>
    const icon = (Icons as any)[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  // 递归生成菜单
  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[]) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) {
          return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
        }
        treeList.push(
          getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || [], []))
        )
      }
    })
    return treeList
  }
  // 初始化，获取接口菜单列表数据
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList, [])
    setMenuList(treeMenuList)
    setSelectedKeys([pathname])
  }, [])

  // logo点击
  const handleClickLogo = () => {
    navigate('/welcome')
  }

  // 菜单点击
  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }
  // const items = [
  //   {
  //     label: '工作台',
  //     key: '1',
  //     icon: <DesktopOutlined />,
  //   },
  //   {
  //     label: '系统管理',
  //     key: '2',
  //     icon: <SettingOutlined />,
  //     children: [
  //       {
  //         label: '用户管理',
  //         key: '3',
  //         icon: <TeamOutlined />,
  //       },
  //     ],
  //   },
  // ]

  return (
    <div className='sideMenu'>
      <div className='logo' onClick={handleClickLogo}>
        <img src='/imgs/logo.png' alt='' />
        <span>慕慕货运</span>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        theme='dark'
        items={menuList}
        onClick={handleClickMenu}
        selectedKeys={selectedKeys}
      />
    </div>
  )
}
export default SideMenu
