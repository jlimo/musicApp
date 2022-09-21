
import 'bootstrap/dist/bootstrap/css/bootstrap.min.css'
import Login from './login';
import Dashboard from './dashboard';

const code = new URLSearchParams(window.location.search).get
('code')

function App() {
  return code ? <Dashboard code={code} /> : <Login />
 
}

export default App;
