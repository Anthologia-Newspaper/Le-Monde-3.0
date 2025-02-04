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
import { FaEye, FaFolderMinus, FaFolderPlus } from 'react-icons/fa';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import readingTime from 'reading-time';

const ReaderArticleCard = ({
	navigateUrl,
	authorName,
	authorId,
	rawContent,
	date,
	title,
	likes,
	views,
	topic,
	isLiked,
	addToFolderAction,
	removeFromFolderAction,
	addToFavoritesAction,
	removeFromFavoritesAction,
}: {
	navigateUrl: string;
	authorName: string;
	authorId?: number;
	rawContent: string;
	date: string;
	likes: number;
	views: number;
	title: string;
	topic: string;
	isLiked: boolean;
	addToFolderAction?: () => Promise<void>;
	removeFromFolderAction?: () => Promise<void>;
	addToFavoritesAction?: () => Promise<void>;
	removeFromFavoritesAction?: () => Promise<void>;
}): JSX.Element => {
	const navigate = useNavigate();
	const { colorMode } = useColorMode();
	const timeToRead = Math.round(readingTime(rawContent).minutes) + 1;

	return (
		<Card
			w="100%"
			h="100%"
			cursor="pointer"
			onClick={() => navigate(navigateUrl)}
			_hover={{
				background: colorMode === 'dark' ? 'gray.600' : 'gray.100',
				'#reader-article-card-actions': { visibility: 'visible' },
			}}
		>
			<CardHeader>
				<VStack spacing="16px" align="start">
					<HStack w="100%" justify="space-between">
						<Badge colorScheme="blue">{topic}</Badge>
						<HStack id="reader-article-card-actions" visibility="hidden" zIndex={3}>
							{addToFavoritesAction && !isLiked && (
								<Tooltip label="Ajouter aux favoris">
									<Button
										onClick={async (e) => {
											e.stopPropagation();
											await addToFavoritesAction();
										}}
									>
										<FcLikePlaceholder />
									</Button>
								</Tooltip>
							)}
							{removeFromFavoritesAction && isLiked && (
								<Tooltip label="Retirer des favoris">
									<Button
										onClick={async (e) => {
											e.stopPropagation();
											await removeFromFavoritesAction();
										}}
									>
										<FcLike />
									</Button>
								</Tooltip>
							)}
							{addToFolderAction && (
								<Tooltip label="Ajouter à un dossier">
									<Button
										onClick={async (e) => {
											e.stopPropagation();
											await addToFolderAction();
										}}
									>
										<FaFolderPlus />
									</Button>
								</Tooltip>
							)}
							{removeFromFolderAction && (
								<Tooltip label="Retirer du dossier">
									<Button
										onClick={async (e) => {
											e.stopPropagation();
											await removeFromFolderAction();
										}}
									>
										<FaFolderMinus />
									</Button>
								</Tooltip>
							)}
						</HStack>
					</HStack>
					<VStack align="start" spacing="0px" w="100%">
						<Heading size="md">{title}</Heading>
						<HStack w="100%" justify="space-between">
							<Text
								variant="info"
								color="gray.400"
								onClick={(e) => {
									if (authorId) {
										e.stopPropagation();
										navigate(`/auteurs/${authorId}`);
									}
								}}
							>
								@{authorName}
							</Text>
							<Text variant="info" color="gray.400">
								{date}
							</Text>
						</HStack>
					</VStack>
				</VStack>
			</CardHeader>
			<CardBody>
				<VStack w="100%" align="left" spacing="8px" inlineSize="100%" maxInlineSize="calc(100vw - 32px);">
					<Text noOfLines={3} maxW="100% !important">
						{rawContent}
					</Text>
				</VStack>
			</CardBody>
			<CardFooter>
				<Flex direction="row" justify="space-between" w="100%">
					<HStack>
						{likes !== undefined && likes !== -1 && (
							<Tag>
								<HStack>
									<Text>{likes}</Text> <Icon as={FcLike} boxSize={4} />
								</HStack>
							</Tag>
						)}
						{views !== undefined && views !== -1 && (
							<Tag>
								<HStack>
									<Text>{views}</Text> <Icon as={FaEye} boxSize={4} />
								</HStack>
							</Tag>
						)}
					</HStack>
					<Badge variant="outline" colorScheme="gray" lineHeight="24px">
						{`${timeToRead} min`}
					</Badge>
				</Flex>
			</CardFooter>
		</Card>
	);
};

export default ReaderArticleCard;
