## Components
The program has been broken down into components. Their organization is outlined below.
#### Components Logic
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
#### Components File Structure
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