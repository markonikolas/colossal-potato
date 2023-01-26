import { Routes, Route } from 'react-router-dom';

import Header from './components/Layout/Header';
import RequireAuth from './components/Auth/RequireAuth';

import Home from './pages/Home';
import Blog from './pages/Blog/Blog';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
	return (
		<>
			<Header logo={'MyBlog'} />
			<Routes>
				<Route index path='/' element={<Home />} />
				<Route index path='/blog' element={<Blog />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route
					path='/dashboard'
					element={
						<RequireAuth>
							<Dashboard />
						</RequireAuth>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
