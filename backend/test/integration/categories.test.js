const request = require('supertest');
const { Category } = require('../../models/category');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/categories', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(async () => {
		await server.close();
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

		it('should return 404 if invalid id is passed', async () => {
			const res = await request(server).get(`/api/categories/1`);
			expect(res.status).toBe(404);
		});

		it('should return 404 if no genre with the given id exists', async () => {
			const id = new mongoose.Types.ObjectId();
			const res = await request(server).get(`/api/categories/${id}`);
			expect(res.status).toBe(404);
		});
	});

	describe('POST /', () => {
		//! Define the happy path, and then in each test, we change 1 parameter that clearly aligns with the name of the test!

		let token, title, description;

		const execute = async () => {
			return await request(server).post('/api/categories').set('x-auth-token', token).send({ title, description });
		};

		beforeEach(async () => {
			token = new User().generateAuthToken();
			title = 'title1';
			description = 'description1';
		});

		it('should return 401 if client is not logged in', async () => {
			token = '';
			const res = await execute();
			expect(res.status).toBe(401);
		});

		it('should return 400 if category title is not provided', async () => {
			title = '';
			const res = await execute();
			expect(res.status).toBe(400);
		});

		it('should return 400 if category description is not provided', async () => {
			description = '';
			const res = await execute();
			expect(res.status).toBe(400);
		});

		it('should save the category if it is valid', async () => {
			await execute();
			const category = await Category.find({ title: 'title1' });
			expect(category).not.toBeNull();
		});

		it('should return the category if it is valid', async () => {
			const res = await execute();
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'title1');
			expect(res.body).toHaveProperty('description', 'description1');
		});
	});
});
