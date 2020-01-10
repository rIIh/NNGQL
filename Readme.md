## Todos [NextJS GraphQL]

Todos 

An application used as NextJS+GraphQL template

Used packages:
- **fastify**
- **fastify-gql** + **graphql-jit**
- **typeorm** with **type-graphql**
- **NextJS** + custom server on **express**


## Project Status

This project is currently in development. Users can perform simple CRUD operations with todos. Animations is in progress.

## Project Demo

[ LINK ]

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

`git clone https://github.com/rIIh/todos.git`

Installation:

`cd todos`
`npm install` will install dependencies in root directory and in client, server subdirectories.

To Start Application:

`npm run build` to build Next pages
`npm start` will start Server and Client concurrently

To watch changes in Client and Server:

`npm run dev`

To Visit Web Client:

`localhost:3000`

To Access GraphQL Playground: 

`localhost:4000/playground`

## Reflection

I was need some template for easy install of new web application projects

So here is mine Todos example project

There was problem with JIT compilation. And I figured out that you have to not name your queries and mutations with JS/TS reserved names.