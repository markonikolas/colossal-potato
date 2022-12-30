import { Routes, Route } from 'react-router-dom';

import Header from './components/Layout/Header';

import Blog from './pages/Blog/Blog';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {

	return (
		<>
			<Header logo={'AwesomeBlog'} />
			<Routes>
				<Route path='/' element={<Blog />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</>
	);
}

export default App;
