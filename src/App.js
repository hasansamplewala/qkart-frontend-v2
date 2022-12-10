import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Products} />
      <Route path="/register" component={Register} />
      </Switch>
      
    </div>
    
  );
}

export default App;
//  curl -X POST -H "Content-Type: application/json" -d '{"username": "linuxize", "password": "linuxize@example.com"}' http://13.127.38.27:8082/api/v1/auth/register