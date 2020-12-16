import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'




ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Switch>
				<Route path='/' component={<App />} />
			</Switch>
		</Router>

	</React.StrictMode>,
	document.getElementById('root')
);
