import { useContext, useEffect, useState } from 'react';

import { BlogContext } from '../contexts/BlogContext';

import PageTitle from '../components/Layout/PageTitle';
import PageWrapper from '../components/Layout/PageWrapper';
import BlogPost from './Blog/BlogPost';

const Home = () => {
	const [latestPosts, setLatestPosts] = useState([]);
	const { fetchLatestPosts } = useContext<any>(BlogContext);

	useEffect(() => {
		fetchLatestPosts(3).then((posts: any) => setLatestPosts(posts));
	}, [fetchLatestPosts]);

	return (
		<PageWrapper>
			<PageTitle title='Home' />

			<h2>Read latest blog posts:</h2>

			<section className='flex flex-wrap items-center'>
				{latestPosts.map((post: any) => (
					<BlogPost item={post} />
				))}
			</section>
		</PageWrapper>
	);
};

export default Home;
