/* global window */

const CONTAINER_ID = 'container';

class View {
  constructor(datasetId) {
    this.datasetId = datasetId;
    this.data = [];
    this.index = 0;

    window.Cortex.app.onData(this.datasetId, (rows, cached) => {
      this.onData(rows, cached);
    });
  }

  prepare(offer) {
    if (this.data.length === 0) {
      offer();
      return;
    }

    if (this.index >= this.data.length) {
      this.index = 0;
    }

    let row = this.data[this.index];
    let container = window.document.getElementById(CONTAINER_ID);
    this._createDOMNode(container, row.url)
      .then(node => {
        let view = done => {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }

          container.appendChild(node);
          setTimeout(done, row.duration);
        };

        let opts = {
          label: row.url,
          ttl: 60 * 60 * 1000,
          /* eslint camelcase: 0 */
          companion: {
            asset_url: row.url,
            click_url: 'http://www.cortexpowered.com',
            mime_type: 'image/jpeg'
          }
        };

        offer(view, opts);
      }).catch(err => {
        console.error("Failed to create a DOM node for " + row.url, err);
        offer();
      });

    this.index += 1;
  }

  onData(rows, cached) {
    console.log("Received data update. cached: " + cached + ", rows: ", rows);
    this._cacheAndSetRows(rows)
      .then(() => {
        console.log("Images are cached.");
      }).catch(function(err) {
        console.error("Failed to cache images.", err);
      });
  }

  _createDOMNode(container, url) {
    return new Promise((resolve, reject) => {
      let img = new window.Image();
      img.id = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  _cacheAndSetRows(rows) {
    let promises = [];
    const opts = {
      cache: {
        mode: 'normal',
        ttl: 30 * 24 * 60 * 60 * 1000
      }
    };

    for (let row of rows) {
      if (row.url) {
        promises.push(window.Cortex.net.get(row.url, opts));
      }
    }

    return new Promise((resolve, reject) => {
      Promise.all(promises).then(() => {
        this.data = rows;
        resolve();
      }).catch(reject);
    });
  }
}

export default View;
