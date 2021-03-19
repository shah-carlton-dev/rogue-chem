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

