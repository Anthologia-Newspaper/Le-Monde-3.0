import text from './text';

const defaultBtn = (bg: string, color: string) => ({
	...text.variants.link,
	bg,
	color,
	borderRadius: 'sm',
	w: '100%',
	transition: 'ease 0.5s',
	_hover: {
		opacity: '80%',
		transition: 'ease 0.5s',
	},
});

const outlineBtn = (borderColor: string) => ({
	border: '2px',
	borderStyle: 'solid',
	borderColor,
});

const button = {
	variants: {
		primary: {
			...defaultBtn('primary', 'secondary'),
		},
		'outline-primary': {
			...defaultBtn('secondary', 'primary'),
			...outlineBtn('primary'),
		},
	},
};

export default button;
