import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

import UIProvider from 'providers/ui/Index';
import OnlineUserProvider from 'providers/onlineUser/Index';
import UserProvider from 'providers/User';
import OfflineUserProvider from 'providers/offlineUser';
import AuthRoute from './Auth';
import PrivateRoute from './Private';
import Article from 'pages/Article';
// import Author from 'pages/Author';
import Connexion from 'pages/Connexion';
import Explore from 'pages/Explore';
import Favorites from 'pages/Favorites';
import Folder from 'pages/Folder';
import Home from 'pages/Home';
import Inscription from 'pages/Inscription';
import Library from 'pages/Library';
import Settings from 'pages/Settings/Index';
import Write from 'pages/Write';
import Writings from 'pages/Writings';

const Routes = (): JSX.Element => (
	<BrowserRouter>
		<UserProvider>
			<OfflineUserProvider>
				<OnlineUserProvider>
					<UIProvider>
						<RouterRoutes>
							<Route path="/" element={<AuthRoute />}>
								<Route path="/" element={<Home />} />
								<Route path="/inscription" element={<Inscription />} />
								<Route path="/connexion" element={<Connexion />} />
							</Route>
							{/* TODO: add OnLigne route to verify that the user is not using offline mode for some specific pages */}
							{/* TODO: and if offline mode, verify that it is working ? It's already done but maybe put logic somewhere else ? */}
							<Route path="/" element={<PrivateRoute />}>
								<Route path="/bibliotheque" element={<Library />} />
								<Route path="/bibliotheque/favoris" element={<Favorites />} />
								<Route path="/bibliotheque/dossiers/:anthologyId" element={<Folder />} />
								<Route path="/redactions" element={<Writings />} />
								<Route path="/ecrire" element={<Write />} />
								<Route path="/explorer" element={<Explore />} />
								<Route path="/articles/:articleId" element={<Article />} />
								{/* <Route path="/auteurs/:userId" element={<Author />} /> */}
								<Route path="/reglages" element={<Settings />} />
							</Route>
							<Route path="*" element={<Navigate replace to="/" />} />
						</RouterRoutes>
					</UIProvider>
				</OnlineUserProvider>
			</OfflineUserProvider>
		</UserProvider>
	</BrowserRouter>
);

export default Routes;
