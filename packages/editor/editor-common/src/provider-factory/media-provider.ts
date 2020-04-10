import { MediaClientConfig } from '@uidu/media-core';
import { UploadParams } from '@uidu/media-picker';

export interface FeatureFlags {}
export type MediaProvider = {
  uploadParams?: UploadParams;

  /**
   * (optional) Used for creating new uploads and finalizing files.
   * NOTE: We currently don't accept MediaClientConfig, because we need config properties
   *       to initialize
   */
  uploadMediaClientConfig?: MediaClientConfig;

  /**
   * (optional) For any additional feature to be enabled
   */
  featureFlags?: FeatureFlags;

  /**
   * Used for displaying Media Cards and downloading files.
   */
  viewMediaClientConfig: MediaClientConfig;
};
