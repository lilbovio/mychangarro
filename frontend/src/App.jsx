import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import BusinessReview from './pages/BusinessReview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/review/:id" element={<BusinessReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
