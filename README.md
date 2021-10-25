
# Project Catwalk Q&A API

![Express](https://img.shields.io/badge/-Express-20232A?style=for-the-badge&logo=express&logoColor=yellow)
![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)


Developed by [Van Nguyen](https://github.com/vannguyen-vn)

![image](https://user-images.githubusercontent.com/59850870/138746239-5bf5cfbf-b246-4ab2-8fbc-55f9289a351d.png)

A microservice RESTful API for an ecommerce web app [Toph Clothing Co.](https://github.com/hr-rfp55-toph-FEC/Project-Catwalk). The other microservices are located here: [MidnaMicroservices](https://github.com/SDC-TeamMidna)

The system was deployed onto several AWS EC2 instances, with an Nginx load balancer for 3 node servers, all quering one postgres database.

The goal of this project was to redesign the back end API service for an e-commerce web app, transforming it from a monolothic to a horizontally scalable, microservices based system architecture.

The metrics to achieve were:
  - A minimum query speed, per endpoint, of less than 100ms
  - 1000 requests per second, while maintaining 100ms response, with an error rate at most 1% under load

The metrics achieved were:
  - Query speeds, per endpoint of < 17ms
  - Near 3000 requests per second, error rate of 0%


### Installation
```
  npm run build
  npm start
```
