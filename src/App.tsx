import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './layouts/Auth';
import Dashboard from './layouts/Dashboard';

type Props = {};

const App: React.FC<Props> = () => {
  return (
		<div className='font-poppins'>
			<Router>
				<Routes>
					<Route path='/auth/*' element={<Auth />} />
					<Route path='/dashboard/*' element={<Dashboard />} />
					<Route path='*' element={<Navigate replace to='/dashboard' />} />
					{/* <Route path='*' element={<Navigate replace to='/' />} /> */}
				</Routes>
			</Router>
		</div>
	)
}

export default App;