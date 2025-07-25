# Step 1: Build the Angular app
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

# Step 2: Serve using NGINX
FROM nginx:alpine

# Clear default NGINX html
RUN rm -rf /usr/share/nginx/html/*

# 👇 Use your correct dist folder name
COPY --from=build /app/dist/ng-clarity-starter /usr/share/nginx/html

# Optional: custom NGINX routing for Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]