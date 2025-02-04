import * as React from 'react';
import { useEffect, useState } from 'react';
import {
	Button,
	CircularProgress,
	Grid,
	GridItem,
	HStack,
	Icon,
	Select,
	Stack,
	Tag,
	Tooltip,
	VStack,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react';
import { FcLike } from 'react-icons/fc';
import { FaEye, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

import { useUIContext } from 'contexts/ui';
import { useUserContext } from 'contexts/user';
import { useOfflineUserContext } from 'contexts/offlineUser';
import { Topic } from 'types/topic';
import { Article, OfflineArticle } from 'types/article';
import { Anthology, OfflineAnthology } from 'types/anthology';
import SearchInput from 'components/Inputs/SearchInput';
import ReaderArticleCard from 'components/Cards/ReaderArticleCard';
import AnthologiesModal from 'components/modals/Anthologies';

const Explore = (): JSX.Element => {
	const ui = useUIContext();
	const user = useUserContext();
	const offlineUser = useOfflineUserContext();
	const { colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [search, setSearch] = useState('');
	const [refresh, setRefresh] = useState(1);
	const [sortLikes, setSortLikes] = useState<'UP' | 'DOWN' | 'NONE'>('NONE');
	const [sortViews, setSortViews] = useState<'UP' | 'DOWN' | 'NONE'>('NONE');

	// online
	const [onlineTopics, setOnlineTopics] = useState<Topic[]>([]);
	const [onlineTopic, setOnlineTopic] = useState<Topic | undefined>();
	const [onlineArticles, setOnlineArticles] = useState<Article[]>([]);
	const [onlineLikedArticles, setOnlineLikedArticles] = useState<Article[]>([]);
	const [onlineAnthologies, setOnlineAnthologies] = useState<Anthology[]>([]);
	const [onlineArticleToAdd, setOnlineArticleToAdd] = useState<number | undefined>(undefined);

	// offline
	const [offlineTopics, setOfflineTopics] = useState<string[]>([]);
	const [offlineTopic, setOfflineTopic] = useState<string>('');
	const [offlineArticles, setOfflineArticles] = useState<OfflineArticle[]>([]);
	const [offlineLikedArticles, setOfflineLikedArticles] = useState<OfflineArticle[]>([]);
	const [offlineAnthologies, setOfflineAnthologies] = useState<OfflineAnthology[]>([]);
	const [offlineArticleToAdd, setOfflineArticleToAdd] = useState<string | undefined>(undefined);

	// TODO: filter in UI context ?
	const filterOfflineArticles = () => {
		return offlineUser.articlesCatalog.filter((a) => {
			if (search !== '') {
				if (offlineTopic !== '') {
					return a.title.includes(search) && a.topic === offlineTopic;
				}
				return a.title.includes(search);
			} else if (offlineTopic !== '') {
				return a.topic === offlineTopic;
			}
			return true;
		});
	};

	const filterArticles = (articles: Article[]) => {
		return articles.sort((a, b) => {
			if (sortLikes === 'UP') return b.likeCounter - a.likeCounter;
			if (sortLikes === 'DOWN') return a.likeCounter - b.likeCounter;
			if (sortViews === 'UP') return b.viewCounter - a.viewCounter;
			if (sortViews === 'DOWN') return a.viewCounter - b.viewCounter;
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});
	};

	useEffect(() => {
		if (!user.data.isOffline) {
			ui.online.articles.search.allPublications({ query: search, topic: onlineTopic?.id }, setOnlineArticles);
			ui.online.articles.search.likedPublications({ query: search, topic: onlineTopic?.id }, setOnlineLikedArticles);
			ui.online.anthologies.search.many({ author: 'me' }, setOnlineAnthologies);
			ui.online.topics.search.all(setOnlineTopics);
		} else {
			setOfflineArticles(filterOfflineArticles());
			setOfflineLikedArticles(offlineUser.data.articles.liked);
			setOfflineAnthologies(offlineUser.data.anthologies);
			setOfflineTopics(offlineUser.articlesCatalog.map((a) => a.topic));
		}
	}, [refresh]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!user.data.isOffline) {
				ui.online.articles.search.allPublications({ query: search, topic: onlineTopic?.id }, setOnlineArticles);
			} else {
				setOfflineArticles(filterOfflineArticles());
			}
		}, 0.7 * 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [search, onlineTopic, offlineTopic]);

	if (!user.data.isOffline ? !onlineArticles : !offlineArticles) {
		return (
			<VStack w="100%" h="100%" justify="center">
				<CircularProgress size="120px" isIndeterminate />
			</VStack>
		);
	}

	return (
		<>
			<VStack w="100%" spacing={{ base: '8px', md: '12px', lg: '16px' }} align="start">
				<Stack w="100%" direction={{ base: 'column', sm: 'row' }}>
					<SearchInput
						value={search}
						w={{ base: '100%', md: '560px' }}
						placeholder="Cherchez un ou plusieurs mots-clés"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Select
						flexGrow={1}
						onChange={(e) => {
							if (!user.data.isOffline) {
								setOnlineTopic(onlineTopics.find((t) => t.name === e.target.value));
							} else {
								setOfflineTopic(e.target.value);
							}
						}}
						value={onlineTopic?.name}
						sx={{
							'> option': {
								background: '#212529',
							},
						}}
					>
						<option value="">-- Tous --</option>
						{!user.data.isOffline
							? onlineTopics.map((t, index) => <option key={index}>{t.name}</option>)
							: offlineTopics.map((t, index) => <option key={index}>{t}</option>)}
					</Select>
				</Stack>
				<HStack>
					<Tag>
						{!user.data.isOffline
							? `${onlineArticles.length} article${onlineArticles.length === 1 ? '' : 's'}`
							: `${offlineArticles.length} article${offlineArticles.length === 1 ? '' : 's'}`}
					</Tag>
					{!user.data.isOffline && (
						<>
							<Tooltip label="Trier en fonction du nombre de vues">
								<Button
									onClick={() => {
										setSortViews('NONE');
										if (sortLikes === 'NONE') setSortLikes('UP');
										else if (sortLikes === 'UP') setSortLikes('DOWN');
										else setSortLikes('NONE');
									}}
									bg={sortLikes === 'NONE' ? 'none' : colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100'}
								>
									<Icon
										as={sortLikes === 'NONE' ? FaSort : sortLikes === 'UP' ? FaSortUp : FaSortDown}
										boxSize={4}
										mr="8px"
									/>
									<FcLike />
								</Button>
							</Tooltip>
							<Tooltip label="Trier en fonction du nombre de likes">
								<Button
									onClick={() => {
										setSortLikes('NONE');
										if (sortViews === 'NONE') setSortViews('UP');
										else if (sortViews === 'UP') setSortViews('DOWN');
										else setSortViews('NONE');
									}}
									bg={sortViews === 'NONE' ? 'none' : colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100'}
								>
									<Icon
										as={sortViews === 'NONE' ? FaSort : sortViews === 'UP' ? FaSortUp : FaSortDown}
										boxSize={4}
										mr="8px"
									/>
									<FaEye />
								</Button>
							</Tooltip>
						</>
					)}
				</HStack>
				<Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={4} w="100%">
					{!user.data.isOffline
						? filterArticles(onlineArticles).map((article, index) => (
								<GridItem key={index.toString()}>
									<ReaderArticleCard
										navigateUrl={`/articles/${article.id}`}
										title={article.title}
										authorName={article.author.username}
										authorId={article.author.id}
										date={new Date(article.createdAt).toLocaleDateString('fr-FR')}
										topic={article.topic.name}
										rawContent={article.rawContent}
										likes={article.likeCounter}
										views={article.viewCounter}
										isLiked={onlineLikedArticles.find((a) => a.id === article.id) !== undefined}
										addToFolderAction={async () => {
											setOnlineArticleToAdd(article.id);
											onOpen();
										}}
										addToFavoritesAction={async () => {
											ui.online.articles.like({ id: article.id, isLiked: false }, () => setRefresh((r) => r + 1));
										}}
										removeFromFavoritesAction={async () => {
											ui.online.articles.like({ id: article.id, isLiked: true }, () => setRefresh((r) => r + 1));
										}}
									/>
								</GridItem>
						  ))
						: offlineArticles.map((article, index) => (
								<GridItem key={index.toString()}>
									<ReaderArticleCard
										navigateUrl={`/articles/${article.cid}`}
										title={article.title}
										authorName={article.author}
										date={new Date(article.createdAt).toLocaleDateString('fr-FR')}
										topic={article.topic}
										rawContent={article.preview}
										likes={-1}
										views={-1}
										isLiked={offlineLikedArticles.find((a) => a.cid === article.cid) !== undefined}
										addToFolderAction={async () => {
											setOfflineArticleToAdd(article.cid);
											onOpen();
										}}
										addToFavoritesAction={async () => {
											ui.offline.articles.like(article.cid, false, () => setRefresh((r) => r + 1));
										}}
										removeFromFavoritesAction={async () => {
											ui.offline.articles.like(article.cid, true, () => setRefresh((r) => r + 1));
										}}
									/>
								</GridItem>
						  ))}
				</Grid>
			</VStack>

			<AnthologiesModal
				isOpen={isOpen}
				onClose={onClose}
				isOffline={user.data.isOffline}
				onlineAnthologies={!user.data.isOffline ? onlineAnthologies : undefined}
				offlineAnthologies={!user.data.isOffline ? undefined : offlineAnthologies}
				createAnthology={async (name: string, description: string) =>
					!user.data.isOffline
						? await ui.online.anthologies.create({ name, description, isPublic: false }, async () =>
								setRefresh((r) => r + 1),
						  )
						: ui.offline.anthologies.create({
								params: { name, description },
								callback: () => setRefresh((r) => r + 1),
						  })
				}
				onlineAction={async (id: number) =>
					await ui.online.anthologies.addArticle(id, onlineArticleToAdd!, async () => {
						onClose();
						setRefresh((r) => r + 1);
					})
				}
				offlineAction={(id: string) =>
					ui.offline.anthologies.addArticle(id, offlineArticleToAdd!, () => {
						onClose();
						setRefresh((r) => r + 1);
					})
				}
			/>
		</>
	);
};

export default Explore;
