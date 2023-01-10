
# 挑戰任務
採前後分離的開發模式，在一個月內打造的簡易打卡平台。


[![Framework](https://img.shields.io/badge/express-4.18.2-yellow.svg)](https://www.npmjs.com/package/express)
[![Database](https://img.shields.io/badge/Database-MYSQL-yellow.svg)](https://www.npmjs.com/package/mysql)

API URL: https://api.adams-bear.com
| <a href="https://flossy-rudbeckia-3b4.notion.site/api-list-1b94b6be31a242bf809d24a10acfe39d">API文件</a>
  
  <a href="https://github.com/ReoNaBear/Challenge_Frontend">前端repo</a> 
 | <a href="https://d3rdy47yp5tkip.cloudfront.net/">demo</a> 
## 功能介紹

  * 提供使用者登入、登出及註冊帳號功能
    * 網站具備JWT驗證功能 
  * 提供使用者打卡
    * 按鈕打卡- 限制gps定位
    * QRcode打卡- 限制admin才能產生QR碼
  * 提供使用者功能
    * 使用者可以修改個人密碼
    * 使用者可以看自己今日打卡進度
    * 使用者可以看自己本月已缺席天數
  * 提供後台管理員功能
    * 可以瀏覽所有使用者資訊(名字,工號,前一個工作日打卡情況,是否封鎖)
    * 可以封鎖/解除封鎖一般使用者
    * 可以更改前一日出勤情況
    * 可以更改使用者密碼


## 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/ReoNaBear/Challenge_Backend.git
```

2.初始

```
cd Challenge_Backend //切至專案資料夾
npm install  //安裝套件
(If error npm not found! please install latest node.js first)
npm install nodemon   // 另行安裝nodemon
```
```
將資料夾內'.env.example'檔案名稱改為'.env'
```


3.請在MySQL Workbench，建立SQL資料庫

```
create database challenge_workspace
```

```
npx sequelize db:migrate   
npx sequelize db:seed:all
// 載入模組及種子資料 
```

4.開啟程式

```
npm run dev
```
當終端機(terminal)出現以下文字，代表伺服器已啟動
```
Example app listening on port 3000!
```
若要暫停使用
```
ctrl + c
```
## 種子資料資訊
1.後台帳號
  ```
  account: admin 
  email: admin@titan-test.com.tw
  password: tiadmin
  isAdmin: 1
  ```
2.前台帳號
  ```
  account: user1
  email: user1@titan-test.com.tw
  password: titaner
  isAdmin: 0
  ```

環境變數請參閱 env.example

# 專案開發人員

獨立開發

## 使用工具
請參閱package.json
