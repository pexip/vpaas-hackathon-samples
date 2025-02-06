import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import { CreateMeeting } from './CreateMeeting/CreateMeeting'
import { Meeting } from './Meeting/Meeting'

import './App.css'

export const App = (): JSX.Element => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to={'/create-meeting'} />} />
          <Route path="/create-meeting" element={<CreateMeeting />} />
          <Route path="/meetings/:meetingId" element={<Meeting />} />
        </Routes>
      </Router>
    </div>
  )
}
