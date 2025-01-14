const request = require('supertest');

let server;

describe('/api/products', () => {
	beforeEach(() => (server = require('../../index')));
	afterEach(() => server.close());

	describe('GET /', () => {
		it('should return all products', async () => {
			const res = await request(server).get('/api/products');
			expect(res.status).toBe(200);
		});
	});
});
