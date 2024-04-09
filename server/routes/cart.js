import express, { json } from 'express';
import db from '../db.js';
import multer from 'multer';
import dotenv from 'dotenv';
import ecpay_payment from 'ecpay_aio_nodejs';

dotenv.config();
const router = express.Router();
const upload = multer();

// 綠界提供的 SDK

const { MERCHANTID, HASHKEY, HASHIV } = process.env;

// SDK 提供的範例，初始化
// https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
const options = {
  OperationMode: 'Test', //Test or Production
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
  },
  IgnorePayment: [
    //    "Credit",
    //    "WebATM",
    //    "ATM",
    //    "CVS",
    //    "BARCODE",
    //    "AndroidPay"
  ],
  IsProjectContractor: false,
};
// 稍後會設定的綠界訂單編號
let TradeNo;

// 資料庫成立訂單
router.post('/form', upload.none(), async (req, res) => {
  const ouid = generateOuid();
  let {
    username,
    phone,
    email,
    country,
    township,
    postcode,
    address,
    totaldiscount,
    payment,
    transportationstate,
    cartdata,
    orderID,
    uid,
    LessonCUID,
    InstrumentCUID,
  } = req.body;
  const newOrderID = parseInt(orderID);
  const newCartData = JSON.parse(cartdata);
  console.log(InstrumentCUID);
  // const uuid = JSON.stringify(uid)

  const now = new Date().toISOString();
  console.log(req.body);

  postcode = postcode == 'null' ? null : postcode;
  township = township == 'null' ? null : township;
  township = township == 'null' ? null : township;
  address = address == '' ? null : townaddressship;

  const orderTotal =
    'INSERT INTO `order_total` (`id`, `user_id`, `payment`, `transportation_state`, `phone`, `discount`, `postcode`, `country`, `township`, `address`, `created_time`, `ouid`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)';

  await db
    .execute(orderTotal, [
      uid,
      payment,
      transportationstate,
      phone,
      totaldiscount,
      postcode,
      township,
      country,
      address,
      ouid,
    ])
    .then(() => {
      // res.status(200).json({ status: 'success' });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ status: 'error', error });
    });

  newCartData.map(async (v, i) => {
    // console.log(v);
    await db
      .execute(
        'INSERT INTO `order_item`  (`id`, `order_id`, `product_id`, `quantity`, `ouid`) VALUES (NULL, ?, ?, ?, ?)',
        [newOrderID, v.id, v.qty, ouid]
      )
      .then(() => {
        // res.status(200).json({ status: 'success' });
      })
      .catch((error) => {
        res.status(500).json({ status: 'error', error });
      });
  });

  let resultLessonCUID = true;
  let resultInstrumentCUID = true;
  if (LessonCUID != 'null') {
    resultLessonCUID = await db
      .execute(`UPDATE coupon SET valid = 0 WHERE coupon_template_id = ?`, [
        LessonCUID,
      ])
      .then(() => true)
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
  if (InstrumentCUID != 'null') {
    resultInstrumentCUID = await db
      .execute(`UPDATE coupon SET valid = 0 WHERE coupon_template_id = ?`, [
        InstrumentCUID,
      ])
      .then(() => true)
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  // 進入綠界付款流程
  if (resultLessonCUID && resultInstrumentCUID) {
    res.status(200).json({status: 'success', ouid})
  }
});

// 綠界支付
router.get('/:ouid', async (req, res) => {
    const ouid = req.params.ouid
    const [payment] = await db.execute('SELECT payment FROM order_total WHERE ouid = ?', [ouid])
    const total = payment[0].payment
    console.log(total);
  // SDK 提供的範例，參數設定
  // https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
  const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
  TradeNo = 'ecpay' + new Date().getTime();
  let base_param = {
    MerchantTradeNo: TradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate,
    TotalAmount: `${total}`,
    TradeDesc: 'Boundless購物訂單',
    ItemName: 'Boundless購物商品',
    ReturnURL: `/return`,
    ClientBackURL: `http://localhost:3000/cart/success`,
  };
  const create = new ecpay_payment(options);

  // 注意：在此事直接提供 html + js 直接觸發的範例，直接從前端觸發付款行為
  const html = create.payment_client.aio_check_out_all(base_param);
//   console.log(html);

  res.render('index', {
    title: '付款頁面跳轉中',
    html,
  });
});

// 後端接收綠界回傳的資料
router.post('/return', async (req, res) => {
  console.log('req.body:', req.body);

  const { CheckMacValue } = req.body;
  const data = { ...req.body };
  delete data.CheckMacValue; // 此段不驗證

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

  console.log(
    '確認交易正確性：',
    CheckMacValue === checkValue,
    CheckMacValue,
    checkValue
  );

  // 交易成功後，需要回傳 1|OK 給綠界
  res.send('1|OK');
});

function generateOuid() {
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codeLength = 12;
  let createdCodes = [];
  let createCodes = '';

  let Code = '';
  do {
    Code = '';
    for (let i = 0; i < codeLength; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      //   回傳characters當中的隨機一值
      Code += characters.charAt(randomIndex);
    }
  } while (createdCodes.includes(Code));

  createdCodes.push(Code);
  createCodes += Code;
  return createCodes;
}

export default router;
