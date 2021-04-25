<br />
<p align="center">
  <h3 align="center">Relay Django Webapp</h3>

  <p align="center">
    Sample project using a React/Relay frontend and Django/GraphQL backend.
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup">Setup</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="https://github.com/H-Huang/relay-django-webapp/blob/main/assets/README_site_screenshot.PNG?raw=true" height="280">

This is an example project using that uses a React/Relay frontend with a Django/Graphql backend. It contains logic to handle user registration, user authentication, and basic data fetching. There were not a lot of public examples using this combiation of frameworks, so I made this repository to handle this use case.

### Built With

* [Create React App](https://create-react-app.dev/docs/getting-started/)
* [Django](https://www.djangoproject.com/)
* [Graphene-Django](https://docs.graphene-python.org/projects/django/en/latest/)
* [Relay](https://relay.dev/)



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) (Recommended)

OR

Install prerequisites for backend/ (django app) and frontend/ (react app) projects locally.

### Setup
From VSCode

1. Frontend and backend have devcontainer.json so they can easily be started by running a command to "open folder in container" via VSCode. For more details check out the steps for [developing inside a container](https://code.visualstudio.com/docs/remote/containers).

From CLI

1. Start frontend and backend containers
   ```sh
   docker-compose up
   ```
2. Find running containers via 
   ```sh
   docker ps
   ```
   and connect to them.

<!-- USAGE EXAMPLES -->
## Usage
On backend container run:
```sh
python manage.py runserver
```

On frontend container run:
```sh
npm start
```

Site will run on `localhost:3000` and the django admin panel can be accessed via `localhost:8000/admin` and graphiql via `http://localhost:8000/graphql`
