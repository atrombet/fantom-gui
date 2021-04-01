import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'sim-exec',
  templateUrl: './sim-exec.component.html',
  styleUrls: [ './sim-exec.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimExecComponent implements OnInit {
  public renderer: IpcRenderer;
  public waitingForResponse = false;
  public filepath: string;
  public simFile: string;
  public outputLocation: string;
  public SIM_CHANNEL = 'SELECT_SIM_LOCATION';
  public OUTPUT_CHANNEL = 'SELECT_OUTPUT_LOCATION';

  // Determine if there is enough info to trigger the simulation.
  public get simReady(): boolean {
    return !!this.filepath && !!this.simFile && !!this.outputLocation;
  }

  constructor(private electron: ElectronService, private cd: ChangeDetectorRef) {
    this.renderer = this.electron.ipcRenderer;
  }

  /**
   * Angular OnInit Life cycle hook
   */
  public ngOnInit(): void {
    if (this.renderer) {
      // Listen for a message from electron on the sim location channel
      this.renderer.on('SELECT_SIM_LOCATION', (event, path) => {
        this.waitingForResponse = false;
        path = this.forceForwardSlashes(path);
        this.setFilepath(path);
      });

      // Listen for a message from electron on the output location channel
      this.renderer.on('SELECT_OUTPUT_LOCATION', (event, path) => {
        this.waitingForResponse = false;
        path = this.forceForwardSlashes(path);
        this.outputLocation = `${path}/`;
        this.cd.detectChanges();
      });
    }
  }

  /**
   * Sets the filepath and sim file local variables.
   * @param path - the folder path to the simulation.
   */
  public setFilepath(path: string): void {
    // Get the name of the sim file and set.
    const segments = path.split('/');
    // Set the filepath
    this.filepath = `${path}/`;
    this.simFile = `${segments[segments.length - 1]}.xml`;
    this.cd.detectChanges();
  }

  /**
   * Sends a message to the Electron app to grab a file loaction from the file system.
   * @param channel - The name of the IPC channel to send a message to Electron on.
   */
  public getPathFromFS(channel: string): void {
    this.renderer.send(channel);
    this.waitingForResponse = true;
    this.cd.detectChanges();
  }

  /**
   * Sends a message to the electron app to execute the simulation given the provided parameters.
   */
  public onExecuteClick(): void {
    this.renderer.send('EXECUTE_SIMULATION', {
      pathToSimConfig: this.filepath,
      simFile: this.simFile,
      outputPath: this.outputLocation
    });
    this.waitingForResponse = true;
    this.cd.detectChanges();
  }

  private forceForwardSlashes(path: string): string {
    const backslashSegments = path.split('\\');
    if (backslashSegments.length > 1) {
      path = backslashSegments.filter(segment => !!segment).join('/');
    }
    return path;
  }
}
