# Lab 9

This lab based on [this homework](https://cs.calvin.edu/courses/cs/262/kvlinden/09is/homework.html)

Service at [lab9webapp-cngzg0faamceduh4.eastus-01.azurewebsites.net](lab9webapp-cngzg0faamceduh4.eastus-01.azurewebsites.net)

New Routes

- [lab9webapp-cngzg0faamceduh4.eastus-01.azurewebsites.net/games](lab9webapp-cngzg0faamceduh4.eastus-01.azurewebsites.net/games)
- [lab9webapp-cngzg0faamceduh4.eastus-01.azurewebsites.net/hotels](lab9webapp-cngzg0faamceduh4.eastus-01.azurewebsites.net/hotels)

## Questions

### What are the (active) URLs for your data service?

- "lab9webapp-cngzg0faamceduh4.eastus-01.azurewebsites.net" followed by
  - (GET) "/" (or nothing)
  - (GET) "/players"
  - (GET) "/players/:id"
  - (PUT) "/players/:id"
  - (POST) "/players"
  - (DELETE) "/players/:id"
  - (GET) "/games"
  - (GET) "/hotels"

### Which of these endpoints implement actions that are idempotent? nullipotent?

Any PUT or DELETE endpoints are *idempotent*. Any GET endpoints are *nullipotent*. Any POST endpoints are neither--they are potent operations.

### Is the service RESTful? If not, why not? If so, what key features make it RESTful.

This service is RESTful. It does not store state, it works by communicating JSON 
over HTTP(S), has explicit endpoints which read as nouns, and implements the 
HTTP commands GET, POST, PUT, and DELETE.

### Is there any evidence in your implementation of an impedance mismatch? 

One example is that we would probably store game state in one object in an actual 
application. However, when working with the database, this is really split into 
three tables: one for the players, one for the games, and one for a players state 
in a game. That object may have references to the player, but the database has to 
keep the information in such a way that we have to par down the cross product 
with `WHERE gameid = game.id` and so on to get what we might actually use in the 
client software.

