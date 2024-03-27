import express, { json } from 'express';
import db from '../db.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/form', upload.none(), async (req, res) => {
    const ouid = generateOuid()

    const {
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
    const newOrderID = parseInt(orderID)
    const newCartData = JSON.parse(cartdata)
    console.log(InstrumentCUID)
    // const uuid = JSON.stringify(uid)

    const now = new Date().toISOString();
    console.log(req.body);
 
    const orderTotal = 'INSERT INTO `order_total` (`id`, `user_id`, `payment`, `transportation_state`, `phone`, `discount`, `postcode`, `country`, `township`, `address`, `created_time`, `ouid`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)'


    await db.execute(orderTotal,
        [
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
        ]).then(() => {
            // res.status(200).json({ status: 'success' });
        })
        .catch((error) => {
            res.status(500).json({ status: 'error', error });
        });

    newCartData.map(async (v,i)=>{
        // console.log(v);
        await db.execute('INSERT INTO `order_item`  (`id`, `order_id`, `product_id`, `quantity`, `ouid`) VALUES (NULL, ?, ?, ?, ?)',
        [
            newOrderID,
            v.id,
            v.qty,
            ouid
        ]
        ).then(() => {
            // res.status(200).json({ status: 'success' });
        }).catch((error) => {
            res.status(500).json({ status: 'error', error });
        });
    })


    const [resultLessonCUID] = await db.execute(`UPDATE coupon SET valid = 0 WHERE coupon_template_id = ?;`, [LessonCUID]);
    const [resultInstrumentCUID] = await db.execute(`UPDATE coupon SET valid = 0 WHERE coupon_template_id = ?;`, [InstrumentCUID]);
    

//     const {
//       uid,
//       title,
//       degree,
//       genre,
//       former,
//       players,
//       region,
//       condition,
//       description,
//     } = req.body;
//     const tureDegree = parseInt(degree);
//     const juid = generateUid();
//     // 更新會員所屬的JAM
//     let updateUser = await db
//       .execute('UPDATE `user` SET `my_jam` = ? WHERE `uid` = ?', [juid, uid])
//       .then(() => {
//         return 1;
//       })
//       .catch(() => {
//         return 0;
//       });
//     if (updateUser === 0) {
//       console.log('新增失敗');
//       return;
//     }
//     // 刪除所有該會員的申請
//     let updateApply = await db
//       .execute('UPDATE `jam_apply` SET `valid` = 0 WHERE `applier_uid` = ?', [
//         uid,
//       ])
//       .then(() => {
//         return 1;
//       })
//       .catch(() => {
//         return 0;
//       });
//     if (updateApply === 0) {
//       console.log('刪除失敗');
//       return;
//     }
  
//     await db
//       .execute(
//         'INSERT INTO `jam` (`id`, `juid`, `title`, `degree`, `genre`, `former`, `players`, `region`, `band_condition`, `description`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [
//           juid,
//           title,
//           tureDegree,
//           genre,
//           former,
//           players,
//           region,
//           condition,
//           description,
//         ]
//       )
//       .then(() => {
//         res.status(200).json({ status: 'success', juid });
//       })
//       .catch((error) => {
//         res.status(500).json({ status: 'error', error });
//       });
});

function generateOuid() {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codeLength = 12;
    let createdCodes = [];
    let createCodes = "";
  
    let Code = "";
    do {
      Code = "";
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
