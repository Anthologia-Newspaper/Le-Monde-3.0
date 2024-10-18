import * as React from 'react';
import { Button, Divider, Link, Text } from '@chakra-ui/react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';

import { useUserContext } from 'contexts/user';

const Home = (): JSX.Element => {
	const navigate = useNavigate();
	const { data, methods } = useUserContext();

	const enterOfflineMode = async () => {
		if (!data.isOffline) methods.toggleIsOfflineState();
		navigate('/reglages');
	};

	return (
		<>
			<Text color="white">
				Utilisez Anthologia <b>en ligne</b> pour publier des articles.
			</Text>
			<Link as={RouteLink} to="/connexion" w="100%">
				<Button id="home-connexion-btn" variant="primary" bg="#4bebf9 !important" color="#000f4a">
					Connexion
				</Button>
			</Link>
			<Link as={RouteLink} to="/inscription" w="100%">
				<Button
					id="home-inscription-btn"
					variant="outline-primary"
					color="#4bebf9 !important"
					borderColor="#4bebf9 !important"
					bg="#000f4a"
				>
					Inscription
				</Button>
			</Link>
			<br />
			<Divider />
			<Text color="white" cursor="pointer" onClick={enterOfflineMode}>
				Utilisez Anthologia <b>hors-ligne</b> pour lire dans un État censuré.
			</Text>
		</>
	);
};

export default Home;
