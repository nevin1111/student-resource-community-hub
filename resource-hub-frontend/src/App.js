import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import SemesterFolders from './components/Semesterfolders';
import SubjectList from './components/SubjectList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/semesters" element={<SemesterFolders />} />
        <Route path="/subjects" element={<SubjectList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
