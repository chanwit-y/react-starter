// const path = require('path');

// module.exports = function override(config) {
//   config.resolve = {
//     ...config.resolve,
//     alias: {
//       ...config.alias,
//       'dto': path.resolve(__dirname, 'src/Lib/DTO/index.ts'),
//       'type': path.resolve(__dirname, 'src/Lib/Observable/../../@types/index.ts'),
//       'context-page': path.resolve(__dirname, 'src/Components/Context/../../Page/index.ts'),
//       'context-hook': path.resolve(__dirname, 'src/Components/Context/../../Lib/Hook'),
//       'context-service': path.resolve(__dirname, 'src/Components/Context/../../Lib/Service'),
//       'util': path.resolve(__dirname, 'src/Lib/Utils'),
//       'interfaces': path.resolve(__dirname, 'src/shared/interfaces')
//     },
//   };

//   return config;
// };

const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@dto':  path.resolve(__dirname, 'src/Lib/DTO'),
      '@type': path.resolve(__dirname, 'src/@types'),
      '@component': path.resolve(__dirname, 'src/Components'),
      '@context': path.resolve(__dirname, 'src/Components/Context'),
      '@page': path.resolve(__dirname, 'src/Page'),
      '@hook': path.resolve(__dirname, 'src/Lib/Hook/*'),
      '@service': path.resolve(__dirname, 'src/Lib/Service/*'),
      '@util': path.resolve(__dirname, 'src/Lib/Utils'),
      '@context-hook': path.resolve(__dirname, 'src/Components/Context/../../Lib/Hook'),
      '@context-types': path.resolve(__dirname, 'src/Components/Context/../../@types'),
      '@context-service': path.resolve(__dirname, 'src/Components/Context/../../Lib/Service'),
      '@context-util': path.resolve(__dirname, 'src/Components/Context/../../Lib/Utils'),
      '@context-common': path.resolve(__dirname, 'src/Components/Context/../Common'),
      '@context-observable': path.resolve(__dirname, 'src/Components/Context/../../Lib/Observable'),
      '@context-constant': path.resolve(__dirname, 'src/Components/Context/../../Lib/Constants'),
      '@component-util': path.resolve(__dirname, 'src/Components/../Lib/Utils'),
      '@reducer-types': path.resolve(__dirname, 'src/Components/Context/Reducer/../../../@types'),
      '@page-util': path.resolve(__dirname, 'src/Page/../Lib/Utils'),
    },
  },
};