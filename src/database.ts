import { Pool } from 'pg';
import environment from './environment';

const connectionString = `postgresql://${environment.db_user}:${environment.db_password}@${environment.db_host}:${environment.db_port}/${environment.db_database}`;

export default new Pool({
  connectionString,
})