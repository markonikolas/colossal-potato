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

			<aside className='flex flex-col fixed right-0'>
				<section className='flex flex-col gap-6 bg-gray-200 p-5 flex-1'>
					<span>Dashboard</span>
					<span>Posts</span>
					<span className='mt-auto'>Settings</span>
				</section>
			</aside>

			<section className='flex flex-col gap-2 p-5 col-span-3'>
				{posts.map(post => (
					<BlogPostListItem item={post} key={uuidv4()} />
				))}
			</section>
		</PageWrapper>
	);
}

export default Dashboard;
