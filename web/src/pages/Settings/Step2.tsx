import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, SpinnerIcon } from '@chakra-ui/icons';

import { useOfflineUserContext } from 'contexts/offlineUser';

const Step2 = ({ setActiveStep }: { setActiveStep: (v: number) => void }): JSX.Element => {
	const offlineUser = useOfflineUserContext();
	const [isRefreshWorking, setIsRefreshWorking] = useState<true | false | 'loading'>(false);
	const [timeLeft, setTimeLeft] = useState(0);

	// TODO: Annoying as it needs to be executed each refresh
	const refresh = async () => {
		setTimeLeft(30);
		try {
			setIsRefreshWorking('loading');
			const load = await offlineUser.methods.articles.loadCatalog();
			console.log(offlineUser.articlesCatalog);
			setIsRefreshWorking(load);
		} catch (error) {
			setIsRefreshWorking(false);
			console.error(error);
		}
	};

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
					<Text variant="h6">Récupérer les données sur IPFS</Text>
					<Text variant="p" textAlign="justify">
						Maintenant que vous avez accès à IPFS, il est temps de récupérer les articles publiés étants stockés sur
						IPFS. Pour ce faire, il vous suffit de cliquer sur le bouton "Rafraîchir" ci-dessous.
					</Text>
					<Text variant="p" textAlign="justify">
						Pour rester à jour, il vous est conseillé de rafraîchir les données à chaque connexion ou bien toutes les
						heures si vous restez connecté longtemps.
					</Text>
					<Text variant="p" textAlign="justify">
						Notez que cette action ne récupère pas le contenu des articles, mais leurs titres, catégories, dates, etc
						... Le contenu d'un article sera récupéré uniquement lorsqu'il sera nécéssaire afin de fluidifier au maximum
						votre interaction avec Anthologia.
					</Text>
				</VStack>
				<VStack align="start" w="100%" spacing="8px">
					<Button
						onClick={refresh}
						isDisabled={isRefreshWorking === 'loading'}
						isLoading={isRefreshWorking === 'loading'}
					>
						Rafraîchir
					</Button>
					{isRefreshWorking === 'loading' ? (
						<HStack>
							<Text variant="p" color="orange !important">
								Rafraîchissement en cours, {timeLeft}s
							</Text>
							<SpinnerIcon color="orange" />
						</HStack>
					) : isRefreshWorking ? (
						<HStack>
							<Text variant="p" color="green !important">
								Rafraîchissement réussi !
							</Text>
							<CheckIcon color="green.500" />
						</HStack>
					) : (
						<HStack>
							<Text variant="p" color="red !important">
								Rafraîchissement échoué, re-testez votre gateway.
							</Text>
							<CloseIcon color="red.500" />
						</HStack>
					)}
				</VStack>
			</VStack>
			<HStack w="100%" justify="space-between">
				<Button maxW="240px" onClick={() => setActiveStep(1)}>
					Précédent
				</Button>
				<Button maxW="240px" onClick={() => setActiveStep(4)} isDisabled={!isRefreshWorking}>
					Suivant
				</Button>
			</HStack>
		</>
	);
};

export default Step2;
