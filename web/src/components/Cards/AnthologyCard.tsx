import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	HStack,
	Text,
	Tooltip,
	VStack,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { FcLike } from 'react-icons/fc';

const AnthologyCard = ({
	navigateUrl,
	name,
	description,
	nbArticles,
	deleteAnthology,
	setAnthologyToUpdate,
	onOpen,
}: {
	navigateUrl: string;
	name: string;
	description: string;
	nbArticles: number;
	deleteAnthology?: () => void;
	setAnthologyToUpdate?: () => void;
	onOpen?: () => void;
}): JSX.Element => {
	const navigate = useNavigate();

	return (
		<Card w="100%" h="100%">
			<CardHeader>
				<VStack spacing="0px" align="start" w="100%">
					<HStack justify="space-between" w="100%">
						<Heading size="md">{name}</Heading>
						{name === 'Favoris' && <FcLike />}
					</HStack>
					<Text variant="info" color="gray.400">
						{nbArticles} article{nbArticles !== 1 && 's'}
					</Text>
				</VStack>
			</CardHeader>
			<CardBody>
				<Text>{description}</Text>
			</CardBody>
			<CardFooter>
				<HStack spacing="8px">
					<Tooltip label="Accèder au dossier">
						<Button onClick={() => navigate(navigateUrl)}>
							<FaArrowUpRightFromSquare />{' '}
						</Button>
					</Tooltip>
					{deleteAnthology && setAnthologyToUpdate && onOpen && (
						<>
							<Tooltip label="Modifier le dossier">
								<Button
									onClick={() => {
										setAnthologyToUpdate();
										onOpen();
									}}
								>
									<EditIcon />
								</Button>
							</Tooltip>
							<Tooltip label="Supprimer le dossier">
								<Button onClick={deleteAnthology}>
									<DeleteIcon />
								</Button>
							</Tooltip>
						</>
					)}
				</HStack>
			</CardFooter>
		</Card>
	);
};

export default AnthologyCard;
