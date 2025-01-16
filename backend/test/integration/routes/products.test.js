const request = require('supertest');
const { Product } = require('../../../models/product');
const { Category } = require('../../../models/category');
const { User } = require('../../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/products', () => {
	beforeEach(() => {
		server = require('../../../index');
	});
	afterEach(async () => {
		await server.close();
		await Product.deleteMany({});
		await Category.deleteMany({});
	});

	describe('Get /', () => {
		it('should returns all products', async () => {
			await Product.collection.insertMany([
				{ title: 'product1', description: 'description1' },
				{ title: 'product2', description: 'description2' },
			]);

			const res = await request(server).get('/api/products');

			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some(c => c.title === 'product1')).toBeTruthy();
			expect(res.body.some(c => c.title === 'product2')).toBeTruthy();
		});
	});

	describe('Get /:productId', () => {
		let id;

		const execute = async () => {
			return await request(server).get(`/api/products/${id}`);
		};

		beforeEach(async () => {
			const category = new Category({ title: 'category1', description: 'category1' });
			await category.save();

			const product = new Product({
				title: 'product1',
				description: 'description1',
				images: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
				price: 100,
				count: 4,
				status: 1,
				category: category._id,
			});
			await product.save();
			id = product._id;
		});

		it('should return 404 if invalid id is passed', async () => {
			id = '1';
			const res = await execute();
			expect(res.status).toBe(404);
		});

		it('should return 404 if no product with the given id exists', async () => {
			id = new mongoose.Types.ObjectId();
			const res = await execute();
			expect(res.status).toBe(404);
		});

		it('should return the product if valid id is passed', async () => {
			const res = await execute();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'product1');
			expect(res.body).toHaveProperty('description', 'description1');
		});
	});
});
