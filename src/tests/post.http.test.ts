import { expect } from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index';
import Post from '../models/Post';
import User from '../models/User';

interface User {
	_id: string;
	email: string;
	password: string;
	username: string;
	createdAt: Date;
	updatedAt: Date;
}

let token = 'any';
let currentUser: User;

describe('[TEST] POSTS HTTP', () => {
	before(async () => {
		const user = {
			email: 'any@email.com',
			username: 'any_username',
			password: 'any_password',
		};
		const newUser = await User.create(user);
		currentUser = newUser;

		token = jwt.sign({ id: newUser._id }, 'secret', {
			expiresIn: 86400,
		});
	});

	describe('GET /posts', () => {
		it('should return a array with all posts', async () => {
			const post = {
				title: 'Any title',
				body: 'Any content',
				author_id: currentUser._id,
				tags: [],
			};

			await Post.create(post);
			const res = await request(app).get('/posts').send();
			expect(res.status).to.equal(200);
		});
	});

	describe('POST /posts', () => {
		it('should create a post', async () => {
			const post = {
				title: 'Any title 1',
				body: 'Any content 1',
				tags: ['Any', 'Tag'],
			};

			const res = await request(app)
				.post('/posts/')
				.set('Authorization', `Bearer ${token}`)
				.send(post);

			const data = res.body;
			expect(data.title).to.equal(post.title);
			expect(data.body).to.equal(post.body);
			expect(data).has.property('author_id');
			expect(data.tags).to.have.same.members(post.tags);
			expect(res.status).to.equal(201);
		});
	});

	describe('GET /posts/:id', () => {
		it('should get a post by id', async () => {
			const post = {
				title: 'Any title 1',
				body: 'Any content 1',
				author_id: currentUser._id,
				tags: ['Any', 'Tag'],
			};

			const newPost = await Post.create(post);

			const res = await request(app)
				.get('/posts/' + newPost._id)
				.send();

			const data = res.body;
			expect(res.status).to.equal(200);
			expect(data.title).to.equal(newPost.title);
			expect(data.body).to.equal(newPost.body);
		});
	});

	describe('PUT /posts/:id', () => {
		it('should update a post', async () => {
			const post = {
				title: 'Any title 1',
				body: 'Any content 1',
				author_id: currentUser._id,
				tags: ['Any', 'Tag'],
			};

			const newPost = await Post.create(post);
			const newPostData = {
				title: 'Any title 2',
				body: 'Any content 2',
			};

			const res = await request(app)
				.put('/posts/' + newPost._id)
				.set('Authorization', `Bearer ${token}`)
				.send(newPostData);

			const data = res.body;
			expect(res.status).to.equal(200);
			expect(data.title).to.equal(newPostData.title);
			expect(data.body).to.equal(newPostData.body);
		});
	});

	describe('DELETE /posts/:id', () => {
		it('should delete a post', async () => {
			const post = {
				title: 'Any title 1',
				body: 'Any content 1',
				author_id: currentUser._id,
				tags: ['Any', 'Tag'],
			};

			const newPost = await Post.create(post);

			const res = await request(app)
				.delete('/posts/' + newPost._id)
				.set('Authorization', `Bearer ${token}`)
				.send();

			expect(res.status).to.equal(204);
		});
	});

	after((done) => {
		Post.deleteMany({}).then(() => {
			User.deleteMany({}).then(() => {
				done();
			});
		});
	});
});
