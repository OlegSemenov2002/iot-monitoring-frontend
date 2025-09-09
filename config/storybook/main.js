const path = require('path');

module.exports = {

    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    staticDirs: [path.resolve(__dirname, '../../public')],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};
