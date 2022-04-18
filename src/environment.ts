export default {
    // General
    appName: '',
    version: '',
    documentationPath: '/docs',
    port: 3000,

    // Security
    jwt_algorithm: 'HS512',
    jwt_secret: 'MyApiIsFullySecure',
    jwt_expiresIn: '2d',

    // Database
    db_user: 'postgres',
    db_password: 'postgres',
    db_host: 'localhost',
    db_port: 5432,
    db_database: 'postgres',
    db_table_suffix: "rant"
}