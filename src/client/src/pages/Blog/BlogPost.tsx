import { BlogPostProps } from './types';

function BlogPost({ item }: BlogPostProps) {
	const { title, excerpt, img } = item;

	return (
		<article className='min-w-full max-w-md mx-auto mt-4 overflow-hidden rounded-xl duration-700 cursor-pointer shadow-xl shadow-indigo-50 md:shadow-gray-100 hover:shadow-3xl md:hover:-translate-y-3 md:hover:shadow-indigo-50'>
			<a href='/'>
				<img
					src={img}
					loading='lazy'
					alt={title}
					className='flex items-center justify-center w-full h-48 rounded-t-md bg-gray-200 before:text-gray-300 before:font-bold before:text-2xl before:tracking-wide object-cover'
				/>

				<div className='flex items-center mt-2 pt-3 ml-4 mr-2'>
					<div className='flex-none w-10 h-10 rounded-full overflow-hidden'>
						<img
							src=''
							className='flex items-center justify-center overflow-hidden bg-gray-300 before:text-gray-400 before:text-xs before:text-center before:opacity-0 w-full h-full'
							alt=''
						/>
					</div>
					<div className='ml-3'>
						<span className='block text-gray-900'>Author</span>
						<span className='block text-gray-400 text-sm'>04-04-2022</span>
					</div>
				</div>

				<div className='pt-3 ml-4 mr-2 mb-3'>
					<h2 className='text-xl text-gray-900'>{title}</h2>
					<p className='text-gray-400 text-sm mt-1'>{excerpt}</p>
				</div>
			</a>
		</article>
	);
}

export default BlogPost;
