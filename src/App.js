import Register from "./components/Register";
import ipConfig from "./ipConfig.json";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
          <Register />
    </div>
  );
}

export default App;


//  curl -X POST -H "Content-Type: application/json" -d '{"username": "linuxize", "password": "linuxize@example.com"}' http://13.127.38.27:8082/api/v1/auth/register