const { execute } = require('@evershop/mysql-query-builder');

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(
    connection,
    "ALTER TABLE admin_user MODIFY uuid varchar(36) NOT NULL DEFAULT (replace(uuid(),'-',''))"
  );
  await execute(
    connection,
    'ALTER TABLE admin_user ADD UNIQUE KEY `ADMIN_USER_UUID` (`uuid`)'
  );

  await execute(
    connection,
    'ALTER TABLE user_token_secret ADD COLUMN sid varchar(60) NOT NULL AFTER user_id'
  );
  await execute(
    connection,
    'ALTER TABLE user_token_secret DROP INDEX `USER_TOKEN_USER_ID`'
  );
  await execute(
    connection,
    "UPDATE user_token_secret SET sid = replace(uuid(),'-','')"
  );
  await execute(
    connection,
    'ALTER TABLE user_token_secret ADD UNIQUE KEY `USER_TOKEN_SID_UUID` (`sid`)'
  );
  await execute(
    connection,
    'ALTER TABLE user_token_secret ADD UNIQUE KEY `USER_TOKEN_SECRET_UUID` (`secret`)'
  );
};
