import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";
import "./App.scss";
import { useUserDetails } from "./hooks/useUser";
import { SocketProvider } from "./contexts/SocketContext";

function App() {
  const { data: user, isLoading } = useUserDetails();

  console.log("==== APPP ", user);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <SocketProvider>
      <Router>
        <Routes>
          {/* Redirect to login if no user is found */}
          {!user && <Route path="*" element={<Navigate to="/login" />} />}
          {/* Public route for login */}
          <Route path="/login" element={<Login />} />
          {/* Private routes for logged-in users */}
          {user && (
            <>
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/game" element={<Game />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/lobby" />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
