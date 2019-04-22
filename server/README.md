This project uses the ff technologies/framework:

- NodeJs / Koa framework
- NodeCache for in memory cache
- Got for API service requests
- Joi for schema validation
- Lodash

How to run the the project

- rename .env.example to .env, which will be used by the project
- npm install
- npm run dev

Server will run at localhost:3000
Example of an API url you can use. All Entity types are based from here https://developer.marvel.com/docs

- http://localhost:3000/marvel/{entity_type}
  How to use/example:
- http://localhost:3000/marvel/comics
- http://localhost:3000/marvel/events
- http://localhost:3000/marvel/characters
- http://localhost:3000/marvel/creators

How to run tests

- npm run test

Functions are documented and pretty straightforward
