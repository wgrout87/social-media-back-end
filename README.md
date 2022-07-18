# Social Media Back End

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Social Media Back End is a back end API that could be used for the deployment of a social media application. It includes API endpoints for all crud operations associated with its two main models, Users and Thoughts. Users are able to have associations with other users via an array of friends, and with thoughts via an array of thoughts. Thoughts can be reacted to, and contain an array of all reactions associated to any one particular thought. Technologies used included Express.js, Mongooose, and Node.js.

## Links

[Code repository](https://github.com/wgrout87/social-media-back-end)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

Before installing this project, MondgoDB should be installed so that the project can interact with the MongoDB database. With that done, getting the project up and running simply requires the installation of all required Node packages using the command, "npm i". Then the command "npm start" will run a local server, and the API routes can be tested using Insomnia.

Start-up steps:

```
npm i
nmp start
```

## Usage

This project is just the back end for a social media app, so fully implementing it would require a working front end. To test the back end, though, with the server started up, the API routes can be tested in Insomnia. The various routes are enumerated below. If running the server locally, localhost:3001 should precede the defined routes.

User Routes:

```
GET all users: '/api/users'
GET a single user: '/api/users/:id'
POST a user: '/api/users'    // Requires a JSON body with username and email properties
PUT a user: '/api/users/:id'    // Requires a JSON body with username and/or email properties
DELETE a user: '/api/users/:id'
POST a friend: '/api/users/:userId/friends/:friendId'
DELETE a friend: '/api/users/:userId/friends/:friendId'
```

Thought Routes:

```
GET all users: '/api/thoughts'
GET a single user: '/api/thoughts/:id'
POST a user: '/api/thoughts'    // Requires a JSON body with username and thoughtText properties
PUT a user: '/api/thoughts/:id'    // Requires a JSON body with username and/or thoughtText properties
DELETE a user: '/api/thoughts/:id'
POST a reaction: '/api/thoughts/:userId/friends/:friendId'    // Requires a JSON body with username and reactionBody properties
DELETE a reaction: '/api/thoughts/:userId/friends/:friendId'
```

## License

Copyright 2022 William Grout

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
