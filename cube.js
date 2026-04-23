module.exports = {
  dbType: ({ dataSource }) => {
    if (dataSource === 'clickhouse') return 'clickhouse';
    return 'mysql';
  },
  driverFactory: ({ dataSource }) => {
    if (dataSource === 'clickhouse') {
      const ClickHouseDriver = require('@cubejs-backend/clickhouse-driver');
      return new ClickHouseDriver({
        host: process.env.CLICKHOUSE_HOST,
        port: process.env.CLICKHOUSE_PORT || 8123,
        database: process.env.CLICKHOUSE_DB,
        user: process.env.CLICKHOUSE_USER || 'default',
        password: process.env.CLICKHOUSE_PASSWORD || '',
      });
    }
    const MySQLDriver = require('@cubejs-backend/mysql-driver');
    return new MySQLDriver({
      host: process.env.CUBEJS_DB_HOST,
      port: process.env.CUBEJS_DB_PORT || 3306,
      database: process.env.CUBEJS_DB_NAME,
      user: process.env.CUBEJS_DB_USER,
      password: process.env.CUBEJS_DB_PASS,
    });
  },
};
