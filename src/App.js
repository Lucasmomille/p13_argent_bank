import './assets/css/index.css'
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'));
const Signin = lazy(() => import('./pages/Signin'));
const User = lazy(() => import('./pages/User'))

function App() {
	return (
		<Router >
			<Suspense fallback={<p>Loading...</p>}>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/signin" element={<Signin/>} />
				<Route path="/user" element={<User/>} />
			</Routes>
			</Suspense>
		</Router>
	);
}

export default App;
