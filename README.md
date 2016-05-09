README
======

Installation
------------
```
npm install
make clean build pack
```

A zip file will be created under `./dist`

Configuration
-------------
- `cortex.image_app.dataset_id`: The Silo dataset id. See below for the details.

Silo Dataset
------------
This application expects the playlist data to be stored in `cortex.image_app.dataset_id`. The dataset is expected to have the following columns:
- `url`: The url of the image to be displayed.
- `duration`: The image will be displayed on the screen for `duration` milliseconds.

Caching
-------
- This application will make use of the cached Silo data. After a Cortex player restart, if there is no internet connection, the last known data from Silo will be used until the connection is restored and Silo sends down a new data set.
- The images will be cached on disk for a month.
