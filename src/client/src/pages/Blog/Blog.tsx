import { useEffect, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BlogContext } from '../../contexts/BlogContext';

import BlogPost from './BlogPost';
import PageTitle from '../../components/Layout/PageTitle';
import PageWrapper from '../../components/Layout/PageWrapper';

export default function Blog() {
	const { fetchBlogs } = useContext<any>(BlogContext);
	const [posts, setPosts] = useState<object[]>([]);

	useEffect(() => {
		if (!posts.length) {
			fetchBlogs().then((posts: object[]) => setPosts(posts));
		}
	}, [fetchBlogs, posts]);

	return (
		<PageWrapper>
			<PageTitle title='Blog' desc='Blogs that are loved by the community. Updated every hour.' />
			<div className='mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
				{posts.map((item: any)=>  
					<BlogPost item={item} key={uuidv4()} />
				)}
			</div>
		</PageWrapper>
	);
}
