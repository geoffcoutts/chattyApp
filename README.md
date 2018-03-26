Chatty
=====================

A lightweight communication web app. Chatty can be used to send text or image messages between users.

Chatty is mainly built with React for rendering the client page, ws for websocket communication, and Express for the server.

### Pictures

Interface of Chatty

![Interface of Chatty](https://github.com/geoffcoutts/chattyApp/blob/master/docs/Chatty%20Basic%20Interface.png)

Users can change the colour of their username

![Users can change the colour of their username](https://github.com/geoffcoutts/chattyApp/blob/master/docs/Chatty%20Colour%20Changer.png)

Users can also use .jpg, .png, and .gif images from the internet as input

![Users can also use .jpg, .png, and .gif images from the internet as input](https://github.com/geoffcoutts/chattyApp/blob/master/docs/Chatty%20Images.png)

Users are given system notifications based on users entering or leaving the channel, or changing their handle

![Users are given system notifications based on users, entering or leaving the channel, or changing their handle](https://github.com/geoffcoutts/chattyApp/blob/master/docs/Chatty%20User%20Leaving.png)

### Usage

Before starting the program, in your terminal run 'npm install' in both the chattyApp folder and the chatty_server folder.

Chatty can be started with "npm run start" in your terminal from the chattyApp folder and the chatty_server folder. Requires two instances of the terminal.


### Dependencies

* Babel
* RandomColor
* React
* React-color
* React-dom
* Uuidv4
* Webpack