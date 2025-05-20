module.exports = api => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      test: {
        plugins: [
          [
            'inline-dotenv',
            {
              path: '.env',
            },
          ],
        ],
      },
    },
  };
};
