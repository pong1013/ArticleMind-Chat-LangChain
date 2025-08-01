# 構建階段
FROM node:18-alpine AS build
WORKDIR /app

# 安裝pnpm（只安裝一次）
RUN npm install -g pnpm@latest --yes

# 複製package文件（利用Docker層緩存）
COPY package.json pnpm-lock.yaml ./

# 安裝依賴（如果package.json沒變，這層會被緩存）
RUN pnpm install --frozen-lockfile

# 複製源代碼
COPY . .

# 設置環境變量並構建
ENV CI=true
RUN pnpm build

# 生產階段
FROM nginx:alpine
# 複製構建結果
COPY --from=build /app/build /usr/share/nginx/html
# 複製nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
