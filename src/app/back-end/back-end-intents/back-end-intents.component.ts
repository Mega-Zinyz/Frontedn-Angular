import { Component, OnInit } from '@angular/core';
import { IntentService } from '../../services/intent.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Intent } from '../../models/intent.model';

@Component({
  selector: 'app-back-end-intents',
  templateUrl: './back-end-intents.component.html',
  styleUrls: ['./back-end-intents.component.css']
})
export class BackEndIntentsComponent implements OnInit {
  intents: Intent[] = [];
  newIntent: Intent = { id: 0, name: '', examples: '' };
  notificationMessage: string = '';

  constructor(
    private intentService: IntentService, 
    private http: HttpClient, 
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadIntents();
  }

  showNotification(message: string) {
    this.notificationMessage = message;
    setTimeout(() => {
      this.notificationMessage = ''; // Clear notification after 3 seconds
    }, 3000);
  }

  importIntents() {
    this.intentService.importIntents().subscribe(
      (response: any) => {
        this.showNotification(response.message);
        this.loadIntents();
      },
      error => {
        this.showNotification('Error importing intents');
        console.error('Error importing intents:', error);
      }
    );
  }

  exportIntents() {
    this.intentService.exportIntents().subscribe(
      (response) => {
        this.showNotification('nlu.yml updated successfully');
        console.log('Intents exported successfully');
      },
      (error) => {
        this.showNotification('Error exporting intents');
        console.error('Error exporting intents', error);
      }
    );
  }

  loadIntents() {
    this.intentService.getIntents().subscribe(
      (data: Intent[]) => {
        this.intents = data;
        this.resetTextareaHeight();
      },
      (error) => {
        this.showNotification('Error loading intents');
        console.error('Error loading intents:', error);
      }
    );
  }

  resetForm() {
    this.newIntent.name = ''; // Clear the name field
    this.newIntent.examples = ''; // Clear the examples field
      setTimeout(() => {
      this.resetTextareaHeight(); // Reset textarea height after form reset
    }, 1); // Delay to allow for view update
  }

  saveIntent() {
    if (this.newIntent.name.trim() === '' || this.newIntent.examples.trim() === '') {
      this.showNotification('Both fields must be filled out');
      return;
    }

    if (this.newIntent.id === 0) {
      this.intentService.saveIntent(this.newIntent).subscribe(
        (response) => {
          this.showNotification('Intent added successfully');
          this.loadIntents();
          this.resetForm();
        },
        (error) => {
          console.error('Error saving intent:', error);
        }
      );
    } else {
      this.intentService.updateIntent(this.newIntent).subscribe(
        (response) => {
          this.showNotification('Intent updated successfully');
          this.loadIntents();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating intent:', error);
        }
      );
    }
  }

  editIntent(intent: Intent) {
    this.newIntent = { ...intent };
    setTimeout(() => {
      this.resetTextareaHeight(); // Ensure textarea height resets after DOM update
    }, 1); // Delay to allow for view update
  }

  resetTextareaHeight(): void {
    const textarea = document.querySelector('textarea[name="examples"]') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    }
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
  }

  deleteIntent(id: number) {
    this.intentService.deleteIntent(id).subscribe(
      (response) => {
        this.showNotification('Intent deleted successfully');
        this.loadIntents();
      },
      (error) => {
        console.error('Error deleting intent:', error);
      }
    );
  }

  onInput(event: Event) {
    this.autoResize(event); // Call autoResize when input is detected
  }
}
