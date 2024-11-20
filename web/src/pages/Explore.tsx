import * as React from 'react';
import { useEffect, useState } from 'react';
import { CircularProgress, Grid, GridItem, Select, Stack, Tag, VStack, useDisclosure } from '@chakra-ui/react';

import { useUIContext } from 'contexts/ui';
import { useUserContext } from 'contexts/user';
import { useOfflineUserContext } from 'contexts/offlineUser';
import { Topic } from 'types/topic';
import { Article, OfflineArticle } from 'types/article';
import { Anthology, OfflineAnthology } from 'types/anthology';
import SearchInput from 'components/Inputs/SearchInput';
import ReaderArticleCard from 'components/Cards/ReaderArticleCard';
import AnthologiesModal from 'components/modals/Anthologies';

// TODO: improve online / offline search
const Explore = (): JSX.Element => {
	const ui = useUIContext();
	const user = useUserContext();
	const offlineUser = useOfflineUserContext();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [search, setSearch] = useState('');
	const [topic, setTopic] = useState<Topic | undefined>();
	const [topics, setTopics] = useState<Topic[]>([]);
	const [refresh, setRefresh] = useState(1);

	// online
	const [onlineArticles, setOnlineArticles] = useState<Article[]>([]);
	const [onlineAnthologies, setOnlineAnthologies] = useState<Anthology[]>([]);
	const [onlineArticleToAdd, setOnlineArticleToAdd] = useState<number | undefined>(undefined);

	// offline
	const [offlineArticles, setOfflineArticles] = useState<OfflineArticle[]>([]);
	const [offlineAnthologies, setOfflineAnthologies] = useState<OfflineAnthology[]>([]);
	const [offlineArticleToAdd, setOfflineArticleToAdd] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!user.data.isOffline) {
			ui.online.articles.search.allPublications({ query: search, topic: topic?.id }, setOnlineArticles);
			ui.online.anthologies.search.many({ author: 'me' }, setOnlineAnthologies);
			ui.online.topics.search.all(setTopics);
		} else {
			console.log(offlineUser.articlesCatalog);
			setOfflineArticles(offlineUser.articlesCatalog.filter((a) => (search !== '' ? a.title.includes(search) : true)));
			setOfflineAnthologies(offlineUser.data.anthologies);
		}
	}, [refresh]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!user.data.isOffline) {
				ui.online.articles.search.allPublications({ query: search, topic: topic?.id }, setOnlineArticles);
			} else {
				// TODO: filter in UI context ?
				setOfflineArticles(
					offlineUser.articlesCatalog.filter((a) => (search !== '' ? a.title.includes(search) : true)),
				);
			}
		}, 0.7 * 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [search, topic]);

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
						placeholder="Cherchez parmis vos articles favoris"
						onChange={(e) => setSearch(e.target.value)}
					/>
					{!user.data.isOffline && (
						<Select
							flexGrow={1}
							onChange={(e) => setTopic(topics.find((t) => t.name === e.target.value))}
							value={topic?.name}
							sx={{
								'> option': {
									background: '#212529',
								},
							}}
						>
							<option value="">-- Tous --</option>
							{topics.map((t, index) => (
								<option key={index}>{t.name}</option>
							))}
						</Select>
					)}
				</Stack>
				<Tag>
					{!user.data.isOffline
						? `${onlineArticles.length} article${onlineArticles.length === 1 ? '' : 's'}`
						: `${offlineArticles.length} article${offlineArticles.length === 1 ? '' : 's'}`}
				</Tag>
				<Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={4} w="100%">
					{!user.data.isOffline
						? onlineArticles
								.filter((a) => (search !== '' ? a.title.includes(search) : true))
								.map((article, index) => (
									<GridItem key={index.toString()}>
										<ReaderArticleCard
											navigateUrl={`/articles/${article.id}`}
											title={article.title}
											author={article.author.username}
											date={new Date(article.createdAt).toLocaleDateString('fr-FR')}
											topic={article.topic.name}
											rawContent={article.rawContent}
											likes={article.likeCounter}
											views={article.viewCounter}
											addToFolderAction={async () => {
												setOnlineArticleToAdd(article.id);
												onOpen();
											}}
										/>
									</GridItem>
								))
						: offlineArticles.map((article, index) => (
								<GridItem key={index.toString()}>
									<ReaderArticleCard
										navigateUrl={`/articles/${article.cid}`}
										title={article.title}
										author={article.author}
										date={new Date(article.createdAt).toLocaleDateString('fr-FR')}
										topic={article.topic}
										rawContent={article.preview}
										likes={-1}
										views={-1}
										// TODO: add / remove favorites
										addToFolderAction={async () => {
											setOfflineArticleToAdd(article.cid);
											onOpen();
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
