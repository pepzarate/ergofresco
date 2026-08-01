import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
	return (tree, file) => {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);
		file.data.astro.frontmatter.minutesRead = readingTime.text;
	};
}
