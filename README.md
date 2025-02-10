# kobo-mock-api

a simple server to provide mock data, to be used in personal projects.

the data contained so far is

- items
  a list of magical items like in a TTRPG

# installation

npm i

# running the server

node server.js // runs on [localhost:3000](http://localhost:3000/)

GET /api/data Returns all items, supports filters (name, type, rarity, tag, minPrice, maxPrice).
