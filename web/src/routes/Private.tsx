import * as React from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import PrivateLayout from 'layouts/Private';
import { useUserContext } from 'contexts/user';
import { useUIContext } from 'contexts/ui';
import { useOnlineUserContext } from 'contexts/onlineUser';
import { CircularProgress, VStack } from '@chakra-ui/react';

const Private = (): JSX.Element => {
	const user = useUserContext();
	const onlineUser = useOnlineUserContext();
	const ui = useUIContext();

	useEffect(() => {
		if (!user.data.isOffline) {
			ui.online.user.me();
		}
	}, []);

	if (!user.data.isOffline && onlineUser.data.id === 0) {
		return (
			<VStack w="100%" h="100%" justify="center">
				<CircularProgress size="120px" isIndeterminate />
			</VStack>
		);
	}

	return (
		<PrivateLayout>
			<Outlet />
		</PrivateLayout>
	);
};

export default Private;
