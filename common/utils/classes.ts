// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const clsx = (...args: any[]) => {
	return args.filter(Boolean).join(' ');
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const tw = (strings: TemplateStringsArray, ...args: any[]) => {
	return clsx(strings.map((str, i) => [str, args[i]].filter(Boolean).join(' ')));
};