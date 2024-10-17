import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, GridItem, Tag, VStack } from '@chakra-ui/react';

import { useUserContext } from 'contexts/user';
import { useUIContext } from 'contexts/ui';
import { Article, OfflineArticle } from 'types/article';
import { Anthology, OfflineAnthology } from 'types/anthology';
import SearchInput from 'components/Inputs/SearchInput';
import ArticleCard from 'components/Cards/ReaderArticleCard';

const Folder = (): JSX.Element => {
	const user = useUserContext();
	const ui = useUIContext();
	const { anthologyId } = useParams();
	const [search, setSearch] = useState('');
	const [refresh, setRefresh] = useState(1);

	// online
	const [onlineArticles, setOnlineArticles] = useState<Article[]>([]);
	const [onlineAnthology, setOnlineAnthology] = useState<Anthology | undefined>(undefined);

	// offline
	const [offlineArticles, setOfflineArticles] = useState<OfflineArticle[]>([]);
	const [offlineAnthology, setOfflineAnthology] = useState<OfflineAnthology | undefined>(undefined);

	useEffect(() => {
		if (!user.data.isOffline) {
			ui.online.anthologies.search.one(+anthologyId!, setOnlineAnthology);
		} else {
			ui.offline.anthologies.search.one(anthologyId!, setOfflineAnthology);
		}
	}, [refresh]);

	useEffect(() => {
		if (!user.data.isOffline && onlineAnthology) {
			// TODO: for now articles are not Article[]
			// setOnlineArticles(onlineAnthology.articles);
			ui.online.articles.search.allPublications({ anthologyId: onlineAnthology.id }, setOnlineArticles);
		}
	}, [onlineAnthology]);

	useEffect(() => {
		if (user.data.isOffline && offlineAnthology) ui.offline.anthologies.articles(anthologyId!, setOfflineArticles);
	}, [offlineAnthology]);

	useEffect(() => {
		const timer = setTimeout(() => {
			// TODO: search of articles inside folder
			if (!user.data.isOffline) {
			} else {
			}
		}, 0.7 * 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [search]);

	if (
		!user.data.isOffline
			? !onlineAnthology || !onlineArticles
			: // Very ugly: find a way in one file to check if refresh articles needed when offline
			  !offlineAnthology || !offlineArticles || (offlineArticles.length >= 1 && offlineArticles[0] === undefined)
	) {
		return (
			<VStack w="100%" h="100%" justify="center">
				<CircularProgress size="120px" isIndeterminate />
			</VStack>
		);
	}

	return (
		<VStack w="100%" spacing={{ base: '8px', md: '12px', lg: '16px' }} align="start">
			<SearchInput
				value={search}
				inputId="favoris-search-input"
				w={{ base: '100%', xl: '640px' }}
				placeholder="Cherchez parmis vos articles favoris"
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Tag>
				{!user.data.isOffline
					? `${onlineArticles.length} article${onlineArticles.length === 1 ? '' : 's'}`
					: `${offlineArticles.length} article${offlineArticles.length === 1 ? '' : 's'}`}
			</Tag>
			<Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={4} w="100%">
				{!user.data.isOffline
					? onlineArticles.map((article, index) => (
							<GridItem key={index.toString()}>
								<ArticleCard
									navigateUrl={`/articles/${article.id.toString()}`}
									title={article.title}
									author={article.author.username}
									date={new Date(article.createdAt).toLocaleDateString('fr-FR')}
									topic={article.topic.name}
									rawContent={article.rawContent}
									// TODO: add / remove favorites
									// TODO: add article to other anthology
									likes={article.likeCounter}
									views={article.viewCounter}
									removeFromFolderAction={async () =>
										await ui.online.anthologies.removeArticle(+anthologyId!, article.id, async () =>
											setRefresh((r) => r + 1),
										)
									}
								/>
							</GridItem>
					  ))
					: offlineArticles.map((article, index) => (
							<GridItem key={index.toString()}>
								<ArticleCard
									navigateUrl={`/articles/${article.cid}`}
									title={article.title}
									author={article.author}
									date={new Date(article.createdAt).toLocaleDateString('fr-FR')}
									topic={article.topic}
									rawContent={article.preview}
									// TODO: add / remove article to favorites
									// TODO: add article to other anthology
									likes={-1}
									views={-1}
									removeFromFolderAction={async () =>
										ui.offline.anthologies.removeArticle(anthologyId!, article.cid, async () =>
											setRefresh((r) => r + 1),
										)
									}
								/>
							</GridItem>
					  ))}
			</Grid>
		</VStack>
	);
};

export default Folder;
