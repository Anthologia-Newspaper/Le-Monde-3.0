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
	useColorMode,
	VStack,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
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
	const { colorMode } = useColorMode();

	return (
		<Card
			w="100%"
			h="100%"
			cursor="pointer"
			_hover={{
				background: colorMode === 'dark' ? 'gray.600' : 'gray.100',
				'#anthology-card-actions-footer': {
					visibility: 'visible',
				},
			}}
			onClick={() => navigate(navigateUrl)}
			zIndex={2}
		>
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
				<HStack id="anthology-card-actions-footer" visibility="hidden" spacing="8px">
					{deleteAnthology && setAnthologyToUpdate && onOpen && (
						<>
							<Tooltip label="Modifier le dossier">
								<Button
									zIndex={3}
									onClick={(e) => {
										e.stopPropagation();
										setAnthologyToUpdate();
										onOpen();
									}}
								>
									<EditIcon />
								</Button>
							</Tooltip>
							<Tooltip label="Supprimer le dossier">
								<Button
									zIndex={3}
									onClick={(e) => {
										e.stopPropagation();
										deleteAnthology();
									}}
								>
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
