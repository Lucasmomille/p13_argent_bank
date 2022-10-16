import './assets/css/index.css'
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from './utils/protectedRoute';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const User = lazy(() => import('./pages/User'))

function App() {
	
	return (
		<Provider store={store}>
			<Router >
				<Suspense fallback={<p>Loading...</p>}>
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/user" element={
						<ProtectedRoute>
							<User />
						</ProtectedRoute>
					}>
					</Route>
					{/* <Route path="/user" element={<User/>} /> */}
					<Route path="*" element={<Login/>} />
				</Routes>
				</Suspense>
			</Router>
		</Provider>
	);
}

export default App;
