import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	HStack,
	Icon,
	Tag,
	Text,
	Tooltip,
	useColorMode,
	VStack,
} from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { DeleteIcon } from '@chakra-ui/icons';

import Editor from 'components/Editor/Editor';

const WriterArticleCard = ({
	navigateUrl,
	content,
	date,
	title,
	likes,
	views,
	topic,
	isDraft,
	deleteAction,
}: {
	navigateUrl: string;
	content: string;
	date: string;
	likes: number;
	views: number;
	title: string;
	topic: string;
	isDraft: boolean;
	deleteAction: () => Promise<void>;
}): JSX.Element => {
	const navigate = useNavigate();
	const { colorMode } = useColorMode();

	return (
		<Card
			w="100%"
			h="100%"
			cursor="pointer"
			onClick={() => navigate(navigateUrl)}
			zIndex={2}
			_hover={{
				background: colorMode === 'dark' ? 'gray.600' : 'gray.100',
				'#writer-article-card-delete-btn': { visibility: 'visible' },
			}}
		>
			<CardHeader>
				<VStack spacing="16px" align="start">
					<HStack w="100%" justify="space-between">
						<Badge colorScheme="blue">{topic}</Badge>
						{/* TODO: draft to publication */}
						{/* TODO: update article */}
						<Tooltip label="Supprimer définitivement">
							<Button
								id="writer-article-card-delete-btn"
								visibility="hidden"
								zIndex={3}
								onClick={async (e) => {
									e.stopPropagation();
									await deleteAction();
								}}
							>
								<DeleteIcon />
							</Button>
						</Tooltip>
					</HStack>
					<VStack align="start" spacing="0px" w="100%">
						<Heading size="md">{title}</Heading>
						<HStack w="100%" justify="space-between">
							<Badge colorScheme={isDraft ? 'orange' : 'red'}>{isDraft ? 'Brouillon' : 'Publié'}</Badge>
							<Text variant="info" color="gray.400">
								{date}
							</Text>
						</HStack>
					</VStack>
				</VStack>
			</CardHeader>
			<CardBody>
				{/* <VStack w="100%" align="left" spacing="8px" inlineSize="100%" maxInlineSize="calc(100vw - 32px);">
					<Text noOfLines={3} maxW="100% !important">
						{content}
					</Text>
				</VStack> */}
				<VStack maxH="80px" overflow="hidden">
					<Editor value={JSON.parse(content)} readOnly={true} />
				</VStack>
			</CardBody>
			<CardFooter>
				<Flex direction="row" justify="space-between" w="100%">
					<HStack>
						{likes !== undefined && (
							<Tag>
								<HStack>
									<Text>{likes}</Text> <Icon as={FcLike} boxSize={4} />
								</HStack>
							</Tag>
						)}
						{views !== undefined && (
							<Tag>
								<HStack>
									<Text>{views}</Text> <Icon as={FaEye} boxSize={4} />
								</HStack>
							</Tag>
						)}
					</HStack>
					{/* TODO: estimitate time to read */}
					<Badge variant="outline" colorScheme="gray" lineHeight="24px">
						3 min
					</Badge>
				</Flex>
			</CardFooter>
		</Card>
	);
};

export default WriterArticleCard;
