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
  