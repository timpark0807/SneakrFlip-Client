# SneakrFlip React App
Please visit SneakrFlip.com/about for more information + GIFs demonstrating functionality.

  ![Imgur](https://i.imgur.com/i8gPMcn.png)

## Introduction
  
One of my hobbies as a teenager was reselling sneakers and other limited edition items. One problem I frequently encountered was how to consistently track my inventory. I would use a combination of iPhone notes, Excel workbooks, and my memory - which never worked too well.

Once I discovered my passion for software development, I knew I wanted to make apps relating to my existing hobbies. So it was a no brainer to draw from my previous expereince as a sneaker reseller and create a centralized inventory management application.

## The Tech Stack

**Backend**

The SneakrFlip backend is written in GoLang. This features a RESTful API service that allows users to create, read, update, and delete records via HTTP requests. The backend is integrated with oAuth to handle authentication and verify requests are authorized. Data is stored in MongoDB.

**Frontend**

The frontend is a single page application written in React.js. The Material UI library was used to help style the components. Our front end application provides an interface for users to consume the backend API endpoints.
 
**Deployment**
SneakrFlip was deployed to Amazon Web Services. The frontend React app sits in an S3 bucket that serves static HTML/CSS/JS content to the user’s browser. The backend API was deployed to a group of Auto Scaling EC2 instances. A load balancer sits in between the frontend/backend to distribute requests evenly between instances.

**CI/CD**

In order to streamline the development/deployment process, I built an automated CI/CD pipeline using AWS CodePipeline. A GitHub commit will trigger a build process via AWS Code Build. Once the build is completed, Code Deploy will output the build files to the AWS S3 bucket. Every git push to the master branch will automatically deploy to the live SneakrFlip.com website.