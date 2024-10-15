import * as React from 'react';
import { useState } from 'react';
import { Button, Link, Text, VStack } from '@chakra-ui/react';

import { useOnlineUserContext } from 'contexts/onlineUser';

const Step0 = ({ setActiveStep }: { setActiveStep: (v: number) => void }): JSX.Element => {
	const onlineUser = useOnlineUserContext();
	const [isCensored, setIsCensored] = useState<boolean | undefined>(undefined);

	const testCensorship = async () => {
		try {
			const res = await onlineUser.methods.user.me();
			if (res.code === -1) setIsCensored(true);
			else setIsCensored(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<VStack align="start" w="100%">
				<Text variant="h6">
					Qu'est ce que le mode <i>hors-ligne</i> ?
				</Text>
				<Text variant="p" textAlign="justify">
					Dans un paysage médiatique de plus en plus menacé par la censure et les pressions politiques, Anthologia se
					dresse comme un phare d'espoir pour la liberté de la presse.
				</Text>
				<Text variant="p" textAlign="justify">
					Au cœur d'Anthologia se trouve une vision audacieuse: créer un écosystème journalistique incensurable, capable
					de résister aux tentatives les plus acharnées de museler la liberté d'expression.
				</Text>
				<Text variant="p" textAlign="justify">
					Pour réaliser cette ambition, le projet s'appuie sur la technologie IPFS (InterPlanetary File System), une
					infrastructure de pointe qui repense fondamentalement la façon dont les données sont stockées et partagées sur
					internet.
				</Text>
				<Text variant="p" textAlign="justify">
					Le mode <i>hors-ligne</i> s'appuie sur cette technologie. Au lieu de récupérer la donnée de manière
					"classique", le mode <i>hors-ligne</i> va la récupérer via IPFS.
				</Text>
				<Text variant="p" textAlign="justify">
					Donc dans le cas où vous êtes censuré, autrement dit si une personne / un groupe / un gouvernement vous bloque
					l'accès à Anthologia, vous pouvez toujours grâce au mode <i>hors-ligne</i> lire librement tous les articles
					publiés. Cependant, vous ne pouvez pas encore écrire d'article.
				</Text>
				<Text variant="link" textAlign="justify">
					{/* TODO: use something else than google doc */}
					Pour plus d'information, lisez notre{' '}
					<Link
						href="https://docs.google.com/document/d/11RIsW4aiMNqTvEdjwzu6p3mA6TN_FH0gSYrbj699pds/edit?usp=sharing"
						isExternal
					>
						<u>Livre Blanc</u>
					</Link>
					.
				</Text>
				<Text variant="p" textAlign="justify" cursor="pointer" onClick={testCensorship}>
					Pour savoir si vous êtes censuré, cliquez{' '}
					<b>
						<u>ici</u>
					</b>
					.
				</Text>
				{isCensored === true && (
					<Text variant="link">
						Vous êtes censuré, cliquez sur le bouton "Suivant" en bas de page pour configurer et activer le mode
						<i>hors-ligne</i>.
					</Text>
				)}
				{isCensored === false && (
					<Text variant="p">
						Vous n'êtes pas censuré, nous vous conseillons de ne pas aller plus loin afin de garder accès à toutes les
						fonctionnalités. Libre à vous cependant de continuer and cliquant sur le bouton "Suivant" en bas de pas pour
						configurer et tester le mode <i>hors-ligne</i>.
					</Text>
				)}
			</VStack>
			<VStack w="100%" align="end">
				<Button variant="primary-purple" maxW="240px" onClick={() => setActiveStep(1)}>
					Suivant
				</Button>
			</VStack>
		</>
	);
};

export default Step0;
