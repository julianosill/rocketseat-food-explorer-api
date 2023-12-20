module.exports = {
  apps: [
    {
      name: 'food-explorer-api',
      script: './src/server.js',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
}
