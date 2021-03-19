# API Documentation
Full endpoint documentation along with example API calls:

## Files 

### Data scheme (WIP):
```
{
    title: "".
    description: "",
    file_path: "".
    file_mimetype: ""
}
```
### GET /getAllFiles
Returns JSON object of files collection.  This does not send the actual file. 

Example:
```
  const { data } = await axios.get(`${API_URL}/getAllFiles)
```
### GET /download/:id
Locates file on server by mongoDb id and returns it.

Example: 
```
  const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: 'blob'
      });
```
### DELETE /deleteOneFile/:id
Deletes specified file from files collection and the server.

Example: 
```
  await axios.delete(`${API_URL}/deleteOneFile/${id}`);
```
### DELETE /deleteAllFiles
Deletes all stored files on server and drops the files collection.

This feature is only available in local development.

Example: 
```
  await axios.delete(`${API_URL}/deleteAllFiles`);
```
### POST /upload
Uploads a single file to the server and stores file information in files collection.

Example:
```
 await axios.post(`${API_URL}/upload`, 
    {
      file: file_variable,
      title: "cool image",
      description: "it is very cool"
    }, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
 });
```

## USERS
### Data schema:
```
admin: {
    username: String,
    password: String,
    email: String,
    fname: String,
    lname: String,
    courses: Array,
    messages: Array
}
```
```
student: {
    username: String,
    password: String,
    email: String,
    fname: String,
    lname: String,
    courses: Array,
    messages: Array,
    starredSections: Array,
    starredFiles: Array,
    bookmarkedFiles: Array,
    completedSections: Array,
    completedFiles: Array
}
```

## POST /users/adminCreate
Creates a new admin user. This will only be accessible by a direct request.

Example:
```
  curl -X POST -H "Content-Type: application/json" -d 
  '{
    "username":"", 
    "password":"",     
    "email":"", 
    "fname":"", 
    "lname":"", 
    "courses":[""],
    "messages":[""]
  }' http://localhost:3030/users/adminCreate
```

## POST /users/studentCreate
Creates a new student profile. Do not need to include any information beyond profile info.

Example:
```
curl --request POST \
  --url http://localhost:3030/users/studentCreate \
  --header 'Content-Type: application/json' \
  --data '{
      "username": "",
      "password": "",
      "email": "",
      "fname": "",
      "lname": ""
    }'
```

## POST /users/validateToken
Checks JWT for validity. If valid, returns information on user; if not, returns false.

Example:
```
curl --request POST \
  --url http://localhost:3030/users/validateToken \
  --header 'auth-token: (auth token as string)'
```

## POST /users/login
Logs a user in by username and password. Returns user info and JWT if successful.

Example:
```
curl --request POST \
  --url http://localhost:3030/users/login \
  --header 'Content-Type: application/json' \
  --data '{
      "username": "",
      "password": ""
    }'
```