const request = require('supertest');
const { Category } = require('../../models/category');

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
});
