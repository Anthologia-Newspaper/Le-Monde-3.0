import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, HStack, Input, InputGroup, InputRightElement, Link, Text, VStack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, SpinnerIcon } from '@chakra-ui/icons';

import { useOfflineUserContext } from 'contexts/offlineUser';

const Step1 = ({ setActiveStep }: { setActiveStep: (v: number) => void }): JSX.Element => {
	const offlineUser = useOfflineUserContext();
	const [isGatewayWorking, setIsGatewayWorking] = useState<true | false | 'loading'>(false);
	const [timeLeft, setTimeLeft] = useState(0);

	const testGateway = async () => {
		setTimeLeft(30);
		try {
			setIsGatewayWorking('loading');
			const test = await offlineUser.methods.config.testGateway();
			setIsGatewayWorking(test);
		} catch (error) {
			setIsGatewayWorking(false);
			console.error(error);
		}
	};

	useEffect(() => {
		testGateway();
	}, [offlineUser.data.config.gateway]);

	useEffect(() => {
		if (timeLeft === 0) return;
		const intervalId = setInterval(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);
		return () => clearInterval(intervalId);
	}, [timeLeft]);

	return (
		<>
			<VStack align="start" w="100%" spacing="24px">
				<VStack align="start" w="100%">
					<Text variant="h6">
						Qu'est ce qu'une <i>gateway</i> IPFS ?
					</Text>
					<Text variant="p" textAlign="justify">
						Une <i>gateway</i> signifie "porte" en anglais. Pour accèder à IPFS, vous devez donc préciser une porte
						d'entrée à ce réseau. Vous avez deux options: choisir une <i>gateway</i> publique ou bien choisir votre{' '}
						<i>gateway</i> privée.
					</Text>
					<Text variant="p" textAlign="justify">
						Une <i>gateway</i> publique est un point d'accès publique à IPFS: d'autres personnes peuvent utiliser la
						même porte et ce n'est pas vous qui êtes responsable de la maintenir ouverte. Il est donc plus facile
						d'utiliser une <i>gateway</i> publique qu'une <i>gateway</i> privée. Cependant, une <i>gateway</i> publique
						n'est pas la plus rapide d'accès à IPFS et peut facilement être censurée. Il n'est également pas rare qu'une{' '}
						<i>gateway</i> ne soit plus accessible par certain moments: ce n'est pas vous qui la maintenez ouverte.
					</Text>
					<Text variant="p" textAlign="justify">
						Pour avoir une liste de <i>gateways</i> publiques, cliquez{' '}
						<Link href="https://ipfs.github.io/public-gateway-checker/" isExternal>
							<b>
								<u>ici</u>
							</b>
						</Link>
						.
					</Text>
					<Text variant="p" textAlign="justify">
						Une <i>gateway</i> privée en revanche est un point d'accès privé à IPFS: seul vous pouvez utiliser cette
						porte. Vous êtes alors responsable de la maintenir ouverte. Pour ce faire, vous devez faire tourner un noeud
						IPFS sur votre ordinateur. Il est donc légèrement plus difficile d'utiliser une <i>gateway</i> privée qu'une{' '}
						<i>gateway</i> publique. Cependant, une <i>gateway</i> privée est plus rapide (vous êtes le seul
						utilisateur) et ne peut pas être censurée. Vous et seulement vous décidez d'ouvrir ou fermer la porte.
					</Text>
					<Text variant="p" textAlign="justify">
						Pour comprendre comment faire tourner un noeud IPFS, cliquez{' '}
						<Link href="https://docs.ipfs.tech/how-to/desktop-app/#install-ipfs-desktop" isExternal>
							<b>
								<u>ici</u>
							</b>
						</Link>
						.
					</Text>
				</VStack>
				<VStack align="start" w="100%" spacing="16px">
					<Text variant="link">
						Tester une <i>gateway</i> IPFS
					</Text>
					<Text variant="p" textAlign="justify">
						Si vous utilisez une <i>gateway</i> publique, renseignez son url. Si vous utilisez une <i>gateway</i>{' '}
						privée, renseigner le point d'accès de votre noeud IPFS (trouvable dans les réglages).
					</Text>
					{/* TODO: redirect here if there is an IPFS problem somewhere else */}
					<InputGroup>
						<Input
							variant="primary-1"
							placeholder="https://ipfs.io"
							value={offlineUser.data.config.gateway}
							onChange={(e) => offlineUser.methods.config.setGateway(e.target.value)}
						/>
						<InputRightElement w={isGatewayWorking === 'loading' ? '80px' : '48px'}>
							{isGatewayWorking === 'loading' ? (
								<HStack>
									<Text variant="link">{timeLeft}s</Text>
									<SpinnerIcon color="orange" />
								</HStack>
							) : isGatewayWorking ? (
								<CheckIcon color="green.500" />
							) : (
								<CloseIcon color="red.500" />
							)}
						</InputRightElement>
					</InputGroup>
				</VStack>
			</VStack>
			<HStack w="100%" justify="space-between">
				<Button variant="primary-purple" maxW="240px" onClick={() => setActiveStep(0)}>
					Précédent
				</Button>
				<Button variant="primary-purple" maxW="240px" onClick={() => setActiveStep(2)} isDisabled={!isGatewayWorking}>
					Suivant
				</Button>
			</HStack>
		</>
	);
};

export default Step1;
