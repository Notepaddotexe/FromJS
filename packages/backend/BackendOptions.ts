import * as path from "path";

export class BackendOptions {
  bePort: number;
  proxyPort: number;
  sessionDirectory: string;
  onReady: () => void;
  dontTrack: any[];

  constructor({ bePort, proxyPort, sessionDirectory, onReady, dontTrack }) {
    this.bePort = bePort;
    this.proxyPort = proxyPort;
    this.sessionDirectory = sessionDirectory;
    this.onReady = onReady;
    this.dontTrack = dontTrack;
  }

  getCertDirectory() {
    return path.resolve(this.sessionDirectory, "certs");
  }

  getTrackingDataDirectory() {
    return path.resolve(this.sessionDirectory, "tracking-data");
  }

  getRootCertPath() {
    return path.resolve(this.getCertDirectory(), "certs", "ca.pem");
  }

  getSessionJsonPath() {
    return path.resolve(this.sessionDirectory, "session.json");
  }

  getLocStorePath() {
    return path.resolve(this.sessionDirectory, "locs");
  }
}
