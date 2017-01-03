/*
 * Configuration setting for DB connection
 */
module.exports = {
  database: {
    name: 'domo_dsr',
    host: 'root',
    password: 'root',
    port: 3306,
    engine: 'INNODB',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    paranoid: false,
    syncOnAssociation: true
  }
}
