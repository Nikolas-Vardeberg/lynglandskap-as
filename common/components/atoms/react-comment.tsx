import React, { useEffect, useRef } from 'react';

const ReactComment = (props: { text: string }) => {
	const el = useRef<HTMLDivElement>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!el.current) return;
		if (el.current.parentNode) el.current.outerHTML = `<!-- ${props.text} -->`;
	}, [el.current]);

	return <div ref={el} />;
};

export default ReactComment;