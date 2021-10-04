FROM node:latest

COPY ./package.json ./
RUN npm install
COPY . .

CMD ["node", "src/server/index.js"]


# npm install express --save
#npm install pg

# docker build -t vannguyen/sdc:1 .
#docker image ls

#docker run -p 8001/3000 vannguyen/sdc:1
#(run background docker run -p 8001/3000 -d vannguyen/sdc:1)

#docker container ls

# docker container stop (the name)
#docker container log