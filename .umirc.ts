import { defineConfig } from 'umi';

export default defineConfig({
  title: '项目名称',
  dva: {
    hmr: true,
    immer: true,
  },
  history: {
    type: 'hash',
  },
  chainWebpack(config: any) {
    config.module
      .rule('bpmnlint-loader')
      .test(/\.bpmnlintrc$/)
      .use('bpmnlint-loader')
      .loader('bpmnlint-loader');
  },
  publicPath: '/',
});
