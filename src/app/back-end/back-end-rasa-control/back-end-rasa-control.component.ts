import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RasaService } from '../../services/rasa.service';
import { interval, Subscription } from 'rxjs';
import { RasaStatusResponse } from '../../models/rasa-status-response.model';

@Component({
  selector: 'app-back-end-rasa-control',
  templateUrl: './back-end-rasa-control.component.html',
  styleUrls: ['./back-end-rasa-control.component.css']
})
export class BackEndRasaControlComponent implements OnInit, OnDestroy {
  rasaLogs: string = ''; 
  secondLogs: string = ''; 
  rasaServerState: 'stopped' | 'starting' | 'running' | 'idle' = 'stopped'; 
  logFetchInterval: Subscription | undefined; 
  parsedRasaLogs: any[] = []; // Array to store parsed logs
  @ViewChild('rasaLogContainer') rasaLogContainer!: ElementRef; 
  @ViewChild('secondLogContainer') secondLogContainer!: ElementRef; 

  constructor(private rasaService: RasaService) {}

  ngOnInit() {
    this.fetchRasaLogs();
    this.fetchSecondLogs(); 
    this.logFetchInterval = interval(5000).subscribe(() => {
      this.fetchRasaLogs(); 
      this.fetchSecondLogs(); 
    });
  }

  startRasa() {
    if (this.rasaServerState === 'starting' || this.rasaServerState === 'running') return; 

    this.rasaServerState = 'starting'; 
    this.rasaService.startRasa().subscribe(
      (response) => {
        this.rasaLogs += `Rasa starting: ${response.message}\n`;
        this.checkRasaStatus(); 
      },
      (error) => {
        this.rasaLogs += `Error starting Rasa: ${error.message}\n`;
        this.rasaServerState = 'idle'; 
      }
    );
  }

  stopRasa() {
    if (this.rasaServerState === 'stopped' || this.rasaServerState === 'idle') return; 

    this.rasaService.stopRasa().subscribe(
      (response) => {
        this.rasaLogs += `Rasa stopped: ${response.message}\n`;
        this.rasaServerState = 'idle'; 
        this.checkRasaStatus(); 
      },
      (error) => {
        this.rasaLogs += `Error stopping Rasa: ${error.message}\n`;
      }
    );
  }

  restartRasa() {
    if (this.rasaServerState === 'running' || this.rasaServerState === 'starting') {
        this.stopRasa();
        setTimeout(() => this.restartRasa(), 1000); 
    } else {
        this.rasaService.restartRasa().subscribe(
            response => {
                console.log('Rasa server restarted successfully:', response);
            },
            error => {
                console.error('Error restarting Rasa:', error);
            }
        ); 
    }
  }

  fetchRasaLogs() {
    this.rasaService.getTodayLogs().subscribe(
      (response: string) => {
        this.rasaLogs = response; // Update logs
        this.parseLogs(response); // Parse and structure logs
        this.scrollToBottom(this.rasaLogContainer); // Scroll to the bottom for Rasa logs
        this.checkRasaStatus(); // Check the status after fetching logs
      },
      (error) => {
        console.error('Error fetching Rasa logs:', error);
        this.rasaLogs = `Error fetching Rasa logs: ${error.message || 'Unknown error'}`;
      }
    );
  }
  
  fetchSecondLogs() {
    this.rasaService.getGeneralLogs().subscribe(
      (response: string) => {
        this.secondLogs = response; // Update second logs
        this.scrollToBottom(this.secondLogContainer); // Scroll to the bottom for second logs
      },
      (error) => {
        console.error('Error fetching second logs:', error);
        this.secondLogs = `Error fetching second logs: ${error.message || 'Unknown error'}`;
      }
    );
  }
  
  private parseLogs(rawLogs: string) {
    try {
      // Assuming the raw logs are JSON strings
      const logs = JSON.parse(rawLogs);
      this.parsedRasaLogs = logs.map((log: any) => ({
        ...log,
        message: this.removeEscapeCharacters(log.message),
        timestamp: new Date(log.timestamp)
      }));
    } catch (error) {
      console.error('Error parsing logs:', error);
    }
  }

  private removeEscapeCharacters(str: string): string {
    return str.replace(/\u001b\[[0-9;]*m/g, '');  // Remove escape characters like colors
  }

  private scrollToBottom(container: ElementRef) {
    if (container) {
      setTimeout(() => {
        container.nativeElement.scrollTop = container.nativeElement.scrollHeight; // Scroll to the bottom
      }, 100); // Timeout to ensure DOM updates before scrolling
    }
  }  

  private checkRasaStatus() {
    this.rasaService.getStatus().subscribe(
      (status: RasaStatusResponse) => {
        this.rasaServerState = status.running ? 'running' : 'stopped'; 
        this.rasaLogs += `Rasa server state checked: ${this.rasaServerState}\n`;
      },
      (error) => {
        console.error('Error checking Rasa status:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.logFetchInterval) {
      this.logFetchInterval.unsubscribe(); 
    }
  }
}
