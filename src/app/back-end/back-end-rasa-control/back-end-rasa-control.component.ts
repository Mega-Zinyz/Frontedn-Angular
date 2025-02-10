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
  parsedRasaLogs: any[] = []; // Array to store parsed logs
  secondLogs: any[] = []; // Store second logs as an array
  rasaServerState: 'stopped' | 'starting' | 'running' | 'idle' = 'stopped'; 
  logFetchInterval: Subscription | undefined; 
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
        this.parsedRasaLogs.push({ timestamp: new Date(), log_level: 'info', message: `Rasa starting: ${response.message}` });
        this.checkRasaStatus(); 
      },
      (error) => {
        this.parsedRasaLogs.push({ timestamp: new Date(), log_level: 'error', message: `Error starting Rasa: ${error.message}` });
        this.rasaServerState = 'idle'; 
      }
    );
  }

  stopRasa() {
    if (this.rasaServerState === 'stopped' || this.rasaServerState === 'idle') return; 

    this.rasaService.stopRasa().subscribe(
      (response) => {
        this.parsedRasaLogs.push({ timestamp: new Date(), log_level: 'info', message: `Rasa stopped: ${response.message}` });
        this.rasaServerState = 'idle'; 
        this.checkRasaStatus(); 
      },
      (error) => {
        this.parsedRasaLogs.push({ timestamp: new Date(), log_level: 'error', message: `Error stopping Rasa: ${error.message}` });
      }
    );
  }

  async restartRasa() {
    if (this.rasaServerState === 'running' || this.rasaServerState === 'starting') {
      this.stopRasa();
      setTimeout(() => this.restartRasa(), 2000); // Delay to allow the server to stop before restarting
    } else {
      try {
        const response = await this.rasaService.restartRasa().toPromise();
        this.parsedRasaLogs.push({ timestamp: new Date(), log_level: 'info', message: 'Rasa server restarted successfully' });
        this.checkRasaStatus(); 
      } catch (error) {
        this.parsedRasaLogs.push({ timestamp: new Date(), log_level: 'error', message: `Error restarting Rasa: ${error}` });
      }
    }
  }

  fetchRasaLogs() {
    this.rasaService.getTodayLogs().subscribe(
      (response: string) => {
        this.parseLogs(response); 
        this.scrollToBottom(this.rasaLogContainer);
        this.checkRasaStatus(); 
      },
      (error) => {
        console.error('Error fetching Rasa logs:', error);
        this.parsedRasaLogs.push({ timestamp: new Date(), log_level: 'error', message: `Error fetching Rasa logs: ${error.message || 'Unknown error'}` });
      }
    );
  }

  fetchSecondLogs() {
    this.rasaService.getGeneralLogs().subscribe(
      (response: string) => {
        this.secondLogs = this.parseLogs(response); 
        this.scrollToBottom(this.secondLogContainer);
      },
      (error) => {
        console.error('Error fetching second logs:', error);
        this.secondLogs = [{ timestamp: new Date(), log_level: 'error', message: `Error fetching second logs: ${error.message || 'Unknown error'}` }];
      }
    );
  }

  parseLogs(rawLogs: string) {
    try {
      const logs = JSON.parse(rawLogs);
      return logs.map((log: any) => ({
        ...log,
        timestamp: new Date(log.timestamp),
        message: this.removeEscapeCharacters(log.message)
      }));
    } catch (error) {
      console.error('Error parsing logs:', error);
      return [];
    }
  }

  removeEscapeCharacters(str: string): string {
    return str.replace(/\u001b\[[0-9;]*m/g, '');  // Remove escape characters like colors
  }

  scrollToBottom(container: ElementRef) {
    if (container) {
      setTimeout(() => {
        container.nativeElement.scrollTop = container.nativeElement.scrollHeight;
      }, 100);
    }
  }

  private checkRasaStatus() {
    this.rasaService.getStatus().subscribe(
      (status: RasaStatusResponse) => {
        this.rasaServerState = status.running ? 'running' : 'stopped'; 
        this.parsedRasaLogs.push({ timestamp: new Date(), log_level: 'info', message: `Rasa server state checked: ${this.rasaServerState}` });
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
