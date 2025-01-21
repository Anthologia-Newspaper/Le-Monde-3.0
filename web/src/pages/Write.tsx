import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	CircularProgress,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Select,
	Stack,
	Text,
	Textarea,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { useUIContext } from 'contexts/ui';
import { Topic } from 'types/topic';
import Editor from 'components/Editor/Editor';
import { useOnlineUserContext } from 'contexts/onlineUser';
import { Article } from 'types/article';

const Write = (): JSX.Element => {
	const navigate = useNavigate();
	const ui = useUIContext();
	const onlineUser = useOnlineUserContext();
	const toast = useToast();
	const [draftArticle, setDraftArticle] = useState<Article | undefined>(undefined);
	const [topics, setTopics] = useState<Topic[]>([]);
	const [title, setTitle] = useState('');
	const [topic, setTopic] = useState<Topic | undefined>(undefined);
	const [content, setContent] = useState({ stringify: '', serialized: '' });

	const uiCreateOrUpdateArticle = async (draft: boolean) => {
		if (title === '') {
			toast({
				title: 'Veuillez écrire un titre.',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else if (topic === undefined) {
			toast({
				title: 'Veuillez sélectionner un sujet.',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else if ((draft && content.serialized.length < 2) || (!draft && content.serialized.length < 200)) {
			toast({
				title: 'Veuillez écrire un contenu plus long.',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else if (onlineUser.extraData.articleToUpdate !== undefined) {
			console.log('stringify', content.stringify);
			console.log('serialized', content.serialized);
			await ui.online.articles.update(
				{
					id: onlineUser.extraData.articleToUpdate,
					newTitle: title,
					newContent: content.stringify,
					newRawContent: content.serialized,
					newTopic: topic.id,
					newDraft: draft,
				},
				(id: number) => {
					if (!draft) {
						navigate(`/articles/${id}`);
					} else {
						navigate(`/redactions`);
					}
				},
			);
		} else {
			await ui.online.articles.create(
				{
					title,
					content: content.stringify,
					rawContent: content.serialized,
					topic: topic.id,
					draft,
				},
				(id: number) => {
					if (!draft) {
						navigate(`/articles/${id}`);
					} else {
						navigate(`/redactions`);
					}
				},
			);
		}
	};

	useEffect(() => {
		if (onlineUser.extraData.articleToUpdate !== undefined) {
			ui.online.articles.search.oneDraft(onlineUser.extraData.articleToUpdate, setDraftArticle);
		}
		ui.online.topics.search.all(setTopics);
	}, []);

	useEffect(() => {
		if (onlineUser.extraData.articleToUpdate !== undefined && draftArticle !== undefined) {
			setTitle(draftArticle.title);
			setTopic(draftArticle.topic);
			setContent({ stringify: draftArticle.content, serialized: draftArticle.rawContent });
		}
	}, [draftArticle]);

	if (onlineUser.extraData.articleToUpdate !== undefined && content.stringify === '') {
		return (
			<VStack w="100%" h="100%" justify="center">
				<CircularProgress size="120px" isIndeterminate />
			</VStack>
		);
	}

	return (
		<VStack w="100%" h="100%" spacing="8px">
			<Stack w="100%" direction={{ base: 'column-reverse', sm: 'row' }}>
				<Stack align="center" w="100%" ml="16px" direction={{ base: 'column', sm: 'row' }}>
					<Text>De quoi parle votre article ?</Text>
					<Select
						w="auto"
						onChange={(e) => setTopic(topics.find((t) => t.name === e.target.value))}
						value={topic?.name}
						sx={{
							'> option': {
								background: '#212529',
							},
						}}
					>
						<option value="">-- À choisir --</option>
						{topics.map((t, index) => (
							<option key={index}>{t.name}</option>
						))}
					</Select>
				</Stack>
				<Menu>
					<MenuButton
						minW="fit-content !important"
						w={{ base: '100% !important', sm: 'fit-content !important' }}
						as={Button}
						rightIcon={<ChevronDownIcon />}
						isDisabled={title === '' || topic === undefined}
					>
						Sauvegarder
					</MenuButton>
					<MenuList>
						<MenuItem onClick={async () => await uiCreateOrUpdateArticle(false)}>Publier</MenuItem>
						<MenuItem onClick={async () => await uiCreateOrUpdateArticle(true)}>
							Enregirster dans les brouillons
						</MenuItem>
					</MenuList>
				</Menu>
			</Stack>
			<Textarea
				border="none"
				h="auto"
				placeholder="Titre"
				fontSize="32px"
				fontWeight="black"
				p="8px 16px 8px 8px"
				value={title}
				maxLength={100}
				onKeyPress={(e) => {
					if (e.key === 'Enter') e.preventDefault();
				}}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Editor setValue={setContent} value={content.stringify !== '' ? JSON.parse(content.stringify) : undefined} />
		</VStack>
	);
};

export default Write;
