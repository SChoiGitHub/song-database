FROM node AS builder
RUN mkdir /project
WORKDIR /project
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM httpd
COPY --from=builder /project/dist/angular /usr/local/apache2/htdocs/
