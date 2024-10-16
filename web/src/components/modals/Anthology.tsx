import * as React from 'react';
import { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	VStack,
	Input,
	ModalFooter,
	Button,
} from '@chakra-ui/react';

const AnthologyModal = ({
	isOpen,
	onClose,
	type,
	action,
	name = '',
	description = '',
}: {
	isOpen: boolean;
	onClose: () => void;
	type: 'CREATE' | 'UPDATE';
	action: (name: string, description: string) => Promise<void>;
	name?: string;
	description?: string;
}) => {
	const [newName, setNewName] = useState(name);
	const [newDescription, setNewDescription] = useState(description);

	React.useEffect(() => {
		setNewName(name);
		setNewDescription(description);
	}, [name, description]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				setNewName(name);
				setNewDescription(description);
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{type === 'CREATE' ? 'Nouveau dossier' : 'Modification du dossier'}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing="8px">
						<Input placeholder="Titre" onChange={(e) => setNewName(e.target.value)} value={newName} />
						<Input
							placeholder="Description"
							onChange={(e) => setNewDescription(e.target.value)}
							value={newDescription}
						/>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button
						onClick={async () => {
							await action(newName, newDescription);
							// TODO: title and description cleared even if action failed
							setNewName('');
							setNewDescription('');
						}}
					>
						{type === 'CREATE' ? 'Créer' : 'Modifier'}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AnthologyModal;
