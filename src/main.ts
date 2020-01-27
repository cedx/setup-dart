import {getInput} from '@actions/core';
import {arch} from 'os';
import {Architecture, DartSdk, ReleaseChannel} from './dart_sdk';

/**
 * Sets up the Dart SDK.
 * @return Completes when the Dart SDK is installed.
 */
export async function main(): Promise<void> {
  const architecture = (getInput('architecture') || arch()) as Architecture;
  const releaseChannel = (getInput('release-channel') || ReleaseChannel.stable) as ReleaseChannel;
  const version = getInput('version') || 'latest';
  return new DartSdk({architecture, releaseChannel, version}).install();
}
