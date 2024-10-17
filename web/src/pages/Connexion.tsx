import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { Button, Divider, Input, Link, VStack } from '@chakra-ui/react';

import { useUIContext } from 'contexts/ui';
import PwdInput from 'components/Inputs/PwdInput';

const Connexion = (): JSX.Element => {
	const navigate = useNavigate();
	const ui = useUIContext();
	const [loginInput, setLoginInput] = useState('');
	const [pwdInut, setPwdInut] = useState('');
	const [validation, setValidation] = useState(false);

	useEffect(() => {
		const loginValidation = loginInput.length >= 1;
		const pwdValidation = pwdInut.length >= 1;
		const globalValidation = loginValidation && pwdValidation;

		setValidation(globalValidation);
	}, [loginInput, pwdInut]);

	return (
		<VStack w="100%" align="center">
			<Input
				id="connexion-email-input"
				placeholder="e-mail ou nom d'utilisateur"
				onChange={(e) => setLoginInput(e.target.value)}
				color="white"
			/>
			<PwdInput
				inputId="connexion-pwd-input"
				placeholder="mot de passe"
				onChange={(e) => setPwdInut(e.target.value)}
				color="white"
			/>
			<Button
				id="connexion-connexion-btn"
				variant="primary"
				bg="#4bebf9 !important"
				color="#000f4a"
				isDisabled={!validation}
				onClick={async () =>
					await ui.online.auth.sign.in({ identifier: loginInput, password: pwdInut }, () => navigate('/bibliotheque'))
				}
			>
				Connexion
			</Button>
			<br />
			<Divider />
			<Link id="connexion-inscription-txt" as={RouteLink} to="/inscription" color="white">
				<b>Inscription</b>
			</Link>
		</VStack>
	);
};

export default Connexion;
