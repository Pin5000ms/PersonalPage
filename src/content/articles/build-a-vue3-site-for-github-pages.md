---
title: 用 Vue 3 建立可部署到 GitHub Pages 的個人網站
date: 2026-03-23
summary: 如何使用 Vibe Coding 建立個人網站，並部署到 GitHub Pages。
tags:
  - Vue 3
  - GitHub Pages
  - Vite
slug: build-a-vue3-site-for-github-pages
---

# 為什麼選擇 Vue 3 + GitHub Pages

如果目標是建立一個維護成本低、可快速迭代的個人網站，Vue 3 搭配 GitHub Pages 是很務實的組合。

- 前端框架生態成熟
- 適合做靜態頁面與作品集
- 可直接透過 GitHub Actions 自動部署

## 基本建立流程

1. 使用 Vite 建立 Vue 專案。
2. 整理頁面結構，例如 About、Articles、Projects、Contact。
3. 設定 hash router 或正確的 base path，避免 GitHub Pages 路由失效。
4. 在 GitHub Actions 中設定 build 與 deploy 流程。

## 部署時要注意的地方

- 確認靜態資源路徑是否正確
- 確認 router 模式是否適合 GitHub Pages
- 確認 repository 設定中的 Pages 發布來源

## 結語

這套組合很適合個人品牌網站、技術文章站與作品展示站。後續若要增加內容，最好盡早把文章改成 Markdown 驅動，而不是直接寫死在 TypeScript 裡。
