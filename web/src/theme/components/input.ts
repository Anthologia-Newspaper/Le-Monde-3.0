import text from './text';

const defaultInput = {
	field: {
		_focus: {
			border: 'none',
			outline: 'solid 3px',
			outlineColor: 'primary.yellow',
			outlineOffset: '-2px',
		},
		_placeholder: {
			color: 'gray.300',
		},
		borderRadius: 'sm',
		padding: '8px 16px',
		bg: 'transparent',
		border: '1px solid white',
		color: 'white',
		...text.variants.p,
	},
};

const input = {
	variants: {
		primary: {
			...defaultInput,
		},
		'file-primary-orange': {
			field: {
				_focus: {
					border: 'none',
					outline: 'solid 3px',
					outlineColor: 'primary.yellow',
					outlineOffset: '-2px',
				},
				_hover: {
					opacity: '80%',
					transition: 'ease 0.5s',
				},
				borderRadius: 'md',
				padding: '8px 16px',
				bg: 'primary.orange',
				color: 'black',
				...text.variants.link,
			},
		},
	},
};

export default input;
