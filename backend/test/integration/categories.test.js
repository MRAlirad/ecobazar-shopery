const request = require('supertest');
const { Category } = require('../../models/category');
const { User } = require('../../models/user');

let server;

describe('/api/categories', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(async () => {
		server.close();
		await Category.deleteMany({});
	});

	describe('GET /', () => {
		it('should return all categories', async () => {
			await Category.collection.insertMany([
				{ title: 'category1', description: 'description1' },
				{ title: 'category2', description: 'description2' },
			]);

			const res = await request(server).get('/api/categories');

			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some(c => c.title === 'category1')).toBeTruthy();
			expect(res.body.some(c => c.title === 'category2')).toBeTruthy();
			console.log(res.body.length);
		});
	});

	describe('GET /:id', () => {
		it('should return a category if valid id is passed', async () => {
			const category = new Category({ title: 'category1', description: 'description1' });
			await category.save();

			const res = await request(server).get(`/api/categories/${category._id}`);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('title', category.title);
			expect(res.body).toHaveProperty('description', category.description);
		});

		it('should return a category if valid id is passed', async () => {
			const res = await request(server).get(`/api/categories/1`);
			expect(res.status).toBe(404);
		});
	});

	describe('POST /', () => {
		it('should return 401 if client is not logged in', async () => {
			const res = await request(server).post('/api/categories').send({ title: 'category1', description: 'description1' }).expect(401);
			expect(res.status).toBe(401);
		});

		it('should return 400 if category title is not provided', async () => {
			const token = new User().generateAuthToken();
			const res = await request(server)
				.post('/api/categories')
				.set('x-auth-token', token)
				.send({ description: 'description1' });
			;
			expect(res.status).toBe(400);
		});

		it('should return 400 if category description is not provided', async () => {
			const token = new User().generateAuthToken();
			const res = await request(server)
				.post('/api/categories')
				.set('x-auth-token', token)
				.send({ title: 'title1' });
			;
			expect(res.status).toBe(400);
		});

		it('should save the category if it is valid', async () => {
			const token = new User().generateAuthToken();

			await request(server)
				.post('/api/categories')
				.set('x-auth-token', token)
				.send({ title: 'title1', description: 'description1' });
			;

			const category = await Category.find({ title: 'title1' });
			expect(category).not.toBeNull();
		});

		it('should return the category if it is valid', async () => {
			const token = new User().generateAuthToken();

			const res = await request(server)
				.post('/api/categories')
				.set('x-auth-token', token)
				.send({ title: 'title1', description: 'description1' });
			;

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'title1');
			expect(res.body).toHaveProperty('description', 'description1');
		});
	});
});
