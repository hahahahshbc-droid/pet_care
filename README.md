# 毛里时光 · 宠物洗护

使用 Next.js App Router、React 和 TypeScript 构建的宠物洗护页面。预约由 Next.js 后端 API 通过 PostgreSQL Session Pooler 写入 Supabase。

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

在 `.env.local` 中，把 `DATABASE_URL` 替换为 Supabase Dashboard 的 **Connect → Session pooler** 连接串，并填入数据库密码。该变量只供服务端使用。

生产构建：

```bash
npm run build
```

店名与价格仍为演示内容。上线经营前请替换店名、价目、地址和营业时间，并配置生产环境的 `DATABASE_URL`。

图片：Faber Leonardo / Unsplash，https://unsplash.com/pt-br/fotografias/um-golden-retriever-esta-sentado-e-sorrindo-para-a-camera-CLhFS67ni1c ，适用 Unsplash License。
