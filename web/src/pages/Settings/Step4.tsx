import * as React from 'react';
import { Button, HStack, Input, Stack, Text, VStack, useToast } from '@chakra-ui/react';

import { useUserContext } from 'contexts/user';
import { useOfflineUserContext } from 'contexts/offlineUser';
import { useUIContext } from 'contexts/ui';

const Step3 = ({ setActiveStep }: { setActiveStep: (v: number) => void }): JSX.Element => {
	const ui = useUIContext();
	const user = useUserContext();
	const offlineUser = useOfflineUserContext();
	const toast = useToast();

	const downloadProfil = () => {
		const element = document.createElement('a');
		const file = new Blob([JSON.stringify(offlineUser.data, null, '\t')], { type: 'application/json' });
		element.href = URL.createObjectURL(file);
		element.download = 'profil.json';
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};

	const uploadProfil = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			reader.onload = async (e: any) => {
				try {
					const content = JSON.parse(e.target.result);
					console.log(content);
					offlineUser.methods.data.upload(content);
					toast({
						status: 'success',
						title: 'Profil chargé !',
						duration: 3000,
						isClosable: true,
					});
				} catch (error) {
					console.error(error);
					toast({
						status: 'error',
						title: 'Fichier non valide.',
						description: 'Syntaxe non conforme.',
						duration: 3000,
						isClosable: true,
					});
				}
			};
			reader.readAsText(file);
		}
	};

	return (
		<>
			<VStack align="start" w="100%" spacing="24px">
				<VStack align="start" w="100%">
					<Text variant="h6">Profil hors-ligne</Text>
					<Text variant="link" textAlign="justify">
						Votre connexion à IPFS est complète !
					</Text>
					<Text variant="p" textAlign="justify">
						Si vous souhaitez rafraîchir les données, veuillez cliquer sur le bouton "Précédent". Pour rappel, dans le
						but de rester à jour il vous est conseillé de rafraîchir les données à chaque connexion ou bien toutes les
						heures si vous restez connecté longtemps.
					</Text>
					<Text variant="p" textAlign="justify">
						N'oubliez pas qu'en utilisant le mode hors-ligne, certaines actions ne sont pas disponibles comme la
						publication d'articles par exemple. Notez également qu'accèder à certains articles peut être parfois long
						(environ 30 secondes), puisque leur contenu n'est récupéré uniquement lorsque nécéssaire afin de fluidifier
						au maximum votre interaction avec Anthologia. Pour finir, les données entre compte en-ligne et compte
						hors-ligne ne sont pas partagées: un changement sur le compte en-ligne n'est valable que pour le compte
						en-ligne; un changement sur le compte hors-ligne n'est valable que pour le compte hors-ligne.
					</Text>
					<Text variant="p" textAlign="justify">
						Il est donc conseillé d'utiliser le mode hors-ligne uniquement en cas de censure, ou bien pour satisfaire
						votre curiosité envers cette fonctionnalité.
					</Text>
					<Text variant="p" textAlign="justify">
						Pour confirmer votre utilisation du mode hors-ligne, veuillez cliquer sur le bouton ci-dessous. Il vous
						suffit de re-cliquer dessus retourner au mode en-ligne.
					</Text>
					<Button
						onClick={async () => {
							// TODO: toast to say user not logged in if offline to online without auth
							user.methods.toggleIsOfflineState();
							if (user.data.isOffline) {
								await ui.online.user.me();
							} else {
								if (offlineUser.articlesCatalog === undefined || offlineUser.articlesCatalog.length === 0) {
									// TODO: duplicated code, change logic
									toast({
										title: 'Veuillez rafraîchir les articles.',
										status: 'warning',
										duration: 3000,
										isClosable: true,
									});
									setActiveStep(2);
								}
							}
						}}
					>
						{user.data.isOffline ? 'Mode hors-ligne sélectionné' : 'Mode en-ligne sélectionné'}
					</Button>
				</VStack>
				<Text variant="p" textAlign="justify">
					Certaines interactions comme la création de dossiers, d'articles aimés, ... est également stocké localement
					dans votre navigateur. Vous avez la possibilité de télécharger cette donnée appelée votre "profil hors-ligne".
					Ainsi, vous pouvez téléverser sur n'importe appareil ce fichier pour retrouver votre profil, dans le cas où
					vous utilisez le mode hors-ligne.
				</Text>
				<Stack direction={{ base: 'column', sm: 'row' }} w="100%" justify="space-between">
					<Button onClick={downloadProfil}>Télécharger mon profil</Button>
					<VStack align="start" spacing="8px">
						{/* <Text variant="link">Téléverser mon profil</Text> */}
						<Input type="file" onChange={uploadProfil} />
					</VStack>
				</Stack>
			</VStack>
			<HStack w="100%" align="start">
				<Button maxW="240px" onClick={() => setActiveStep(2)}>
					Précédent
				</Button>
			</HStack>
		</>
	);
};

export default Step3;
