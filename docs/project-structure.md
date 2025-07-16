# Campus Crypto 專案架構說明

本專案為校園加密貨幣平台，結合區塊鏈智能合約與前後端應用，實現學生、商家、管理員三種角色的校園任務、支付、商品兌換等功能。

---

## 目錄結構

```
Campus-crypto/
├── backend/           # 後端伺服器（API、業務邏輯）
├── blockchain/        # 區塊鏈智能合約、部署腳本
│   ├── contracts/     # Solidity 智能合約
│   ├── scripts/       # 部署與互動腳本
│   ├── artifacts/     # 編譯後 ABI、bytecode
│   └── deployed-addresses.json # 部署後合約地址
├── frontend/          # 前端 Vue3 + Vite 專案
│   ├── src/
│   │   ├── abi/       # 合約 ABI 檔案
│   │   ├── contracts/ # 合約地址常數
│   │   ├── components/# Vue 元件
│   │   ├── store/     # Pinia 狀態管理
│   │   └── views/     # 頁面
│   └── public/
└── docs/              # 專案說明文件
```

---

## 主要合約

- **MyToken.sol**：ERC20 代幣，平台流通貨幣 MTK。
- **UserRole.sol**：用戶角色管理（學生/商家/管理員）。
- **TaskReward.sol**：校園任務發佈與獎勵發放。
- **Payment.sol**：MTK 代幣支付與交易紀錄。

---

## 前端

- **src/contracts/addresses.js**：合約地址集中管理。
- **src/abi/**：合約 ABI 檔案，供 ethers.js 互動用。
- **src/store/walletStore.js**：錢包連接、餘額、MTK 交易紀錄。
- **src/components/UserRoleSelector.vue**：角色綁定。
- **src/views/Tasks.vue**：任務清單與互動。
- **src/views/Home.vue**：顯示 MTK 餘額、花費等。
- **src/views/TaskPublish.vue**:任務發布頁面。

---

## 後端

- 提供 API 服務（如用戶資料、商品資訊等，視需求擴充）。

---

## 部署流程

1. 編譯並部署智能合約（blockchain/scripts/deploy.js）。
2. 產生 `deployed-addresses.json`，複製合約地址到前端。
3. 前端引用合約地址與 ABI，實現鏈上互動。

---

## 角色與功能

- **學生**：查詢餘額、參與任務、支付、商品兌換。
- **商家**：收款、商品管理、交易紀錄。
- **管理員**：任務發佈、獎勵發放、用戶管理。

---

如需詳細技術說明，請參考各目錄下 README 或聯絡專案負責人。
