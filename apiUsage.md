# Rogue Chem API Documentation
Full endpoint documentation with example API calls:

## Files (/)

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

## Courses (/courses)

### Data schema (WIP):
The sections and files attributes contain references to the relevant sections and files for easy searching.

Course:
```
{
    published: Boolean,
    name: String,
    description: String,
    sections: Array,
    files: Array
}
```

Section:
```
{
    course_id: mongoose.ObjectId,
    name: String,
    description: String,
    files: Array
}
```

### POST /courses/create
Creates a new course. Only creates the course, sections and files must be added separately. ```published``` will default to ```false```

Example:
```
curl --request POST \
  --url http://localhost:3030/courses/create \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "",
	"description": ""
}'
```

### GET /courses
Returns array of courses objects.

Example:
```
curl --request GET \
  --url http://localhost:3030/courses/ \
  --header 'Content-Type: application/json'
```

### PUT /courses/addSection
Adds a section to the sections array in a course.

Example: 
```
curl --request PUT \
  --url http://localhost:3030/courses/addSection \
  --header 'Content-Type: application/json' \
  --data '{
	"course_id":"",
	"name": "",
	"description": ""
}'
```

### GET /courses/sections/:id
Returns all the sections for a given course. Requires the course id in the URL.

Example: 
```
curl --request GET \
  --url http://localhost:3030/courses/sections/:id \
```

### GET /courses/files/:id
Returns all the files in a section for a given course. Requires the section id in the URL.

Example: 
```
curl --request GET \
  --url http://localhost:3030/courses/files/:id \
```

### PUT /courses/addFile
Adds a file to the files array in a section. Uses the id to create a reference and the activeSection to target the correct section.

Example: 
```
```

## Users
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

### POST /users/adminCreate
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

### POST /users/studentCreate
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

### POST /users/validateToken
Checks JWT for validity. If valid, returns information on user; if not, returns false.

Example:
```
curl --request POST \
  --url http://localhost:3030/users/validateToken \
  --header 'auth-token: (auth token as string)'
```

### POST /users/login
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