// @ts-nocheck
import './core/polyfill';
import '@@/core/devScripts';
import { plugin } from './core/plugin';
import { createHistory } from './core/history';
import { ApplyPluginsType } from '/Users/gaoshaoyun/workspace/0/tem/snow-mall-for-master/node_modules/@umijs/runtime';
import { renderClient } from '/Users/gaoshaoyun/workspace/0/tem/snow-mall-for-master/node_modules/@umijs/renderer-react/dist/index.js';
import { routes } from './core/routes';




const getClientRender = (args: { hot?: boolean; routes: any[] } = {}) => plugin.applyPlugins({
  key: 'render',
  type: ApplyPluginsType.compose,
  initialValue: () => {
    return renderClient({
      // @ts-ignore
      routes: args.routes,
      plugin,
      history: createHistory(args.hot),
      isServer: process.env.__IS_SERVER,
      rootElement: 'root',
      defaultTitle: `这是个商城`,
    });
  },
  args,
});

const clientRender = getClientRender({ routes });
export default clientRender();


    window.g_umi = {
      version: '3.2.5',
    };
  

// hot module replacement
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./core/routes', () => {
    const ret = require('./core/routes');
    if (ret.then) {
      ret.then(({ routes }) => {
        getClientRender({ hot: true, routes })();
      });
    } else {
      getClientRender({ hot: true, routes: ret.routes })();
    }
  });
}
