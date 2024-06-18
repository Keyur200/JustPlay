import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Toaster } from 'react-hot-toast'
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import CreateVideo from './Pages/CreateVideo';
import VideoDetail from './Pages/VideoDetail';
import Trending from './Pages/Trending';
import Gaming from './Pages/Gaming';
import Subscription from './Pages/Subscription';
import ChannelDetails from './Pages/ChannelDetails';
import Shopping from './Pages/Shopping';
import Music from './Pages/Music';
import Films from './Pages/Films';
import News from './Pages/News';
import Sport from './Pages/Sport';
import Fashion_beauty from './Pages/Fashion_beauty';
import Podcasts from './Pages/Podcasts';
import Error404 from './Pages/Error404';
function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/uploadvideo' element={<CreateVideo />} />
          <Route path='/video/:slug' element={<VideoDetail />} />
          <Route path='/subscriptions' element={<Subscription  />} />
          <Route path='/channel/:id' element={<ChannelDetails  />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/gaming' element={<Gaming />} />
          <Route path='/shopping' element={<Shopping />} />
          <Route path='/music' element={<Music />} />
          <Route path='/films' element={<Films />} />
          <Route path='/news' element={<News />} />
          <Route path='/sport' element={<Sport />} />
          <Route path='/fashion_beauty' element={<Fashion_beauty />} />
          <Route path='/podcasts' element={<Podcasts />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
