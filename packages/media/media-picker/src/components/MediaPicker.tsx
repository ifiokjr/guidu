import { companionUrl } from '@uidu/media-core';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import Dropbox from '@uppy/dropbox';
import GoogleDrive from '@uppy/google-drive';
import { DashboardModal } from '@uppy/react';
import Url from '@uppy/url';
import '@uppy/url/dist/style.css';
import Webcam from '@uppy/webcam';
import '@uppy/webcam/dist/style.css';
import React, { PureComponent } from 'react';

export default class MediaPicker extends PureComponent<any> {
  static defaultProps = {
    onComplete: console.log,
    open: false,
  };

  private uppy;

  constructor(props) {
    super(props);
    const { onComplete, uploadOptions } = props;
    console.log(props);
    this.uppy = Uppy({
      debug: true,
      allowMultipleUploads: true,
      restrictions: {
        maxNumberOfFiles: null,
        minNumberOfFiles: null,
        maxFileSize: null,
        allowedFileTypes: null,
      },
      autoProceed: true,
    });
    this.uppy
      .use(Webcam)
      .use(uploadOptions.module, uploadOptions.options)
      .use(Url, {
        companionUrl,
      })
      .use(GoogleDrive, {
        companionUrl,
      })
      .use(Dropbox, {
        companionUrl,
      })
      .on('file-added', (file) => {
        console.log(file);
        this.uppy.setFileMeta(file.id, {
          size: file.size,
        });
      })
      .on('complete', (result) => {
        onComplete(result);
      });
  }

  render() {
    console.log(this.props);
    return (
      <DashboardModal
        uppy={this.uppy}
        // plugins={[
        //   'XHRUpload',
        //   'Webcam',
        //   'Url',
        //   'Dropbox',
        //   'GoogleDrive',
        //   'ThumbnailGenerator',
        // ]}
        proudlyDisplayPoweredByUppy={false}
        closeAfterFinish
        closeModalOnClickOutside
        {...this.props}
      />
    );
  }
}
