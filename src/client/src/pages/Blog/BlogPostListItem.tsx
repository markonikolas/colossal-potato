import { truncate } from 'lodash-es';
import { BlogPostProps } from './types';
import { FC } from 'react';

const BlogPostListItem: FC<BlogPostProps> = ({ blog }) => {
	const { title, excerpt } = blog;

	return (
		<article className='min-w-full max-w-md mx-auto mt-4 cursor-pointer'>
			<a href='/'>
				<h3 className='text-xl text-gray-900'>{title}</h3>
                <p>{truncate(excerpt)}</p>
			</a>
		</article>
	);
}

export default BlogPostListItem;
