import Toolbar from './components/Toolbar';
import SettingBar from './components/SettingBar';
import Canvas from './components/Canvas';
import './styles/app.scss';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router'

function App() {
  return (
    <BrowserRouter>
  <div className="app">
    <Routes>
      <Route path="/" element={<Navigate to={`f${(+new Date).toString(16)}`} replace />} />
      <Route path="/:id" element={
        <>
          <Toolbar />
          <SettingBar />
          <Canvas />
        </>
      } />
    </Routes>
  </div>
</BrowserRouter>
  );
}

export default App;
