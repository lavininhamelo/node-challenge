import { expect } from 'chai';
import request from 'supertest';
import app from '../index';
import User from '../models/User';

describe('[TEST] AUTH HTTP', () => {
	describe('POST /register', () => {
		it('should create a new user correctly', async () => {
			const user = {
				email: 'any@email.com',
				username: 'any_username',
				password: 'any_password',
			};
			const res = await request(app)
				.post('/register')
				.send({ email: user.email, username: user.username, password: user.password });
			expect(res.status).to.equal(200);
			expect(user.email).to.equal(res.body.email);
			expect(user.username).to.equal(res.body.username);
			expect(res.body).has.property('_id');
		});

		it('should return 400 if the email already exists', async () => {
			const firstUser = {
				email: 'any@email.com',
				username: 'any_username',
				password: 'any_password',
			};
			await User.create(firstUser);

			const user = {
				email: 'any@email.com',
				username: 'any_username1',
				password: 'any_password1',
			};
			const res = await request(app)
				.post('/register')
				.send({ email: user.email, username: user.username, password: user.password });
			expect(res.status).to.equal(400);
		});

		it('should return 400 if the username already exists', async () => {
			const firstUser = {
				email: 'any@email.com',
				username: 'any_username',
				password: 'any_password',
			};
			await User.create(firstUser);

			const user = {
				email: 'any1@email.com',
				username: 'any_username',
				password: 'any_password1',
			};
			const res = await request(app)
				.post('/register')
				.send({ email: user.email, username: user.username, password: user.password });
			expect(res.status).to.equal(400);
		});
	});

	describe('POST /signin', () => {
		it('should authenticate user', async () => {
			const user = {
				email: 'any@email.com',
				username: 'any_username',
				password: 'any_password',
			};
			await User.create(user);
			const res = await request(app)
				.post('/signin')
				.send({ email: 'any@email.com', password: 'any_password' });
			expect(res.status).to.equal(200);
			expect(res.body).has.property('token');
			expect(res.body).has.property('user');
		});

		it('should return 403 if password is invalid', async () => {
			const user = {
				email: 'any@email.com',
				username: 'any_username',
				password: 'any_password',
			};
			await User.create(user);
			const res = await request(app)
				.post('/signin')
				.send({ email: 'any@email.com', password: 'invalid_password' });
			expect(res.status).to.equal(403);
		});

		it('should return 403 if user do not exits', async () => {
			const user = {
				email: 'any@email.com',
				username: 'any_username',
				password: 'any_password',
			};
			await User.create(user);
			const res = await request(app)
				.post('/signin')
				.send({ email: 'nouser@email.com', password: 'any_password' });
			expect(res.status).to.equal(403);
		});

		it('should return 403 if a password is empty', async () => {
			const user = {
				email: 'any@email.com',
				username: 'any_username',
				password: 'any_password',
			};
			await User.create(user);
			const res = await request(app).post('/signin').send({ email: 'any@email.com', password: '' });
			expect(res.status).to.equal(403);
		});

		it('should return 403 if a email is empty', async () => {
			const user = {
				email: 'any@email.com',
				username: 'any_username',
				password: 'any_password',
			};
			await User.create(user);
			const res = await request(app).post('/signin').send({ email: '', password: 'any_password' });

			expect(res.status).to.equal(403);
		});
	});

	afterEach((done) => {
		User.deleteMany({}).then(() => {
			done();
		});
	});
});
