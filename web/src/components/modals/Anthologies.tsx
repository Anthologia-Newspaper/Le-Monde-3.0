import * as React from 'react';
import {
	Badge,
	HStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Text,
	VStack,
	useDisclosure,
	Kbd,
	Tag,
	useColorMode,
} from '@chakra-ui/react';

import { Anthology, OfflineAnthology } from 'types/anthology';
import AnthologyModal from './Anthology';
import { PlusSquareIcon } from '@chakra-ui/icons';

const AnthologiesModal = ({
	isOpen,
	onClose,
	isOffline,
	onlineAnthologies,
	offlineAnthologies,
	createAnthology,
	onlineAction,
	offlineAction,
}: {
	isOpen: boolean;
	onClose: () => void;
	isOffline: boolean;
	onlineAnthologies?: Anthology[];
	offlineAnthologies?: OfflineAnthology[];
	createAnthology: (name: string, description: string) => Promise<void>;
	onlineAction: (id: number) => Promise<void>;
	offlineAction: (id: string) => void;
}) => {
	const { colorMode } = useColorMode();
	const createDiscolsure = useDisclosure();
	const createIsOpen = createDiscolsure.isOpen;
	const createOnOpen = createDiscolsure.onOpen;
	const createOnClose = createDiscolsure.onClose;

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Dossiers</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing="8px" mb="12px" align="start">
							<HStack>
								<Tag>
									{isOffline ? offlineAnthologies!.length : onlineAnthologies!.length} dossier
									{isOffline ? offlineAnthologies!.length !== 1 && 's' : onlineAnthologies!.length !== 1 && 's'}
								</Tag>
								<HStack cursor="pointer" onClick={() => createOnOpen()}>
									<Text variant="info">
										<u>Nouveau dossier</u>
									</Text>
									<PlusSquareIcon />
								</HStack>
							</HStack>
							{isOffline
								? offlineAnthologies!.map((anthology, index) => (
										<HStack
											key={index.toString()}
											bg={colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100'}
											w="100%"
											align="baseline"
											justify="space-between"
											p={{ base: '8px', xl: '16px' }}
											borderRadius="sm"
											cursor="pointer"
											_hover={{ opacity: 0.9 }}
											onClick={() => offlineAction(anthology.id)}
										>
											<Text cursor="pointer" _hover={{ opacity: '0.8' }}>
												{anthology.name}
											</Text>
											<Badge colorScheme="green" borderRadius="xsm">
												{anthology.articles.length} article{anthology.articles.length !== 1 && 's'}
											</Badge>
										</HStack>
								  ))
								: onlineAnthologies!.map((anthology, index) => (
										<HStack
											key={index.toString()}
											bg={colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100'}
											w="100%"
											align="baseline"
											justify="space-between"
											p={{ base: '8px', xl: '16px' }}
											borderRadius="sm"
											cursor="pointer"
											_hover={{ opacity: 0.9 }}
											onClick={() => onlineAction(anthology.id)}
										>
											<Text cursor="pointer" _hover={{ opacity: '0.8' }}>
												{anthology.name}
											</Text>
											{/* // TODO: nombre d'articles */}
											<span>
												<Kbd>x articles</Kbd>
											</span>
										</HStack>
								  ))}
						</VStack>
					</ModalBody>
				</ModalContent>
				<ModalFooter></ModalFooter>
			</Modal>

			<AnthologyModal
				isOpen={createIsOpen}
				onClose={createOnClose}
				type="CREATE"
				action={async (name, description) => {
					await createAnthology(name, description);
					// TODO: create modal closes even if action failed
					createOnClose();
				}}
			/>
		</>
	);
};

export default AnthologiesModal;
