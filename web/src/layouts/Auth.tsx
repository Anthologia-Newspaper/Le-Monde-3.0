import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Center, Image, Text, VStack, keyframes, useColorMode } from '@chakra-ui/react';

import BackgroundImage from 'theme/images/background.jpeg';
import ColorModeSwitcher from 'components/ColorModeSwitcher';

const moveInBg = keyframes`
	from {
		transform: scale(1) translateX(0px) translateY(0px);
	}
	17% {
		transform: scale(2) translateX(200px) translateY(200px)
	}
	33% {
		transform: scale(2) translateX(-200px) translateY(200px)
	}
	50% {
		transform: scale(1) translateX(0px) translateY(0px)
	}
	66% {
		transform: scale(2) translateX(200px) translateY(-200px)
	}
	84% {
		transform: scale(2) translateX(-200px) translateY(-200px)
	}
	to {
		transform: scale(1) translateX(0px) translateY(0px);
	}
`;

const changeColor = keyframes`
	from {
		filter: hue-rotate(0deg)
	}
	to {
		filter: hue-rotate(360deg)
	}
`;

const Auth = ({ children }: { children: JSX.Element }): JSX.Element => {
	const location = useLocation();
	const [path, setPath] = useState('');
	const { colorMode } = useColorMode();

	const animationBg = `${moveInBg} 60s linear 0s infinite alternate`;
	const animationColor = `${changeColor} 60s linear 0s infinite alternate`;

	useEffect(() => {
		setPath(location.pathname);
	}, [location]);

	return (
		<Box position="relative" w="100vw" h="100vh" animation={animationColor}>
			<Box
				zIndex="1"
				position="absolute"
				left="0"
				right="0"
				w="100%"
				h="100%"
				overflow="hidden"
				filter={colorMode === 'dark' ? 'none' : 'invert(1) !important'}
			>
				<Image w="100%" h="100%" objectFit="cover" src={BackgroundImage} animation={animationBg} />
			</Box>
			<Box zIndex="2" position="absolute" left="0" right="0" w="100%" h="100%" bg="black" opacity="0.2" />
			<ColorModeSwitcher zIndex="4" position="absolute" right="16px" top="16px" />
			<Center w="100%" h="100%" position="relative" zIndex="3">
				<VStack
					p={{ base: '8px', lg: '80px' }}
					backdropFilter="blur(56px)"
					borderRadius="md"
					boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
				>
					<VStack spacing="56px" filter={colorMode === 'dark' ? 'none' : 'invert(1) !important'}>
						<VStack spacing="0px">
							<Text id="app-title" variant="h1" textAlign="center" color="#4bebf9 !important">
								Anthologia
							</Text>
							<Text
								id="app-description"
								variant="p"
								textAlign="center"
								color="white !important"
							>
								Le journal décentralisé luttant contre la censure.
							</Text>
						</VStack>
						<VStack w="100%" maxW="496px">
							{children}
						</VStack>
					</VStack>
				</VStack>
			</Center>
		</Box>
	);
};

export default Auth;
