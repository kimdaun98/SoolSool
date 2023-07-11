import React from 'react';
import './css//App.css';
import './css/writing.css'
import './css/Login.css'
import './css/Archive.css'
import './css/Main.css'
import './css/Header.css'
import './css/Info.css'
import './css/Community.css'
import './css/ArchiveSingle.css'
import './css/api.css'


import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Archive from './components/Archive';
import Info from './components/Info';
import Login from './components/Login';
import CommunityWriting from './components/CommunityWriting';
import Community from './components/Community';
import Main from './components/Main.jsx';
import Join from './components/Join';
import MyPage from './components/MyPage';
import MyArchive from './components/MyArchive';
import InfoSingle from './components/InfoSingle';
import Recommendation from './components/Recommendation';
import ArchiveWriting from './components/ArchiveWriting';
import CommunitySingle from './components/CommunitySingle';
import ArchiveSingle from './components/ArchiveSingle';
import Api from './components/Api';


const App = () => {
  return (
    <div>
      <Header />
      
      <Routes>
        
        <Route path='/' element={<Main />} /> {/* 메인 컴포넌트를 루트 경로로 설정합니다. */}
        <Route path="/Archive" element={<Archive />} />
        <Route path="/ArchiveWriting" element={<ArchiveWriting/>}/>
        <Route path="/ArchiveSingle/:arc_idx" element={<ArchiveSingle/>}/>
        <Route path="/Community" element={<Community />} />
        <Route path="/CommunitySingle/:comm_idx" element={<CommunitySingle />} />
        <Route path="/CommunityWriting" element={<CommunityWriting />} />
        <Route path="/info" element={<Info />} />
        <Route path="/InfoSingle/:liq_idx" element={<InfoSingle />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyArchive" element={<MyArchive />} />
        <Route path="/Recommendation" element={<Recommendation/>}></Route>
        <Route path="/Api" element={<Api/>}></Route>

      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;
