import * as React from 'react';
import { useState } from 'react';
import { Badge, Select, Stack, Text, VStack } from '@chakra-ui/react';

import SearchInput from 'components/Inputs/SearchInput';

const Author = (): JSX.Element => {
	const [search, setSearch] = useState('');

	return (
		<VStack align="start" w="100%" spacing={{ base: '24px', md: '32px', lg: '40px' }}>
			<VStack w="100%">
				{/* // TODO: username et autres */}
				<Text variant="h4">Username</Text>
				<Stack direction={{ base: 'column', md: 'row' }}>
					<Badge colorScheme="red" variant="solid" fontSize={{ base: 'small', lg: 'md' }} borderRadius="xsm">
						0 articles publiés - 0 j'aimes
					</Badge>
					<Badge colorScheme="pink" variant="solid" fontSize={{ base: 'small', lg: 'md' }} borderRadius="xsm">
						0 articles aimés
					</Badge>
					<Badge colorScheme="green" variant="solid" fontSize={{ base: 'small', lg: 'md' }} borderRadius="xsm">
						0 marque-pages
					</Badge>
				</Stack>
			</VStack>
			<Stack align="start" direction={{ base: 'column', md: 'row' }} w="100%">
				<Select
					variant="primary-1"
					sx={{
						'> option': {
							background: '#212529',
						},
					}}
				>
					<option>Articles publiés</option>
					<option>Articles aimés</option>
					<option>Marque-pages</option>
				</Select>
				<SearchInput
					value={search}
					inputId="brouillons-search-input"
					w="100%"
					placeholder="Cherchez avec un mot clé"
					onChange={(e) => setSearch(e.target.value)}
					variant="primary-1"
				/>
			</Stack>
		</VStack>
	);
};

export default Author;
