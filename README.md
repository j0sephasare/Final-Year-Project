
# Herculethes Fitness Application
<img src="/Scrapbook/Images/HerculethesPoster2.jpg" width="300" height="300">

## Description
This is a mobile application designed to help users track their workout routines, save their workout data, and upload images associated with their workouts. It utilizes Angular with Ionic for the frontend and Firebase for authentication, database, and storage services.

### Video Presentation
https://atlantictu-my.sharepoint.com/:v:/r/personal/g00392239_atu_ie/Documents/Recording-20240426_161920.webm?csf=1&web=1&e=74U3s5

## Features

- Track workout routines.
- Save workout data to a cloud database.
- Upload and store images related to workout sessions.
- User authentication for personalized experience.
- Secure Login/logout, account creation and password recovery 
- Get Meals based on ingrediants provided
- Find local gyms near your area
- Do exercises based on professional athletes training regimes

## Technologies Used

- Ionic with Angular
- Firebase(Database, authentication and cloud functions)

## Installation Instructions

To get this project running on your local machine, follow these steps:

### Prerequisites

- Node.js
- npm (usually comes with Node.js)
- Angular CLI
- Ionic CLI

### Cloning the Repository

First, clone the repository to your local machine using git clone

### Installing Dependecies

npm install


### Running the Application
ionic serve

This will start a server and open the application in your default browser.

# Firebase Setup
If You don't already have Firebase Setup here is how:

- Visit the  Firebase Console and create a new Firebase project if you don't already have one [Firebase Console](https://console.firebase.google.com/u/0/)
- Once your project is created, navigate to the project settings and add a new web application.
- Configure the Firebase Authentication, Realtime Database, and other services used in the app through the Firebase console.
- Install Firebase CLI globally by running npm install -g firebase-tools inside the project directory.
- Log in to the Firebase CLI with firebase login and follow the on-screen instructions to authenticate.
- Initialize your project with firebase init and select the features you are using (e.g., Authentication, Realtime Database, Hosting, Functions).
- Update the .firebaserc file with your project ID and update the firebase.json as needed for your app's configuration.

# Application Uses

After the application has been setup you can:

- Sign up and log  
- Get meal plans based on ingrediants proved
- Delete and Update exercise if errors were made
- keep up to date with your workouts
- Use a macronutrients calculator for Losing weight,gaining or maintaining.
- Find local gyms in your area
