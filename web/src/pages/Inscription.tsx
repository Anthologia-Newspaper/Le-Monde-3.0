import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { Button, Divider, Link, VStack } from '@chakra-ui/react';

import { useUIContext } from 'contexts/ui';
import FormInput from 'components/Inputs/FormInput';
import PwdInput from 'components/Inputs/PwdInput';
import emailRegex from 'utils/emailRegex';

const Inscription = (): JSX.Element => {
	const navigate = useNavigate();
	const ui = useUIContext();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [pwd, setPwd] = useState('');
	const [confirmedPwd, setConfirmedPwd] = useState('');
	const [validation, setValidation] = useState({
		valid: false,
		details: {
			email: { value: false, message: 'Email non renseigné.' },
			username: { value: false, message: "Nom d'utilisateur non renseigné." },
			pwd: { value: false, message: 'Mot de passe non renseigné.' },
			confirmedPwd: { value: false, message: 'Confirmation du mot de passe non renseignée.' },
		},
	});

	useEffect(() => {
		const emailValidation = emailRegex.test(email);
		const usernameValidation = username.length >= 3;
		const pwdValidation = pwd.length >= 5;
		const confirmedPwdValidation = pwd === confirmedPwd;
		const globalValidation = emailValidation && usernameValidation && pwdValidation && confirmedPwdValidation;

		setValidation({
			valid: globalValidation,
			details: {
				email: { value: emailValidation, message: emailValidation ? '' : 'Email non valide.' },
				username: { value: usernameValidation, message: usernameValidation ? '' : "Nom d'utilisateur trop court." },
				pwd: { value: pwdValidation, message: pwdValidation ? '' : 'Mot de passe trop court.' },
				confirmedPwd: {
					value: confirmedPwdValidation,
					message: confirmedPwdValidation ? '' : 'Mots de passe différents.',
				},
			},
		});
	}, [email, username, pwd, confirmedPwd]);

	return (
		<VStack align="center" w="100%">
			<FormInput
				inputId="inscription-email-input"
				isError={email !== '' && !validation.details.email.value}
				errorMessage={validation.details.email.message}
				variant="primary"
				placeholder="e-mail"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<FormInput
				inputId="inscription-username-input"
				isError={username !== '' && !validation.details.username.value}
				errorMessage={validation.details.username.message}
				variant="primary"
				placeholder="nom d'utilisateur"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<PwdInput
				inputId="inscription-pwd-input"
				isError={pwd !== '' && !validation.details.pwd.value}
				errorMessage={validation.details.pwd.message}
				variant="primary"
				placeholder="mot de passe"
				onChange={(e) => setPwd(e.target.value)}
			/>
			<PwdInput
				inputId="inscription-confirmed-pwd-input"
				isError={confirmedPwd !== '' && !validation.details.confirmedPwd.value}
				errorMessage={validation.details.confirmedPwd.message}
				variant="primary"
				placeholder="confirmation du mot de passe"
				onChange={(e) => setConfirmedPwd(e.target.value)}
			/>
			<Button
				id="inscription-inscription-btn"
				variant="primary"
				bg="#4bebf9 !important"
				color="#000f4a"
				isDisabled={!validation.valid}
				onClick={async () =>
					await ui.online.auth.sign.up({ email, username, password: pwd }, () => navigate('/bibliotheque'))
				}
			>
				Inscription
			</Button>
			<br />
			<Divider />
			<Link id="inscription-connexion-txt" as={RouteLink} to="/connexion" color="white">
				<b>Connexion</b>
			</Link>
		</VStack>
	);
};

export default Inscription;
