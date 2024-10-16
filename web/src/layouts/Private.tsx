import * as React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	HStack,
	Icon,
	Image,
	Slide,
	Stack,
	StackProps,
	Text,
	VStack,
	useBreakpointValue,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FaPenFancy } from 'react-icons/fa6';
import { IoLibrary } from 'react-icons/io5';
import { MdAdminPanelSettings, MdTravelExplore } from 'react-icons/md';

import ColorModeSwitcher from 'components/ColorModeSwitcher';
import BlackLogo from 'theme/logos/black.svg';
import WhiteLogo from 'theme/logos/white.svg';
import { useOnlineUserContext } from 'contexts/onlineUser';
import { useUserContext } from 'contexts/user';
import { useOfflineUserContext } from 'contexts/offlineUser';

type PrivateProps = { children: JSX.Element };

const Option = ({
	icon,
	name,
	isSelected,
	onClick,
	isEnable = true,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any;
	name: string;
	isSelected: boolean;
	onClick: () => void;
	isEnable?: boolean;
}): JSX.Element => (
	<Box
		position="relative"
		w="100%"
		cursor={isEnable ? 'pointer' : 'not-allowed'}
		onClick={() => {
			if (isEnable) onClick();
		}}
	>
		<HStack position="relative" w="100%" opacity={isEnable ? '1' : '0.5'}>
			<Icon as={icon} position="absolute" left="40px" boxSize={10} color={isSelected ? 'primary' : 'gray.400'} />
			<Text
				variant="link"
				fontWeight={isSelected ? 'bold' : 'regular'}
				pl="120px"
				color={isSelected ? 'primary' : 'gray.400'}
				opacity={isEnable ? '1' : '0.5'}
			>
				{name}
			</Text>
		</HStack>
	</Box>
);

const NavBar = ({ ...props }: StackProps): JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const { colorMode } = useColorMode();
	const user = useUserContext();
	const onlineUser = useOnlineUserContext();
	const offlineUser = useOfflineUserContext();

	return (
		<VStack
			w="100%"
			h="100%"
			spacing="56px"
			p="16px 16px 32px 0px"
			borderTopRightRadius="sm"
			borderBottomRightRadius="sm"
			overflowY="scroll"
			{...props}
			css={{
				'&::-webkit-scrollbar': {
					width: '0px',
				},
			}}
		>
			<VStack w="100%" spacing="24px" mt="48px">
				<Image src={colorMode === 'dark' ? WhiteLogo : BlackLogo} w="100%" maxW="80px" maxH="80px" />
				<Text variant="h5" fontWeight="bold">
					{user.data.isOffline ? '' : onlineUser.data.username}
				</Text>
			</VStack>
			<VStack w="100%" spacing="40px">
				<VStack align="start" w="100%">
					<Option
						icon={IoLibrary}
						name="Bibliothèque"
						isSelected={location.pathname === '/bibliotheque'}
						onClick={() => navigate('/bibliotheque')}
						isEnable={user.data.isOffline ? offlineUser.data.config.step === 4 : true}
					/>
				</VStack>
				<VStack align="start" w="100%">
					<Option
						icon={MdTravelExplore}
						name="Explorer"
						isSelected={location.pathname === '/explorer'}
						onClick={() => navigate('/explorer')}
						isEnable={user.data.isOffline ? offlineUser.data.config.step === 4 : true}
					/>
				</VStack>
				<VStack align="start" w="100%">
					<Option
						icon={FaPenFancy}
						name="Rédactions"
						isSelected={location.pathname === '/redactions'}
						onClick={() => navigate('/redactions')}
						isEnable={!user.data.isOffline}
					/>
				</VStack>
				<VStack align="start" w="100%">
					<Option
						icon={MdAdminPanelSettings}
						name="Réglages"
						isSelected={location.pathname === '/reglages'}
						onClick={() => navigate('/reglages')}
					/>
				</VStack>
			</VStack>
		</VStack>
	);
};

const Private = ({ children }: PrivateProps): JSX.Element => {
	const user = useUserContext();
	const onlineUser = useOnlineUserContext();
	const drawer = useDisclosure();
	const slide = useDisclosure();
	const [showCross, setShowCross] = useState(false);
	const collapseNavBar = useBreakpointValue({ base: true, xl: false });

	return (
		<HStack position="relative" align="start" minH="100vh" spacing="0px">
			<ColorModeSwitcher
				zIndex="4"
				position="absolute"
				top={{ base: '8px', md: '16px', lg: '24px' }}
				right={{ base: '8px', md: '16px', lg: '24px' }}
			/>

			{collapseNavBar ? (
				<>
					<Button
						position="absolute"
						top={{ base: '8px', md: '16px', lg: '24px' }}
						left={{ base: '8px', md: '16px', lg: '24px' }}
						zIndex={100}
						onClick={drawer.onOpen}
					>
						<Icon fontSize="24px" as={HamburgerIcon} />
						<Text ml="4px" variant="link">
							{user.data.isOffline ? '' : onlineUser.data.username}
						</Text>
					</Button>
					<Drawer isOpen={drawer.isOpen} placement="left" onClose={drawer.onClose}>
						<DrawerOverlay />
						<DrawerContent w="360px !important">
							<NavBar />
						</DrawerContent>
					</Drawer>
				</>
			) : (
				<>
					<Button
						hidden={!slide.isOpen ? !showCross : false}
						position="absolute"
						top={{ base: '0px', lg: !slide.isOpen ? '8px' : '24px' }}
						left={{ base: '0px', lg: !slide.isOpen ? '272px' : '24px' }}
						zIndex={100}
						onClick={slide.onToggle}
						onMouseOver={() => setShowCross(true)}
					>
						<Icon fontSize={!slide.isOpen ? '12px' : '24px'} as={!slide.isOpen ? CloseIcon : HamburgerIcon} />
					</Button>
					{/* WARNING: change index.css along with the width */}
					<Slide direction="left" in={!slide.isOpen} style={{ zIndex: 10 }} id="slide-navbar">
						<NavBar
							w="320px !important"
							h="100% !important"
							onMouseOver={() => setShowCross(true)}
							onMouseLeave={() => setShowCross(false)}
						/>
					</Slide>
				</>
			)}
			<Stack
				w="100%"
				maxW="100% !important"
				h="100% !important"
				align="center"
				ml={{ base: '0px', xl: !slide.isOpen ? '320px' : '88px' }}
				overflowY="scroll"
				css={{
					'&::-webkit-scrollbar': {
						width: '0px',
					},
				}}
			>
				<VStack
					w="100% !important"
					maxW="720px"
					h="100% !important"
					overflow="visible !important"
					overflowX="hidden"
					p={{
						base: '56px 16px 8px 16px',
						sm: '64px 24px 16px 24px',
						md: '72px 0px 24px 0px',
						lg: '80px 0px 80px 0px',
					}}
				>
					{children}
				</VStack>
			</Stack>
		</HStack>
	);
};

export default Private;
