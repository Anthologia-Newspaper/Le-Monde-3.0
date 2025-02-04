import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';
import {
	Badge,
	Button,
	CircularProgress,
	Collapse,
	Grid,
	GridItem,
	HStack,
	Icon,
	Select,
	Stack,
	Tag,
	Text,
	Tooltip,
	useColorMode,
	VStack,
} from '@chakra-ui/react';
import { FaFilter, FaSort } from 'react-icons/fa';
import { FaSortDown, FaSortUp } from 'react-icons/fa6';
import { RiArticleLine, RiDraftLine, RiFilterOffLine } from 'react-icons/ri';
import { FcLike } from 'react-icons/fc';
import { FaEye } from 'react-icons/fa';

import { Topic } from 'types/topic';
import { Article } from 'types/article';
import { useUIContext } from 'contexts/ui';
import WriterArticleCard from 'components/Cards/WriterArticleCard';
import SearchInput from 'components/Inputs/SearchInput';
import { useOnlineUserContext } from 'contexts/onlineUser';
import { Stats } from 'types/statistics';
import Chart from 'components/Chart/Chart';

const Writings = (): JSX.Element => {
	const ui = useUIContext();
	const onlineUser = useOnlineUserContext();
	const [userStats, setUserStats] = useState<Stats | undefined>(undefined);
	const navigate = useNavigate();
	const { colorMode } = useColorMode();
	const [refresh, setRefresh] = useState(1);
	const [filter, setFilter] = useState(false);
	const [search, setSearch] = useState('');
	const [topic, setTopic] = useState<Topic | undefined>(undefined);
	const [sortLikes, setSortLikes] = useState<'UP' | 'DOWN' | 'NONE'>('NONE');
	const [sortViews, setSortViews] = useState<'UP' | 'DOWN' | 'NONE'>('NONE');
	const [showDrafts, setShowDrafts] = useState(true);
	const [showPublications, setShowPublications] = useState(true);
	const [topics, setTopics] = useState<Topic[]>([]);
	const [articles, setArticles] = useState<Article[]>([]);
	const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
	const [isViewChartDisplayed, setViewChartDisplay] = useState(false);
	const [isLikeChartDisplayed, setLikeChartDisplay] = useState(false);

	const sortAndFilterArticles = (articlesToSort: Article[]) => {
		return articlesToSort
			.sort((a, b) => {
				if (sortLikes === 'UP') return b.likeCounter - a.likeCounter;
				if (sortLikes === 'DOWN') return a.likeCounter - b.likeCounter;
				if (sortViews === 'UP') return b.viewCounter - a.viewCounter;
				if (sortViews === 'DOWN') return a.viewCounter - b.viewCounter;
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			})
			.filter((a) => {
				if (showDrafts && showPublications) return true;
				if (showDrafts && !showPublications) return a.draft;
				if (!showDrafts && showPublications) return !a.draft;
				if (!showDrafts && !showPublications) return a.draft;
				return false;
			});
	};

	const toggleViewChartDisplay = () => {
		setViewChartDisplay(!isViewChartDisplayed);
	};

	const toggleLikeChartDisplay = () => {
		setLikeChartDisplay(!isLikeChartDisplayed);
	};

	useEffect(() => {
		ui.online.articles.search.myArticles({}, (returnedArticles: Article[]) => setArticles(returnedArticles));
		ui.online.statistics.users.search.one(onlineUser.data.id, setUserStats);
		console.log("u stats", userStats)
	}, [refresh]);

	useEffect(() => {
		const topicsIds = articles.map((a) => a.topic.id).filter((value, index, array) => array.indexOf(value) === index);
		ui.online.topics.search.all((allTopics: Topic[]) =>
			setTopics(topicsIds.map((id) => allTopics.find((t) => t.id === id)!)),
		);
	}, [articles]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!filter) {
				setFilteredArticles(articles);
			} else {
				ui.online.articles.search.myArticles({ query: search, topic: topic?.id }, (returnedArticles: Article[]) =>
					setFilteredArticles(returnedArticles),
				);
			}
		}, 0.5 * 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [sortLikes, sortViews, filter, search, topic, showDrafts, showPublications, articles]);

	if (!articles || !filteredArticles) {
		return (
			<VStack w="100%" h="100%" justify="center">
				<CircularProgress size="120px" isIndeterminate />
			</VStack>
		);
	}

	return (
		<VStack w="100%" spacing={{ base: '8px', md: '16px', lg: '24px', xl: '32px' }} align="start">
			<VStack w="100%" align="start">
				<HStack>
					<Tag>
						{articles.length} article{articles.length === 1 ? '' : 's'}
					</Tag>
					<HStack
						cursor="pointer"
						onClick={() => {
							onlineUser.methods.extraData.setArticleToUpdate(undefined);
							navigate('/ecrire');
						}}
					>
						<Text variant="info">
							<u>Ajouter</u>
						</Text>
						<PlusSquareIcon />
					</HStack>
				</HStack>

				<VStack w="100%" align="start">
					{userStats && (
						<HStack>
							<Badge
								colorScheme="green"
								fontSize={{ base: 'small', lg: 'md' }}
								borderRadius="xsm"
								onClick={toggleLikeChartDisplay}
								cursor={'pointer'}
							>
								{userStats!.likeCounter} like{userStats!.likeCounter !== 1 && 's'}
							</Badge>
							<Badge
								colorScheme="blue"
								fontSize={{ base: 'small', lg: 'md' }}
								borderRadius="xsm"
								onClick={toggleViewChartDisplay}
								cursor="pointer"
							>
								{userStats!.viewCounter} view{userStats!.viewCounter !== 1 && 's'}
							</Badge>
						</HStack>)
					}
					<Grid
						templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, minmax(0, 1fr));' }}
						gap={{ base: 2, lg: 4 }}
						w="100%"
					>
						<Collapse in={isLikeChartDisplayed} animateOpacity>
							<Chart
								yLabel="Likes"
								data={{
									counter: userStats?.likeCounter,
									stats: userStats?.dailyLikes
								}} />
						</Collapse>
						<Collapse in={isViewChartDisplayed} animateOpacity>
							<Chart
								yLabel="Vues"
								data={{
									counter: userStats?.viewCounter,
									stats: userStats?.dailyViews
								}} />
						</Collapse>
					</Grid>
				</VStack>
			</VStack>
			<VStack w="100%" align="start">
				<HStack flexWrap="wrap">
					<Tooltip label="Filtrer par mots-clés et/ou sujet">
						<Button
							onClick={() => setFilter(!filter)}
							bg={!filter ? 'none' : colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100'}
						>
							<Icon as={filter ? FaFilter : RiFilterOffLine} />
						</Button>
					</Tooltip>
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
					<Tooltip label={`${showPublications ? 'Cacher' : 'Afficher'} les publications`}>
						<Button
							bg={!showPublications ? 'none' : colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100'}
							onClick={() => setShowPublications(!showPublications)}
						>
							<Icon as={RiArticleLine} boxSize={showPublications ? 5 : 4} />
						</Button>
					</Tooltip>
					<Tooltip label={`${showDrafts ? 'Cacher' : 'Afficher'} les brouillons`}>
						<Button
							bg={!showDrafts ? 'none' : colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100'}
							onClick={() => setShowDrafts(!showDrafts)}
						>
							<Icon as={RiDraftLine} boxSize={showDrafts ? 5 : 4} />
						</Button>
					</Tooltip>
				</HStack>
				{filter && (
					<Stack direction={{ base: 'column', sm: 'row' }} w="100%" justify="flex-start">
						<SearchInput w="100%" placeholder="..." value={search} onChange={(e) => setSearch(e.target.value)} />
						<Select
							w="auto"
							minW={{ xs: 'auto', md: '200px' }}
							sx={{
								'> option': {
									background: '#212529',
								},
							}}
							onChange={(e) => setTopic(topics.find((t) => t.name === e.target.value)!)}
						>
							{topics.map((t, index) => (
								<option key={index}>{t.name}</option>
							))}
						</Select>
					</Stack>
				)}
			</VStack>
			<Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={4} w="100%">
				{sortAndFilterArticles(filteredArticles).map((article, index) => (
					<GridItem key={index.toString()}>
						<WriterArticleCard
							articleId={article.id}
							title={article.title}
							date={new Date().toLocaleDateString('fr-FR')}
							topic={article.topic.name}
							rawContent={article.rawContent}
							isDraft={article.draft}
							deleteAction={async () => await ui.online.articles.delete(article.id, () => setRefresh((r) => r + 1))}
							likes={article.likeCounter}
							views={article.viewCounter}
						/>
					</GridItem>
				))}
			</Grid>
		</VStack>
	);
};

export default Writings;
