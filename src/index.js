import Vue from 'vue';
import VueRouter from 'vue-router';
import jQuery from 'jquery';
import jQueryUI from 'jquery-ui';

Vue.use(VueRouter);

// Install the main components
export function install(Vue) {
  const requireComponents = require.context('./components', true, /\.vue$/);
  requireComponents.keys().forEach(key => {
    const component = requireComponents(key);
    let name = key.substring(key.lastIndexOf('/') + 1);
    name = name.substring(0, name.lastIndexOf('.vue'));
    name = name.substring(0, 1).toLowerCase() + name.substring(1);
    Vue.component(name, component);
  });
  /* -- Add more components here -- */
}

// Expose the components
export /* -- Add more components here -- */{};

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install,
};

export { jQuery, jQueryUI };

export default plugin;

// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
