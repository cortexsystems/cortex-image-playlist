/* global window */

import View from './view.js';

window.addEventListener('cortex-ready', function() {
  window.Cortex.app.getConfig()
    .then(function(config) {
      const datasetId = config['cortex.image_app.dataset_id'];
      console.info('Application will use dataset: ', datasetId);
      const view = new View(datasetId);
      window.Cortex.scheduler.onPrepare(offer => view.prepare(offer));
    })
    .catch(function(err) {
      console.error('Failed to initialize the application: ', err);
      throw err;
    });
});
