import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';

import { useOnlineUserContext } from 'contexts/onlineUser';
import { useUIContext } from 'contexts/ui';
import FormInput from 'components/Inputs/FormInput';
import PwdInput from 'components/Inputs/PwdInput';

const Profil = (): JSX.Element => {
	const ui = useUIContext();
	const onlineUser = useOnlineUserContext();
	const navigate = useNavigate();
	const [email, setEmail] = useState(onlineUser.data.email);
	const [username, setUsername] = useState(onlineUser.data.username);
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	return (
		<>
			<Text variant="link">Nom d'utilisateur</Text>
			<HStack w="100%">
				<FormInput
					value={username}
					inputId="password-input-10"
					w="100%"
					placeholder="Nouveau nom d'utilisateur"
					onChange={(e) => setUsername(e.target.value)}
					isError={false}
					errorMessage=""
				/>
				<Button
					// TODO: callback
					onClick={async () => await ui.online.user.update.username(username)}
				>
					Modifier
				</Button>
			</HStack>
			<Text variant="link">Email</Text>
			<HStack w="100%">
				<FormInput
					value={email}
					inputId="password-input-11"
					w="100%"
					placeholder="Nouveau nom d'utilisateur"
					onChange={(e) => setEmail(e.target.value)}
					isError={false}
					errorMessage=""
				/>
				<Button
					// TODO: callback
					onClick={async () => await ui.online.user.update.email(email)}
				>
					Modifier
				</Button>
			</HStack>
			<Text variant="link">Mot de passe</Text>
			<PwdInput
				value={password}
				inputId="password-input-12"
				w="100%"
				placeholder="Mot de passe"
				onChange={(e) => setPassword(e.target.value)}
				isError={false}
				errorMessage=""
			/>
			<PwdInput
				value={newPassword}
				inputId="new-password-input"
				w="100%"
				placeholder="Nouveau mot de passe"
				onChange={(e) => setNewPassword(e.target.value)}
				isError={false}
				errorMessage=""
			/>
			<Button
				// TODO: callback
				onClick={async () => await ui.online.user.update.password({ oldPassword: password, newPassword })}
			>
				Modifier
			</Button>
			<VStack w="100%" align="center" mt="auto">
				<Divider />
				<Text cursor="pointer" onClick={async () => await ui.online.auth.sign.out(() => navigate('/'))}>
					Déconnexion
				</Text>
			</VStack>
		</>
	);
};

export default Profil;
