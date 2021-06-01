# Rogue Chem's E-Learning Website

This website aims to take advantage of the MERN stack to deliver learning materials from Rogue Chem, LLC to paying subscribers.

## Initial setup
Use npm to install dependencies (make sure you do so in the `app` and `server` directories). 
```bash
npm install
```
In the off chance that does not work, you may also try...
```bash
npm update
```

## Components
The program has been broken down into components. Their organization is outlined below.

#### Components Logic (WIP)
```
├── Header
├── Footer
├── {Login}
│   ├── LoginSignup
│   │   ├── Login
│   │   └── Signup
└── {Dashboard}
    └── HomeRouter
        ├── Home
        │   ├── UserCourses
        │   │   ├── CourseInfo
        │   │   ├── FolderInfo
        │   │   ├── FileInfo
        │   │   └── PreviewRender
        │   ├── AdminCourses
        ├── Messages
        ├(admin)
        ├── CourseManagement
        ├── FileManagement
        │   ├── FileUpload
        │   ├── VideoUpload
        ├── SampleRender
        ├── AdminProgress
        ├── AdminStats
        ├(student)
        ├── ProfileManagement
        └── UserProgress
```
#### File Structure (WIP)
```
├── AdminDash
│   ├── AdminCourses.jsx
│   ├── AdminProgress.jsx
│   └── AdminStats.jsx
├── CourseManagement
│   ├── CourseCard.jsx
│   ├── CourseCreateModal.jsx
│   ├── CourseManagement.jsx
│   ├── FileDisplay.jsx
│   ├── FileLibrary.jsx
│   ├── FileList.jsx
│   ├── SectionCard.jsx
│   ├── SectionCreateModal.jsx
│   ├── SectionsList.jsx
│   ├── VideoLibrary.jsx
│   └── VideoList.jsx
├── Dashboard
│   ├── Home.jsx
│   ├── HomeRouter.jsx
│   ├── Messages.jsx
│   └── Sidebar.jsx
├── FileManagement
│   ├── FileManagement.jsx
│   ├── FileUpload.jsx
│   └── VideoUpload.jsx
├── Login
│   ├── Login.jsx
│   ├── LoginSignup.jsx
│   └── Signup.jsx
├── UserDash
│   ├── Courses
│   │   ├── CourseInfo.jsx
│   │   ├── FileInfo.jsx
│   │   ├── FolderInfo.jsx
│   │   ├── PreviewRender.jsx
│   │   ├── SectionCard.jsx
│   │   └── UserCourses.jsx
│   ├── ProfileManagement.jsx
│   └── UserProgress.jsx
├── VideoRender
│   ├── PDFView.jsx
│   ├── SampleRender.jsx
│   └── VideoView.jsx
├── Footer.jsx
└── Header.jsx
```

## Development Mode
To run the app make sure you're in the `app` directory then enter the following command in the terminal. This will run the app on `localhost:3000`.
```bash
npm start
```

To run the backend, move to the `server` directory in a separate terminal, and enter the following command. The server will run on `localhost: 3030`.
```bash
npm start
```

## Contributors
- Rushil Shah
- Mac Carlton

