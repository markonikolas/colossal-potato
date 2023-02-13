import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
			<PageTitle title='Home' desc='Read our latest blog posts' />

			<section className='flex flex-wrap'>
				{latestPosts.map((post: any) => (
					<BlogPost item={post} key={uuidv4()} />
				))}
			</section>
		</PageWrapper>
	);
};

export default Home;
