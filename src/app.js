const express = require("express");
const cors = require("cors");
const { uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = req.body;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  const repository = {
    id, title, url, techs, likes: repositories[findRepositoryIndex].likes
  }

  if(findRepositoryIndex === -1){
    response.status(400).json({error: 'Repository does not exists'});
  }

  repositories[findRepositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(findRepositoryIndex >= 0){
    repositories.splice(findRepositoryIndex, 1);
  }else{
    response.status(400).json({error: 'Repository does not exists'});
  }

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(findRepositoryIndex === -1){
    response.status(400).json({error: 'Repository does not exists'});
  }

  repositories[findRepositoryIndex].likes += 1;

  return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
