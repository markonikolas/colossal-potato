import { BlogContext } from '../../contexts/BlogContext';
import { useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import BlogPostListItem from '../Blog/BlogPostListItem';
import PageWrapper from '../../components/Layout/PageWrapper';
import PageTitle from '../../components/Layout/PageTitle';

function Dashboard() {
	const [posts, setPosts] = useState([]);

	const { fetchBlogs } = useContext(BlogContext);

	useEffect(() => {
		(async function getAllPosts() {
			const blogPosts = await fetchBlogs();
			setPosts(() => blogPosts);
		})();
	}, [fetchBlogs]);

	return (
		<PageWrapper className='relative'>
			<PageTitle title='Dashboard' />

			<aside className='flex flex-col fixed right-44 top-44'>
				<section className='flex flex-col gap-6 bg-gray-100 shadow-lg px-6 py-4 flex-1 rounded-lg'>
					<span>My Posts</span>
					<span>Profile</span>
				</section>
			</aside>

			<section className='flex flex-col gap-2'>
				<h3 className='font-bold text-2xl'>My Posts</h3>
				{posts.map(post => (
					<BlogPostListItem item={post} key={uuidv4()} />
				))}
			</section>
		</PageWrapper>
	);
}

export default Dashboard;
