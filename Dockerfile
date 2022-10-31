# FROM node:latest

# WORKDIR /client

# COPY package*.json ./

# RUN npm install

# COPY . .

# CMD ["npm", "start"]

FROM node:lts AS development

WORKDIR /code

COPY package.json .
COPY package-lock.json .
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

# FROM development AS builder

# RUN npm run build

# FROM development as dev-envs
# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF
# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /
# CMD [ "npm", "start" ]

# FROM nginx:1.13-alpine

# COPY --from=builder /code/build /usr/share/nginx/html