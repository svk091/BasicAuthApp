import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/pages/Landing";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import Users from "./components/pages/Users";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
