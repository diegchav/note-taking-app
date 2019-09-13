# Note taking app

Cli application for storing, deleting and reading notes.

## Requirements

- NodeJS
- MongoDB

## Setting the project

Clone the proyect:

```
git clone https://github.com/diegchav/note-taking-app.git
```

Create an .env file in the root directory with the following content:

```
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_HOSTNAME=
MONGO_PORT=
MONGO_DB=
```

Set the values according to your MongoDB credentials.

## Running MongoDB in a docker container

If you don't have MongoDB installed or don't have an account in a service like MongoDB Atlas, you can run an instance
of MongoDB for testing purposes with the following command:

```
docker run -d -p 27017:27017 --name mongodb mongo
```

And then you can connect to the DB using the cli:

```
docker exec -it mongodb bash

root@# mongo

> show dbs;
```

**NOTE:** Data will be deleted after the container is stopped and/or removed.

## Usage

```
$ node app.js list
There are currently no notes

$ node app.js add --title 'React 101' --body 'Introduction to react'
Added new note:  {"_id":"5d72ae7bc75f0d22a73d6967","title":"React 101","body":"Introduction to react","createdAt":"2019-09-06T19:07:39.998Z","__v":0}

$ node app.js read --title 'React'
Title doesn't exist

$ node app.js read --title 'React 101'
{
  "_id": "5d72ae7bc75f0d22a73d6967",
  "title": "React 101",
  "body": "Introduction to react",
  "createdAt": "2019-09-06T19:07:39.998Z",
  "__v": 0
}

$ node app.js remove --title 'React'
Title doesn't exist

$ node app.js remove --title 'React 101'
Successfully delete note

$ node app.js list
There are currently no notes
```

## Running MongoDB in a docker container
