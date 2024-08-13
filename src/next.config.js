module.exports = {
    // Other Next.js configurations
    devServer: {
      proxy: {
        '/api': {
          target: 'https://modern-sofa.onrender.com',
          pathRewrite: { '^/api': '' },
          changeOrigin: true,
        },
      },
    },
  };

  module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.optimization.providedExports = true; // Enable providedExports optimization
        config.optimization.usedExports = true;      // Enable usedExports optimization
      }
  
      return config;
    },
  };
  