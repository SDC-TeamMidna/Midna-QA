FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "src/server.js"]


# sudo docker build . -t vannguyen/sdc
# docker run -p 6000:3000 -d vannguyen/sdc
# docker ps
# docker exec -it 997af8ed8211 bash
# docker container ls
# docker container log
# docker container stop (the name)
