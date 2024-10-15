import * as React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { VStack } from '@chakra-ui/react';

import YooptaEditor, { createYooptaEditor, YooptaContentValue } from '@yoopta/editor';
import { plainText } from '@yoopta/exports';
import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Embed from '@yoopta/embed';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Image from '@yoopta/image';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';
import Code from '@yoopta/code';
import Table from '@yoopta/table';
import Divider from '@yoopta/divider';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';

const plugins = [
	Paragraph,
	Table,
	Divider,
	HeadingOne,
	HeadingTwo,
	HeadingThree,
	Blockquote,
	Callout,
	NumberedList,
	BulletedList,
	TodoList,
	Code,
	Link,
	Embed,
	Image,
	Video,
	File,
];

const TOOLS = {
	ActionMenu: {
		render: DefaultActionMenuRender,
		tool: ActionMenuList,
	},
	Toolbar: {
		render: DefaultToolbarRender,
		tool: Toolbar,
	},
	LinkTool: {
		render: DefaultLinkToolRender,
		tool: LinkTool,
	},
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const Editor = ({
	setValue,
	value,
	readOnly = false,
}: {
	setValue?: ({ stringify, serialized }: { stringify: string; serialized: string }) => void;
	value?: YooptaContentValue;
	readOnly?: boolean;
}): JSX.Element => {
	const editor = useMemo(() => createYooptaEditor(), []);
	const selectionRef = useRef(null);

	const handleChange = (newValue: YooptaContentValue) => {
		if (!setValue || readOnly) return;
		const serialized = plainText.serialize(editor, newValue);
		setValue({ stringify: JSON.stringify(newValue), serialized });
	};

	useEffect(() => {
		editor.on('change', handleChange);
		return () => {
			// [IMPORTANT] - unsubscribe from event on unmount
			editor.off('change', handleChange);
		};
	}, [editor]);

	return (
		<VStack w="100%" maxW="720px" ref={selectionRef}>
			<YooptaEditor
				width="100%"
				selectionBoxRoot={selectionRef}
				editor={editor}
				plugins={plugins}
				tools={TOOLS}
				marks={MARKS}
				autoFocus
				value={value}
				readOnly={readOnly}
			/>
		</VStack>
	);
};

export default Editor;
