import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import SemesterFolders from './components/Semesterfolders';
import SubjectList from './components/SubjectList';
import NoteList from './components/NoteList';
import UploadNote from './components/UploadNote';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/semesters" element={<SemesterFolders />} />
        <Route path="/subjects/:sem" element={<SubjectList />} />
        <Route path="/notes" element={<NoteList />} />
        <Route path="/upload" element={<UploadNote />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
