FROM node:18 AS build

WORKDIR /app
COPY . .

ENV CI=true
RUN npm install -g pnpm@latest --yes
RUN pnpm install && pnpm build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
