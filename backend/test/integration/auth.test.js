const request = require('supertest');
const { Category } = require('../../models/category');
const { User } = require('../../models/user');

// let server;

describe('auth middleware', () => {
	beforeEach(() => {
		server = require('../../index');
		token = new User().generateAuthToken();
	});
	afterEach(async () => {
		await server.close();
		await Category.deleteMany({});
	});

	let token;

	const execute = async () => {
		return await request(server).post('/api/categories').set('x-auth-token', token).send({ title: 'title1', description: 'description1' });
	};

	// beforeEach(async () => {
	// 	token = new User().generateAuthToken();
	// });

	it('should return 401 if no token is provided', async () => {
		token = '';
		const res = await execute();
		expect(res.status).toBe(401);
	});

	it('should return 400 if token is invalid', async () => {
		token = 'a';
		const res = await execute();
		expect(res.status).toBe(400);
	});

	it('should return 200 if token is valid', async () => {
		const res = await execute();
		expect(res.status).toBe(200);
	});
});
