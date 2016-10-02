import authConfig from 'config/auth-config';
import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.use.plugin('aurelia-validation');

  aurelia.use.plugin('aurelia-configuration', config => {
      config.setEnvironment('development');
  });

  aurelia.use.plugin('aurelia-authentication', baseConfig => {
      baseConfig.configure(authConfig);
  });  

  //Uncomment the line below to enable animation.
  aurelia.use.plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
