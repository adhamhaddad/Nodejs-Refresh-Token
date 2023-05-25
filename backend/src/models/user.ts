import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { hash } from '../utils/password';

export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  delete_at: Date;
};
class User {
  async withConnection<T>(
    callback: (connection: PoolClient) => Promise<T>
  ): Promise<T> {
    const connection = await pgClient.connect();
    try {
      return await callback(connection);
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async createUser(u: UserType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const password = await hash(u.password);
      const query = {
        text: `
          INSERT INTO users (first_name, last_name, email, password)
          VALUES ($1, $2, $3, $4)
          RETURNING id, first_name, last_name, email
        `,
        values: [u.first_name, u.last_name, u.email, password]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getUser(id: string): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT id, first_name, last_name, email FROM users WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateUser(id: string, u: UserType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
          UPDATE users SET first_name=$2, last_name=$3, email=$4, updated_at=CURRENT_TIMESTAMP
          WHERE id=$1
          RETURNING id, first_name, last_name, email
        `,
        values: [id, u.first_name, u.last_name, u.email]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteUser(id: string): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE users SET updated_at=CURRENT_TIMESTAMP, deleted_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default User;
