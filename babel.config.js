module.exports = {
  presets: [
    [
      'next/babel',
    ],
  ],
  env: {
    test: {

    },
    dev: {
      plugins: [
        ['import', { libraryName: 'antd', style: 'css' }],
      ],
    },
    production: {
      plugins: [
        ['import', { libraryName: 'antd', style: 'css' }],
      ],
    },
  },
};