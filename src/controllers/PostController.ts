import Post from '../models/Post';
import { Request, Response } from 'express';

interface PaginationQuery {
	page: number;
	limit: number;
}

class PostController {
	async index(req: Request<never, never, never, PaginationQuery>, res: Response) {
		const { page = 1, limit = 10 } = req.query;

		const posts = await Post.find()
			.populate('author_id')
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const count = await Post.countDocuments();

		res.json({
			posts,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
		});
	}

	async show(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const post = await Post.findById(id).populate('author_id');

			if (!post) {
				return res.status(404).json({ error: 'Post was not found!' });
			}

			return res.status(200).json(post);
		} catch (err) {
			return res.status(400).json({ error: 'Error retrieving data!', err });
		}
	}

	async create(req: Request, res: Response) {
		const { title, body, tags } = req.body;
		try {
			const post = {
				title,
				author_id: req.user.id,
				body,
				tags,
			};

			const post_data = await Post.create(post);
			return res.status(201).json(post_data);
		} catch (err) {
			return res.status(400).json({ error: 'Error registering post', err });
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { user } = req;
		const new_data = req.body;

		try {
			const post = await Post.findById(id);

			if (!post) {
				return res.status(404).json({ error: 'Post was not found!' });
			}

			if (post.author_id != user.id) {
				return res.status(403).json({ error: 'Invalid user!' });
			}

			const post_data = await Post.findOneAndUpdate({ _id: id }, new_data, {
				new: true,
			});

			return res.json(post_data);
		} catch (err) {
			return res.status(400).json({ error: 'Error updating data!', err });
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		const { user } = req;

		try {
			const post = await Post.findById(id);

			if (!post) {
				return res.status(404).json({ error: 'Post was not found!' });
			}

			if (post.author_id != user.id) {
				return res.status(403).json({ error: 'Invalid user!' });
			}

			await post.remove();

			return res.status(204).json({ message: 'Post annotation has been deleted!' });
		} catch (err) {
			return res.status(400).json({ error: 'Error deleting data!' });
		}
	}
}

export default new PostController();
