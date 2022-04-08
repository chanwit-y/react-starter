const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      'dto': path.resolve(__dirname, 'src/Lib/DTO/index.ts'),
      'context-page': path.resolve(__dirname, 'src/Components/Context/../../Page/index.ts'),
      'util': path.resolve(__dirname, 'src/Lib/Utils'),
      'interfaces': path.resolve(__dirname, 'src/shared/interfaces')
    },
  };

  return config;
};