const requiredEnvVars = [
  'NODE_ENV',
  'DB_HOST',
  'DB_PASSWORD',
  'DB_DATABASE',
  'HASH_ALGO',
  'HASH_KEY',
  'DIGESTION_TYPE',
  'SESSION_SECRET',
  'API_KEY',
];

const unsetEnvVars = requiredEnvVars.filter(
  envVar => process.env[envVar] === undefined
);

if (unsetEnvVars.length > 0) {
  throw new Error(
    `You're missing some required environemnt variables: ${unsetEnvVars.join(
      ', '
    )}`
  );
}
