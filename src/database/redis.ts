import { createClient } from 'redis';

const client = createClient({ url: 'redis://default@localhost:6379' });

client.on('connect', () => {
  console.log('Connected to Redis.');
});

client.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

export default client;
