import {addPath, info} from '@actions/core';
import {cacheDir, downloadTool, extractZip, find} from '@actions/tool-cache';
import {join} from 'path';
import {format} from 'util';

/** Defines the architecture of the Dart SDK. */
export enum Architecture {

  /** Specifies a 32-bit Dart SDK. */
  ia32 = 'ia32',

  /** Specifies a 64-bit Dart SDK. */
  x64 = 'x64'
}

/** Represents a release of the Dark SDK. */
export class DartSdk {

  /** The pattern used to format the URL of the ZIP archive corresponding to the Dart SDK. */
  static readonly downloadUrlPattern: string = 'https://storage.googleapis.com/dart-archive/channels/%s/release/%s/sdk/dartsdk-%s-%s-release.zip';

  /**
   * Creates a new Dart SDK.
   * @param options An object specifying values used to initialize this instance.
   */
  constructor(options: Partial<DartSdkOptions> = {}) {
    const {architecture = Architecture.x64, releaseChannel = ReleaseChannel.stable, version = 'latest'} = options;
    this.architecture = architecture;
    this.releaseChannel = releaseChannel;
    this.version = version;
  }

  /** The architecture of this Dart SDK. */
  readonly architecture: Architecture = Architecture.x64;

  /** Gets the URL of the ZIP archive corresponding to this Dart SDK. */
  get downloadUrl(): string {
    const platform = process.platform == 'win32' ? 'windows' : (process.platform == 'darwin' ? 'macos' : 'linux');
    return format(DartSdk.downloadUrlPattern, this.releaseChannel, this.version, platform, this.architecture);
  }

  /** The release channel of this Dart SDK. */
  readonly releaseChannel: ReleaseChannel = ReleaseChannel.stable;

  /** The version of this Dart SDK. */
  readonly version: string = 'latest';

  /** Installs this Dart SDK. */
  async setup(): Promise<void> {
    let skdDir = find('dart', this.version, this.architecture);
    if (!skdDir) {
      const output = await extractZip(await downloadTool(this.downloadUrl));
      skdDir = await cacheDir(join(output, 'dart-sdk'), 'dart', this.version, this.architecture);
    }

    addPath(join(skdDir, 'bin'));
  }
}

/** Defines the options of a [[DartSdk]] instance. */
interface DartSdkOptions {

  /** The architecture of this Dart SDK. */
  architecture: Architecture;

  /** The release channel of this Dart SDK. */
  releaseChannel: ReleaseChannel;

  /** The version of this Dart SDK. */
  version: string;
}

/** Defines the release channel of the Dark SDK. */
export enum ReleaseChannel {

  /** Specifies a development Dart SDK. */
  dev = 'dev',

  /** Specifies a stable Dart SDK. */
  stable = 'stable'
}