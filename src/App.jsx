import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Detail from './pages/Detail';
import Dashboard from './pages/Dashboard';
import CreateListing from './pages/CreateListing';
import { ListingsProvider } from './context/ListingsContext';

function App() {
  return (
    <ListingsProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listeler" element={<Listings />} />
              <Route path="/ilanlars/:id" element={<Detail />} />
              <Route path="/panel" element={<Dashboard />} />
              <Route path="/ilan-ver" element={<CreateListing />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ListingsProvider>
  );
}

export default App;
