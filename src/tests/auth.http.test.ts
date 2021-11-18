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
	});

	afterEach((done) => {
		User.deleteMany({}).then(() => {
			done();
		});
	});
});
