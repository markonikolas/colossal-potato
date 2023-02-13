import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FiLoader } from 'react-icons/fi';

import { BlogContext } from '../../contexts/BlogContext';

import PageWrapper from '../../components/Layout/PageWrapper';

const SingleBlogPost = () => {
	const [post, setPost] = useState<any>();
	const { fetchBlog } = useContext<any>(BlogContext);
	const { id } = useParams();

	useEffect(() => {
		fetchBlog(id).then((data: any) => setPost(data));
	}, [fetchBlog, id]);

	return (
		<PageWrapper className='flex justify-center items-center min-h-[480px]'>
			{!post ? (
				<FiLoader />
			) : (
				<article className='flex flex-col gap-y-6 justify-start'>
					<img className='max-w-site object-cover h-[480px]' src={post.img} alt='' />

					<h1 className='text-3xl font-bold text-gray-800 leading-16 lg:text-5xl'>{post.title}</h1>
					<p className='text-lg lg:text-xl'>{post.content}</p>
				</article>
			)}
		</PageWrapper>
	);
};

export default SingleBlogPost;
