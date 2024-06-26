import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import NavbarMb from '@/components/common/navbar-mb'
import Footer from '@/components/common/footer'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { FiMinus } from 'react-icons/fi'

//hook
import { useCart } from '@/hooks/use-cart'

import Twzipcode from '@/components/cart/twzipcode'
import { userAgent } from 'next/server'

export default function Test() {
  //hook
  const {
    instrumentData,
    lessonData,
    calcInstrumentItems,
    calcInstrumentPrice,
    calcInstrumentDiscount,
    handleInstrumentSelector,
    calcLessonItems,
    calcLessonPrice,
    calcLessonDiscount,
    handleLessonSelector,
    calcTotalDiscount,
    calcTotalPrice,
  } = useCart()

  const [selected, setSeleted] = useState('credit-card')

  console.log(selected)

  //form
  const handleSubmit = (e) => {
    //取消表單預設行為，因為要使用js做進一步檢查
    e.preventDefault()
    console.log(e.target)
    const formData = new FormData(e.target)
    //取得欄位的的名稱
    console.log(FormData)
    console.log(e.target)
  }

  //User-Info Data

  const [name, setName] = useState(() => {
    const saveItem = localStorage.getItem('UserInfo')
    const parseItem = JSON.parse(saveItem)[0].Name
    return parseItem || ''
  })

  const [phone, setPhone] = useState(() => {
    const saveItem = localStorage.getItem('UserInfo')
    const parseItem = JSON.parse(saveItem)[0].Phone
    return parseItem || ''
  })
  const [email, setEmail] = useState(() => {
    const saveItem = localStorage.getItem('UserInfo')
    const parseItem = JSON.parse(saveItem)[0].Email
    return parseItem || ''
  })
  const [address, setAddress] = useState(() => {
    const saveItem = localStorage.getItem('UserInfo')
    const parseItem = JSON.parse(saveItem)[0].Address
    return parseItem || ''
  })

  let UserInfo = JSON.stringify([
    { Name: name, Phone: phone, Email: email, Address: address },
  ])

  let UserInfoData = JSON.parse(UserInfo)

  useEffect(() => {
    localStorage.setItem('UserInfo', UserInfo)
  }, [UserInfo])

  const country = localStorage.getItem('Country') || ''
  const township = localStorage.getItem('Township') || ''
  const postcode = localStorage.getItem('Postcode') || ''

  const [data, setData] = useState({
    country: country,
    township: township,
    postcode: postcode,
  })

  // ----------------------手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

  // ----------------------假資料  ----------------------

  return (
    <>
      <Head>
        <title>填寫訂單資料</title>
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
        <>
          <div className="cart">
            <h2>購物車</h2>
          </div>
          <div className="d-flex justify-content-between align-items-start cart-process align-items-start">
            <div
              className="d-flex align-items-center ballbox"
              style={{ gap: 10 }}
            >
              <div className="ball d-flex align-items-center justify-content-center inactive">
                1
              </div>
              <div className="h5 cart-process-text">修改訂單</div>
            </div>
            <div
              className="d-flex align-items-center ballbox"
              style={{ gap: 10 }}
            >
              <div className="ball d-flex align-items-center justify-content-center active">
                2
              </div>
              <div className="h5 cart-process-text">
                填寫收件資料（無樂器免填）
              </div>
            </div>
            <div
              className="d-flex align-items-center ballbox"
              style={{ gap: 10 }}
            >
              <div className="ball d-flex align-items-center justify-content-center inactive">
                3
              </div>
              <div className="h5 cart-process-text">訂單確認</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="w-100 p-0 cart-main">
              {instrumentData && instrumentData.length > 0 ? (
                <div className="consumer-info">
                  <div className="cart-title">寄送資訊</div>
                  <div className="consumer-info-group">
                    <div className="row g-3 align-items-center">
                      <label
                        htmlFor="name"
                        className="col-form-label col-sm-2 h6"
                      >
                        收件人姓名
                      </label>
                      <div className="col-sm-3 col-6 consumer-info-input">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={UserInfoData[0].Name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <label
                        htmlFor="phone"
                        className="col-form-label col-sm-2 h6"
                      >
                        電話號碼
                      </label>
                      <div className="col-sm-3 col-6 consumer-info-input">
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          value={UserInfoData[0].Phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <label
                        htmlFor="email"
                        className="col-form-label col-sm-2 h6"
                      >
                        電子信箱
                      </label>
                      <div className="col-sm-5 col-10 consumer-info-input">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          value={UserInfoData[0].Email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row g-3">
                      <label
                        htmlFor="address"
                        className="col-form-label col-sm-2 h6"
                      >
                        寄送地址
                      </label>
                      <div className="address-location col-sm-10">
                        <Twzipcode
                          initPostcode={data.postcode}
                          onPostcodeChange={(country, township, postcode) => {
                            setData({
                              country,
                              township,
                              postcode,
                            })
                          }}
                        />

                        <div className="col-sm-7 col-7">
                          <label htmlFor="addressinfo" className="form-label">
                            詳細地址
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="addressinfo"
                            value={UserInfoData[0].Address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div
              className="position-sticky top-0 flowcart"
              style={{ height: '100vh', paddingInline: 20, flex: '0 0 440px' }}
            >
              <div
                className="d-flex flex-column position-sticky"
                style={{ gap: 20, top: 110 }}
              >
                <div className="total d-flex flex-column" style={{ gap: 20 }}>
                  <div className="d-flex justify-content-between carttext">
                    <div>商品數量</div>
                    <div>
                      {instrumentData && instrumentData.length > 0 ? (
                        <>樂器*{calcInstrumentItems()}</>
                      ) : (
                        ''
                      )}
                      {lessonData && lessonData.length > 0 ? (
                        <>課程*{calcLessonItems()}</>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between carttext">
                    <div>原價合計</div>
                    <div>NT ${calcTotalPrice().toLocaleString()}</div>
                  </div>
                  <div className="d-flex justify-content-between carttext discount">
                    <div>折扣合計</div>
                    <div>-NT ${calcTotalDiscount().toLocaleString()}</div>
                  </div>
                  <div className="d-flex justify-content-between h3">
                    <div>合計</div>
                    <div>
                      NT $
                      {(
                        calcTotalPrice() - calcTotalDiscount()
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="cart-btn">
                  <Link
                    href="/cart/check"
                    className="b-btn b-btn-body d-flex w-100 h-100 justify-content-center"
                    style={{ padding: '14px 0' }}
                  >
                    回上一步
                  </Link>
                  <Link
                    href="/cart/confirm"
                    className="b-btn b-btn-primary d-flex w-100 h-100 justify-content-center"
                    style={{ padding: '14px 0' }}
                  >
                    確認訂單
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className="flow-cart-mb" style={{}}>
        <div
          className="d-flex flex-column position-sticky"
          style={{ gap: 20, top: 110 }}
        >
          <div className="total d-flex flex-column" style={{ gap: 20 }}>
            <div className="d-flex justify-content-between carttext">
              <div>商品數量</div>
              <div>
                {instrumentData && instrumentData.length > 0 ? (
                  <>樂器*{calcInstrumentItems()}</>
                ) : (
                  ''
                )}
                {lessonData && lessonData.length > 0 ? (
                  <>課程*{calcLessonItems()}</>
                ) : (
                  ''
                )}
              </div>{' '}
            </div>
            <div className="d-flex justify-content-between carttext">
              <div>原價合計</div>
              <div>NT ${calcTotalPrice().toLocaleString()}</div>
            </div>
            <div className="d-flex justify-content-between carttext discount">
              <div>折扣合計</div>
              <div>-NT ${calcTotalDiscount().toLocaleString()}</div>{' '}
            </div>
            <div className="d-flex justify-content-between h3">
              <div>合計</div>
              <div>
                NT ${(calcTotalPrice() - calcTotalDiscount()).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="cart-btn">
            <Link
              href="/cart/check"
              className="b-btn b-btn-body d-flex w-100 h-100 justify-content-center"
              style={{ padding: '14px 0' }}
            >
              回上一步
            </Link>
            <Link
              href="/cart/confirm"
              className="b-btn b-btn-primary d-flex w-100 h-100 justify-content-center"
              style={{ padding: '14px 0' }}
            >
              確認訂單
            </Link>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .cart{
          color: black;
          padding: 20px 0;
        }
        .flowcart {
            @media screen and (max-width: 576px) {
              display: none;
            }
        }
        .ballbox{
          @media screen and (max-width: 576px) {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        .cart-process {
          padding: 8px 40px;
          margin-bottom: 20px;
          @media screen and (max-width: 576px) {
            padding:0 0 0 0;
            gap:25px;
          }
          .cart-process-text{
            font-size:20px;
            text-align: center;
            @media screen and (max-width: 576px) {
              font-size:14px;
              width:100px;
            }
          }
        }
        .cart-main {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .active {
          background: var(--primary-light, #18a1ff);
        }
        .inactive {
          background: var(--body, #b9b9b9);
        }
        .ball {
          color: #fff;
          text-align: center;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          font-family: 'Noto Sans TC';
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .h5 {
          color: #000;
          /* h5 */
          font-family: 'Noto Sans TC';
          font-size: 20px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .h3 {
          font-family: 'Noto Sans TC';
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .h6 {
          font-family: 'Noto Sans TC';
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .carttext {
          font-family: 'Noto Sans TC';
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .discount {
          color: var(--primary, #1581cc);
        }
        .total {
          color: black;
          border-radius: 10px;
          border: 1px solid var(--primary, #1581cc);
          padding: 20px;
          align-self: stretch;
          @media screen and (max-width: 576px) {
            border: 0;
            padding: 0;
            gap: 10px !important;
          }
        }
        .cart-btn {
          width: 100%;
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          align-self: stretch;
          border-radius: 5px;
          .btn {
            width: 100%;
            padding: 14px 0px !important;
          }
          .btn-prev{
            color: var(--Gray-00, #FFF);

            /* Button Label/Large */
            font-family: Inter;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 24px; /* 133.333% */
          }
          .btn-next{
            color: var(--Gray-00, #FFF);

            /* Button Label/Large */
            font-family: Inter;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 24px; /* 133.333% */
          }
        }
        .cart-lesson {
          display: flex;
          gap: 12px;
          flex-direction: column;
          width: 100%;
        }
        .cart-instrument {
          display: flex;
          gap: 12px;
          flex-direction: column;
          width: 100%;
        }
        .cart-title {
          color: var(--white, #fff);
          font-family: 'Noto Sans TC';
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          background-color: var(--body, #b9b9b9);
          padding: 5px 12px;
        }
        .credit-card-input{
          @media screen and (max-width: 576px) {
            font-size: 14px;
            padding:3px 3px;
          }
        }
          .cart-discount {
            color: var(--primary, #1581cc);
            grid-column: 7/9;
            margin-left: auto;
          }
        }
        .cart-subtotal {
          color: black;
          display: flex;
          padding: 4px 12px;
          justify-content: flex-end;
          align-items: center;
          align-self: stretch;
        }
        .cart-total {
          color: black;
          display: flex;
          padding: 4px 12px;
          justify-content: flex-end;
          align-items: center;
          align-self: stretch;
        }
        .cart-total-text {
            font-family: 'Noto Sans TC';
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
      .consumer-info-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
      }
      .address-location{
        display: flex;
        align-items: flex-start;
        align-content: flex-start;
        gap: 12px 45px;
        flex-wrap: wrap;
        padding: 7px 8px;
        & label{
          color: var(--Text-Secondary---Grey2, #6F7482);
        }
        @media screen and (max-width: 576px) {
          margin-top:0;
        }
      }
      .consumer-info-input{
        & input{
          @media screen and (max-width: 576px) {
            font-size: 14px;
            padding:3px 3px;
          }
        }
        @media screen and (max-width: 576px) {
          margin-top:0;
        }
      }
      .payment-info-group{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
      }
      .credit-card-info{
        color: black;
        .minussign{
          @media screen and (max-width: 576px) {
            padding:0 2px
          }
        }
      }
      
      .credit-card-pic{
        display: flex;
        .credit-card-pic-item{
          width:28px;
          height:20px;
          position:relative;
          overflow: hidden;
          margin: 4px;
        }
        .visa{
          background: linear-gradient(#222357, #254AA5);
          border-width: 3px;
          border-style: solid;
          border-image: linear-gradient(to bottom, #222357, #254AA5) 1;
        }
        .mnp{
          background-color: #D7FFD8;
          border: 3px solid #D7FFD8;
        }
        .mastercard{
          background-color: #01326F;
          border: 4px solid #01326F;
        }
      }
      .mobilepayment-pic-item{
        width: 65px;
        height: 23px;
        position:relative;
        overflow: hidden;
      }
      .paymethods{
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        @media screen and (max-width: 576px) {
          padding:0 0 0 0;
          gap:20px 40px;
        }
        .paymethod-item{
          width: fit-content;
          display: flex;
          gap: 20px;
        }
      }
      .creditcard{
        @media screen and (max-width: 576px) {
          padding: 0px 3px;
          width: fit-content !important;
        }
        & input{
          @media screen and (max-width: 576px) {
            width: 50px;
          }
        }
      }
      .consumer-info{
        color: black;
      }
      .col-form-label{
        @media screen and (max-width: 576px) {
          font-size: 16px;
          padding-right:2px;
        }
      }
      .flow-cart-mb {
          display: none;
          @media screen and (max-width: 576px) {
            display: block;
            position: sticky;
            bottom: 0;
            left: 0;
            z-index: 100;
            background-color: #FFF;
            padding: 20px 30px;
            }
      }
      `}</style>
    </>
  )
}
