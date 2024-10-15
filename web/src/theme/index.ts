import { extendTheme } from '@chakra-ui/react';

import Text from './components/text';
import Button from './components/button';
import Input from './components/input';
import Select from './components/select';
import breakpoints from './foundations/breakpoints';
// import colors from './foundations/colors';
import fontWeights from './foundations/fontWeights';
import borderRadius from './foundations/borderRadius';

const overrides = {
	// colors,
	fontWeights,
	...borderRadius,
	breakpoints,
	components: {
		Text,
		Button,
		Input,
		Select,
	},
};

const colors = {
	white: '#ffffff',
	gray: 'gray.900',
	black: '#111111',
};

const semanticTokens = {
	colors: {
		background: {
			default: colors.white,
			_dark: colors.gray,
		},
		text: {
			default: colors.black,
			_dark: colors.white,
		},
		invText: {
			default: colors.white,
			_dark: colors.black,
		},
		primary: {
			default: colors.white,
			_dark: colors.black,
		},
		secondary: {
			default: colors.black,
			_dark: colors.white,
		},
	},
};

const styles = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	global: (props: any) => ({
		'html, body': {
			bg: 'background',
		},
	}),
};

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: true,
};

export default extendTheme(overrides, breakpoints, { config, styles, semanticTokens });
