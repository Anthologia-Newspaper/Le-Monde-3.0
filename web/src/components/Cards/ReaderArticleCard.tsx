import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Badge,
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
	useColorMode,
	VStack,
} from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

import Editor from 'components/Editor/Editor';

const ArticleCard = ({
	navigateUrl,
	author,
	content,
	date,
	title,
	likes = 100,
	views = 100,
	topic,
}: {
	navigateUrl: string;
	author: string;
	content: string;
	date: string;
	likes?: number;
	views?: number;
	title: string;
	topic: string;
}): JSX.Element => {
	const navigate = useNavigate();
	const { colorMode } = useColorMode();

	return (
		<Card
			w="100%"
			h="100%"
			cursor="pointer"
			onClick={() => navigate(navigateUrl)}
			_hover={{ background: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
		>
			<CardHeader>
				<VStack spacing="0px" align="start">
					<Heading size="md">{title}</Heading>
					<HStack w="100%" justify="space-between">
						<Text variant="info" color="gray.400">
							@{author}
						</Text>
						<Text variant="info" color="gray.400">
							{date}
						</Text>
					</HStack>
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
						{likes === undefined ? (
							<></>
						) : (
							<Tag>
								<HStack>
									<Text>{views}</Text> <Icon as={FcLike} boxSize={4} />
								</HStack>
							</Tag>
						)}
						{views === undefined ? (
							<></>
						) : (
							<Tag>
								<HStack>
									<Text>{views}</Text> <Icon as={FaEye} boxSize={4} />
								</HStack>
							</Tag>
						)}
					</HStack>
					<Badge variant="outline" colorScheme="gray" lineHeight="24px">
						1 min
					</Badge>
				</Flex>
			</CardFooter>
		</Card>
		// <VStack
		// 	w="100%"
		// 	maxW="400px"
		// 	h="100%"
		// 	p={{ base: '8px', xl: '16px' }}
		// 	bg="gray.900"
		// 	borderRadius="sm"
		// 	justify="space-between"
		// 	spacing="16px"
		// >
		// 	<VStack w="100%" spacing={{ base: '8px', lg: '16px' }}>
		// 		<HStack w="100%" alignItems="center" justifyContent="space-between">
		// 			<Badge colorScheme="blue" borderRadius="xsm">
		// 				{topic}
		// 			</Badge>
		// 			<HStack spacing="8px">
		// 				{actions.map((action, index) => (
		// 					<Box cursor="pointer" key={index.toString()}>
		// 						{action}
		// 					</Box>
		// 				))}
		// 			</HStack>
		// 		</HStack>
		// 	</VStack>
		// </VStack>
	);
};

export default ArticleCard;
