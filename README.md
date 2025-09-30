# Shui Board 

A simple message board where users can **post**, **view**, and **edit** messages.  
Built with **React (frontend)** and a **serverless backend on AWS (API Gateway + Lambda + DynamoDB)**.  
The frontend is hosted in **S3** and consumes the API deployed with Serverless Framework.

---

## Technologies Used
- **Frontend**: React, 
- **Backend**: Node.js, AWS Lambda, API Gateway, DynamoDB
- **Infrastructure**: Serverless Framework
- **Extras**: UUID for generating unique IDs

---

## Features
- Post a new message (username + text).
- View all messages.
- Edit an existing message (only if it exists).
- (Extra for VG) Filter messages by user and sort by date.
