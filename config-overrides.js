const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      'dto': path.resolve(__dirname, 'src/Lib/DTO/index.ts'),
      'context-page': path.resolve(__dirname, 'src/Components/Context/../../Page/index.ts'),
      'context-hook': path.resolve(__dirname, 'src/Components/Context/../../Lib/Hook'),
      'context-service': path.resolve(__dirname, 'src/Components/Context/../../Lib/Service'),
      'util': path.resolve(__dirname, 'src/Lib/Utils'),
      'interfaces': path.resolve(__dirname, 'src/shared/interfaces')
    },
  };

  return config;
};