import { Pool, PoolClient } from 'pg';
import configs from '../configs';

const pool = new Pool({
  host: configs.db_host,
  port: configs.db_port,
  database: configs.db_name,
  user: configs.db_user,
  password: configs.db_password
});

export default {
  connect: async (): Promise<PoolClient> => {
    const client = await pool.connect();
    return client;
  }
};
