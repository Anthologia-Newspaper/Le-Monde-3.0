import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { Button, Input, Link } from '@chakra-ui/react';

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
		<>
			<Input
				id="connexion-email-input"
				variant="primary"
				placeholder="e-mail ou nom d'utilisateur"
				onChange={(e) => setLoginInput(e.target.value)}
			/>
			<PwdInput
				inputId="connexion-pwd-input"
				variant="primary"
				placeholder="mot de passe"
				onChange={(e) => setPwdInut(e.target.value)}
			/>
			<Button
				id="connexion-connexion-btn"
				variant="primary-yellow"
				isDisabled={!validation}
				onClick={async () =>
					await ui.online.auth.sign.in({ identifier: loginInput, password: pwdInut }, () => navigate('/bibliotheque'))
				}
			>
				Connexion
			</Button>
			<Link as={RouteLink} to="/inscription" w="100%">
				<Button id="connexion-inscription-btn" variant="primary-white">
					Inscription
				</Button>
			</Link>
		</>
	);
};

export default Connexion;
