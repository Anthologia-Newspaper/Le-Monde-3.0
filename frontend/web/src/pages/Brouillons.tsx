import * as React from 'react';
import { useState } from 'react';
import { DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Grid, GridItem, HStack, Tag, Tooltip, VStack } from '@chakra-ui/react';

import ArticleCard from 'components/Cards/ArticleCard';
import SearchInput from 'components/Inputs/SearchInput';
import { useUIContext } from 'contexts/ui';
import { useUserContext } from 'contexts/user';

const Brouillons = (): JSX.Element => {
	const [search, setSearch] = useState('');
	const { handleToast } = useUIContext();
	const { data, methods } = useUserContext();

	const uiDeleteArticle = async (articleId: number) => {
		try {
			const res = await methods.articles.delete({ id: articleId });
			handleToast(res, true);
		} catch (error) {
			console.error(error);
		}
	};

	const uiUpdateArticle = async (articleId: number) => {
		try {
			const res = await methods.articles.update({ id: articleId, newDraft: false });
			handleToast(res, true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<VStack w="100%" spacing={{ base: '8px', md: '12px', lg: '16px' }} align="start">
				<SearchInput
					value={search}
					inputId="brouillons-search-input"
					w={{ base: '100%', xl: '640px' }}
					placeholder="Cherchez parmis vos articles publiés"
					onChange={(e) => setSearch(e.target.value)}
					variant="primary-1"
				/>
				<HStack>
					<Tag bg="primary.yellow">
						{
							data.user.articles.written
								.filter((a) => a.draft)
								.filter((p) => (search !== '' ? p.title.includes(search) : true)).length
						}{' '}
						brouillon
						{data.user.articles.written.filter((a) => a.draft).length !== 1 && 's'}
					</Tag>
					<Tag bg="primary.blue">
						{data.user.articles.written
							.filter((a) => a.draft)
							.filter((p) => (search !== '' ? p.title.includes(search) : true))
							.map((p) => p.totalLikes)
							.reduce((a, v) => a + v, 0)}{' '}
						like
						{data.user.articles.written
							.filter((a) => a.draft)
							.filter((p) => (search !== '' ? p.title.includes(search) : true))
							.map((p) => p.totalLikes)
							.reduce((a, v) => a + v, 0) !== 1 && 's'}
					</Tag>
				</HStack>
				<Grid
					templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, minmax(0, 1fr));' }}
					gap={{ base: 2, lg: 4 }}
					w="100%"
				>
					{data.user.articles.written
						.filter((a) => a.draft)
						.filter((p) => (search !== '' ? p.title.includes(search) : true))
						.map((brouillon, index) => (
							<GridItem key={`${index.toString()}`}>
								<ArticleCard
									id={brouillon.id}
									title={brouillon.title}
									// TODO: author name
									author="Author"
									date={new Date().toLocaleDateString('fr-FR')}
									// TODO: topic
									topic="Topic"
									content={brouillon.content}
									actions={[
										<Tooltip label="Publier l'article">
											<span>
												<ExternalLinkIcon onClick={() => uiUpdateArticle(brouillon.id)} color="black" />
											</span>
										</Tooltip>,
										<Tooltip label="Supprimer définitivement">
											<span>
												<DeleteIcon onClick={() => uiDeleteArticle(brouillon.id)} color="black" />
											</span>
										</Tooltip>,
									]}
									view="publisher"
									views={brouillon.totalViews}
									likes={+brouillon.totalLikes}
								/>
							</GridItem>
						))}
				</Grid>
			</VStack>
		</>
	);
};

export default Brouillons;
