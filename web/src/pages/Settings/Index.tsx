import * as React from 'react';
import { useEffect } from 'react';
import {
	Box,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	VStack,
	useBreakpointValue,
	useSteps,
} from '@chakra-ui/react';

import { useUserContext } from 'contexts/user';
import { useOfflineUserContext } from 'contexts/offlineUser';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step4 from './Step4';
import Profil from './Profil';

const steps = [
	{ title: 'Introduction', description: 'Livre blanc' },
	{ title: 'Paramètres', description: 'Accès IPFS' },
	{ title: 'Rafraîchissement', description: 'Récupération des articles' },
	{ title: 'Confirmation', description: 'Profil hors-ligne' },
];

const Settings = (): JSX.Element => {
	const user = useUserContext();
	const offlineUser = useOfflineUserContext();
	const horizontalStepper = useBreakpointValue({ base: false, '3xl': true });

	const { activeStep, setActiveStep } = useSteps({
		index: offlineUser.data.config.step,
		count: steps.length,
	});

	useEffect(() => {
		offlineUser.methods.config.setStep(activeStep);
	}, [activeStep]);

	return (
		<Tabs isFitted variant="enclosed" w="100%" h="100%">
			<TabList>
				<Tab>Mode hors-ligne</Tab>
				<Tab isDisabled={user.data.isOffline}>Profil utilisateur</Tab>
			</TabList>

			<TabPanels w="100%" h="100%">
				<TabPanel>
					<Stepper
						mt="24px"
						mb="56px"
						index={activeStep}
						orientation={horizontalStepper ? 'horizontal' : 'vertical'}
						height={horizontalStepper ? '64px' : '240px'}
						gap="0"
					>
						{steps.map((step, index) => (
							<Step key={index}>
								<StepIndicator>
									<StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
								</StepIndicator>

								<Box flexShrink="0">
									<StepTitle>{step.title}</StepTitle>
									<StepDescription>{step.description}</StepDescription>
								</Box>

								<StepSeparator />
							</Step>
						))}
					</Stepper>
					<VStack align="start" justify="center" mb="32px" w="100%" maxW="720px" spacing="48px">
						{activeStep === 0 && <Step0 setActiveStep={setActiveStep} />}
						{activeStep === 1 && <Step1 setActiveStep={setActiveStep} />}
						{activeStep === 2 && <Step2 setActiveStep={setActiveStep} />}
						{activeStep === 4 && <Step4 setActiveStep={setActiveStep} />}
					</VStack>
				</TabPanel>
				<TabPanel w="100%" h="100%">
					<VStack w="100%" h="100%" spacing={{ base: '8px', sm: '16px', md: '24px' }} align="start">
						<Profil />
					</VStack>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default Settings;
