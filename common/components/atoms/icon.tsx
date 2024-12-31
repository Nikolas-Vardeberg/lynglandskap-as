import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { JSX } from "react";

export type LIIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

export const LI =
	(Icon: LIIcon, style: React.CSSProperties = { width: 14, height: 14 }): (() => JSX.Element) =>
	() => <Icon style={style} />;
