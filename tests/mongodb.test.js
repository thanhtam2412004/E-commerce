import test from 'node:test';
import assert from 'node:assert/strict';

process.env.MONGODB_URI = 'mongodb://127.0.0.1:1/green_atelier';

test('dbConnect returns null when MongoDB is unavailable', async () => {
  const { default: dbConnect } = await import('../lib/mongodb.js');
  const connection = await dbConnect();

  assert.equal(connection, null);
});
