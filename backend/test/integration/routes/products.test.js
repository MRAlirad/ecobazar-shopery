const request = require('supertest');
const { Product } = require('../../../models/product');
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
	});

	describe('Get /', () => {
		it('should returns all products', async () => {
			await Product.collection.insertMany([
				{ title: 'product1', description: 'description1' },
				{ title: 'product2', description: 'description2' },
			]);

			const res = await request(server).get('/api/products');

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('data');
			expect(res.body.data.length).toBe(2);
			expect(res.body.data.some(c => c.title === 'product1')).toBeTruthy();
			expect(res.body.data.some(c => c.title === 'product2')).toBeTruthy();
		});
	});

	describe('Get /:productId', () => {
		let id;

		const execute = async () => {
			return await request(server).get(`/api/products/${id}`);
		};

		beforeEach(async () => {
			const product = new Product({
				title: 'product1',
				description: 'description1',
				images: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
				price: 100,
				count: 4,
				status: 1,
				category: new mongoose.Types.ObjectId().toHexString(),
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

	describe('Post /', () => {
		let token, title, description, images, price, count, discount, status, category;

		const execute = async () => {
			return await request(server).post('/api/products').set('x-auth-token', token).send({
				title,
				description,
				images,
				price,
				count,
				status,
				category,
				discount,
			});
		};

		beforeEach(async () => {
			token = new User().generateAuthToken();
			title = 'product1';
			description = 'description1';
			images = ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'];
			price = 100;
			count = 4;
			discount = 5;
			status = 1;
			category = new mongoose.Types.ObjectId().toHexString();
		});

		it('should return 401 if client is not logged in', async () => {
			token = '';
			const res = await execute();
			expect(res.status).toBe(401);
		});

		test.each(['title', 'description', 'images', 'price', 'count', 'discount', 'status', 'category'])('should return 400 if %s is not provided', async value => {
			if (value === 'title') title = '';
			else if (value === 'description') description = '';
			else if (value === 'images') images = [];
			else if (value === 'price') price = '';
			else if (value === 'count') count = '';
			else if (value === 'discount') discount = '';
			else if (value === 'status') status = '';
			else if (value === 'category') category = '';

			const res = await execute();
			expect(res.status).toBe(400);
		});

		it('should save the product if it is valid', async () => {
			await execute();
			const product = await Product.find({ title: 'product1' });
			expect(product).not.toBeNull();
		});

		it('should return the product if it is valid', async () => {
			const res = await execute();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'product1');
			expect(res.body).toHaveProperty('description', 'description1');
		});
	});

	describe('PATCH /:productId', () => {
		let token, id, title, description, images, price, count, discount, status, category;

		const execute = async () => {
			return await request(server).patch(`/api/products/${id}`).set('x-auth-token', token).send({
				title,
				description,
				images,
				price,
				count,
				status,
				category,
				discount,
			});
		};

		beforeEach(async () => {
			const product = new Product({
				title: 'product1',
				description: 'description1',
				images: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
				price: 100,
				count: 4,
				status: 1,
				discount: 5,
				category: new mongoose.Types.ObjectId().toHexString(),
			});
			await product.save();

			token = new User().generateAuthToken();
			id = product._id;
			title = 'newTitle';
			description = 'newDescription';
			images = ['https://images.pexels.com/photos/100587/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'];
			price = 15000;
			count = 6;
			discount = 12;
			status = 2;
			category = new mongoose.Types.ObjectId().toHexString();
		});

		it('should return 401 if client is not logged in', async () => {
			token = '';
			const res = await execute();
			expect(res.status).toBe(401);
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

		test.each(['title', 'description', 'images', 'price', 'count', 'discount', 'status', 'category'])('should return 400 if %s is not provided', async value => {
			if (value === 'title') title = '';
			else if (value === 'description') description = '';
			else if (value === 'images') images = [];
			else if (value === 'price') price = '';
			else if (value === 'count') count = '';
			else if (value === 'discount') discount = '';
			else if (value === 'status') status = '';
			else if (value === 'category') category = '';

			const res = await execute();
			expect(res.status).toBe(400);
		});

		it('should save the product if it is valid', async () => {
			await execute();
			const product = await Product.find({ title: 'newTitle' });
			expect(product).not.toBeNull();
		});

		it('should return the product if it is valid', async () => {
			const res = await execute();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'newTitle');
			expect(res.body).toHaveProperty('description', 'newDescription');
		});
	});

	describe('DELETE /:productId', () => {
		let token, id;
		const execute = async () => {
			return await request(server).delete(`/api/products/${id}`).set('x-auth-token', token);
		};

		beforeEach(async () => {
			const product = new Product({
				title: 'product1',
				description: 'description1',
				images: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
				price: 100,
				count: 4,
				status: 1,
				discount: 5,
				category: new mongoose.Types.ObjectId().toHexString(),
			});
			await product.save();

			token = new User().generateAuthToken();
			id = product._id;
		});

		it('should return 401 if client is not logged in', async () => {
			token = '';
			const res = await execute();
			expect(res.status).toBe(401);
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

		it('should return the deleted category if valid id is passed', async () => {
			const res = await execute();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'product1');
			expect(res.body).toHaveProperty('description', 'description1');
		});
	});
});
