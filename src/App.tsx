import { Route, Routes } from "react-router-dom";
import Root from "./pages/Root";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default App;
