import Pages from "./pages";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout";

function App() {
  return (
    <div className="app">
      <Router>
        <Layout>
          <Pages />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
