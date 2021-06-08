# Tambola-API
Bingo Tambola server that will create a Tambola game and corresponding tickets build on node and express server using mongoose ODM for mongodb.

## Basic Features
1. Creates Tambola game mappped with many tickets
2. User can be created/registered
3. Ticket will be generated for a valid game and user
4. Tickets generated will be unique and 3 rows 9 cols format
5. Random, unique numbers can be generated for each game
6. Tickets can be fetched as html tables
7. The statistics of the game and tambola numbers can be generated


## How to install and run?
1. Clone this project
2. Start by installing npm and mongoDB if you don't have them already.
3. Run the Mongo Server.
4. Navigate to Project Directory by :
```
cd Game_API
```
5. run following commands :
```
npm install 
npm start or node index.js
```

## How to use API (Understanding the end points)? (!!Important in understanding API)
#### Base URL : `http://localhost:8500`
#### End Points :
1. `/api/game/create` -> game_id\ (POST) : creates new game
2. `/api/game/{game_id}/ticket/{user_name}/generate` -> ticket_id (POST) : generates new ticket using 'game_id' and 'user_name'
3. `/ticket/{ticket_id}` -(GET) : just print html table with ticket using 'ticket_id'
4. `/api/game/{game_id}/number/random` (GET) : pick random number for game without duplicates using 'game_id' 
5. `/api/game/{game_id}/numbers` (GET) : returns all numbers picked for this game until now using 'game_id'
6. `/api/game/{game_id}/stats` (GET) : stats of the game {numbers drawn/no of tickets}  using 'game_id'

## Directory Structure and flow of The Code
This code follows MVC pattern and hence everything is differentiated and well managed:

`/routes` - containes all the routes. <br>
`/controller` - contains functions to connect to different routes. <br>
`/models` - to store data in db we need models. <br>
`/config` - contains config files for mongoose, passport or any other configs such as middlewares. <br>
`/helper` - contains helper functions for controller. <br>