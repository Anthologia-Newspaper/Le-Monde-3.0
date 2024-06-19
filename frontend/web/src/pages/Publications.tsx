import { DeleteIcon, EditIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	CircularProgress,
	Collapse,
	Grid,
	GridItem,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tag,
	Tooltip,
	VStack,
} from '@chakra-ui/react';
import ArticleCard from 'components/Cards/ArticleCard';
import { Chart } from 'components/Chart/Chart';
import SearchInput from 'components/Inputs/SearchInput';
import { useAuthContext } from 'contexts/auth';
import { useUIContext } from 'contexts/ui';
import { useUserContext } from 'contexts/user';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Editor from '../components/Editor/Editor';

const Publications = (): JSX.Element => {
	const [search, setSearch] = useState('');
	const { requestResponseToast } = useUIContext();
	const { user, deleteArticle, loadWrittenArticles, updateArticle } = useUserContext();
	// const [editor, setEditor] = useState<boolean>(false);
	// const [article, setArticle] = useState({ title: '', topic: '', content: '' });
	// const [isViewChartDisplayed, setViewChartDisplay] = useState(false);
	// const [isLikeChartDisplayed, setLikeChartDisplay] = useState(false);

	// const toggleViewChartDisplay = () => {
	// 	setViewChartDisplay(!isViewChartDisplayed);
	// };

	// const toggleLikeChartDisplay = () => {
	// 	setLikeChartDisplay(!isLikeChartDisplayed);
	// };

	const uiLoadWrittenArticles = async () => {
		try {
			const res = await loadWrittenArticles();
			requestResponseToast(res);
		} catch (error) {
			console.error(error);
		}
	};

	const uiDeleteArticle = async (id: number) => {
		try {
			const res = await deleteArticle(id);
			requestResponseToast(res, true);
		} catch (error) {
			console.error(error);
		}
	};

	const uiUpdateArticle = async (id: number) => {
		try {
			const res = await updateArticle({ id, newDraft: true });
			requestResponseToast(res, true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		uiLoadWrittenArticles();
	}, []);

	if (!user.articles.written) {
		return (
			<>
				<VStack w="100%" h="100vh" justify="center">
					<CircularProgress size="120px" isIndeterminate color="black" />
				</VStack>
			</>
		);
	}

	return (
		<>
			<VStack w="100%" spacing={{ base: '8px', md: '12px', lg: '16px' }} align="start">
				<SearchInput
					value={search}
					inputId="publications-search-input"
					w={{ base: '100%', xl: '640px' }}
					placeholder="Cherchez parmis vos articles publiés"
					onChange={(e) => setSearch(e.target.value)}
					variant="primary-1"
				/>
				<HStack>
					<Tag bg="primary.yellow">
						{
							user.articles.written
								.filter((a) => !a.draft)
								.filter((p) => (search !== '' ? p.title.includes(search) : true)).length
						}{' '}
						publication
						{user.articles.written.filter((a) => !a.draft).length !== 1 && 's'}
					</Tag>
					<Tag bg="primary.blue" /* onClick={toggleLikeChartDisplay} cursor="pointer" */>
						{user.articles.written
							.filter((a) => !a.draft)
							.filter((p) => (search !== '' ? p.title.includes(search) : true))
							.map((p) => p.totalLikes)
							.reduce((a, v) => a + v, 0)}{' '}
						like
					</Tag>
					<Tag bg="primary.blue" /* onClick={toggleViewChartDisplay} cursor="pointer" */>
						{user.articles.written
							.filter((a) => !a.draft)
							.filter((p) => (search !== '' ? p.title.includes(search) : true))
							.map((p) => p.totalViews)
							.reduce((a, v) => a + v, 0)}{' '}
						view
					</Tag>
				</HStack>
				{/* <Grid
					templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, minmax(0, 1fr));' }}
					gap={{ base: 2, lg: 4 }}
					w="100%"
				>
					<Collapse in={isLikeChartDisplayed} animateOpacity>
						<Chart yLabel="Likes" data={user.overallDailyTotalLikes} />
					</Collapse>
					<Collapse in={isViewChartDisplayed} animateOpacity>
						<Chart yLabel="Vues" data={user.overallDailyTotalViews} />
					</Collapse>
				</Grid> */}
				<Grid
					templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, minmax(0, 1fr));' }}
					gap={{ base: 2, lg: 4 }}
					w="100%"
				>
					{user.articles.written
						.filter((a) => !a.draft)
						.filter((p) => (search !== '' ? p.title.includes(search) : true))
						.map((publication, index) => (
							<GridItem key={`${index.toString()}`}>
								<ArticleCard
									id={publication.id}
									title={publication.title}
									// TODO: author name
									author="Author"
									date={new Date().toLocaleDateString('fr-FR')}
									// TODO: topic
									topic="Topic"
									content={publication.content}
									actions={[
										// <Tooltip label="Éditer l'article">
										// 	<span>
										// 		<EditIcon
										// 			onClick={() => {
										// 				setEditor(true);
										// 				setArticle({
										// 					title: publication.title,
										// 					topic: publication.Topic,
										// 					content: publication.Content,
										// 				});
										// 			}}
										// 			color="black"
										// 		/>
										// 	</span>
										// </Tooltip>,
										<Tooltip label="Archiver dans les brouillons">
											<span>
												<ViewOffIcon onClick={() => uiUpdateArticle(publication.id)} color="black" />
											</span>
										</Tooltip>,
										<Tooltip label="Supprimer définitivement">
											<span>
												<DeleteIcon onClick={() => uiDeleteArticle(publication.id)} color="black" />
											</span>
										</Tooltip>,
									]}
									likes={publication.totalLikes}
									views={publication.totalViews}
									view="publisher"
								/>
							</GridItem>
						))}
				</Grid>
				{/* <Modal isOpen={editor} size="full" onClose={() => setEditor(false)}>
					<ModalOverlay />
					<ModalContent bg="black">
						<ModalHeader color="gray.100">Brouillon</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Editor
								placeholderTitle={article.title}
								placeholderTopic={article.topic}
								placeholderContent={article.content}
							/>
						</ModalBody>
					</ModalContent>
				</Modal> */}
			</VStack>
		</>
	);
};

export default Publications;
