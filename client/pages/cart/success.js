import Navbar from '@/components/common/navbar'
import NavbarMb from '@/components/common/navbar-mb'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Head from 'next/head'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/user/use-auth'

export default function Test() {
  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
  }, [])
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }
  return (
    <>
      <Head>
        <title>付款成功</title>
      </Head>
      <Navbar menuMbToggle={menuMbToggle} />
      <div className="container position-relative">
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          <NavbarMb />
        </div>
        <main style={{minHeight: '96svh'}}>
          <div className="d-flex align-items-center flex-column" style={{paddingTop: '16%'}}>
            <h2 className="mb-2">付款成功</h2>
          <IoIosCheckmarkCircleOutline size={260} color="#18a1ff"/>
          <Link
            href="../user/user-order"
            className="b-btn b-btn-primary px-4 py-2"
          >
            <span className="fs-5 pe-1">查看訂單</span>
          </Link>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
