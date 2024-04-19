# 資展國際前端工程師養成班MFEE44 期末分組大型專題：Boundless 線上音樂學習平台

**免責聲明：本專案僅作資展國際期末專題發表之用，不得用於商業用途，若您的權利遭受侵害，敬請告知。**

提醒：測試前請先匯入boundless-final.sql到mysql資料庫

測試帳號：
信箱－mfee01t@gmail.com 密碼－a12345678

更新紀錄：
- 4/10 修改購物車，新增綠界科技第三方支付。
  - 備註一：測試時，付款方式建議選擇流程最短的「網路ATM」，因為若測試成功，則任一方式都會成功。
  - 備註二：選擇付款出現表單後，不須填寫任何資訊，點選「save」即可。
  - 備註三：偶爾會遇到因銀行方維護而付款失敗的情況，目前測試的結果中「台灣土地銀行」最穩定，也可選擇其他銀行看看。

## 簡述

本人在這次專案中負責團隊管理、環境準備，以及開發「Let's JAM! 樂團媒合」功能。
基本規則：會員只能屬於一個樂團，樂團發起後必須在30天內達目標人數，詳細流程請參照下圖。
![image](https://github.com/antonio88118/boundless-final-mine/blob/main/%E7%B5%84%E5%9C%98%E6%B5%81%E7%A8%8B.png)

## 個人功能檔案連結
- 前端
  - [首頁](./client/pages/index.js)
  - [樂團媒合](./client/pages/jam)
  - [元件](./client/components/jam)
  - [全域hook](./client/hooks/use-jam.js)
- [後端](./server/routes/jam.js)
