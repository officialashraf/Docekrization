# Step 1: Build stage

FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN node generate-build-info.js
RUN npm run build

# Step 2: Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
