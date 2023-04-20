/** @jsxImportSource @emotion/react */
import './App.css';
import * as React from 'react'
import {Routes, Navigate, Route, BrowserRouter} from 'react-router-dom'
import {DashboardScreen} from './screens/dashboard.js'

// function Overlay() {
//   return (
//     <div 
//       style={{ 
//         position: 'absolute', 
//         top: 0, 
//         left: 0, 
//         pointerEvents: 'none',  
//         width: '100%', 
//         height: '100%' 
//       }}
//     >
//       <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>good —</div>
//       <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>10/15/2021</div>
//     </div>
//   )
// }

function App() {
  return (
    <div 
      className="App"
      css={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}  
    >
      <div>
        <BrowserRouter>
          <AppRoutes/>
          {/* <Overlay/> */}
        </BrowserRouter>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<DashboardScreen/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default App;
