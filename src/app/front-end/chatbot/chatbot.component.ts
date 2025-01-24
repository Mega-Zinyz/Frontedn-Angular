import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RasaService } from '../../services/rasa.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ChatMessage {
    from: 'user' | 'bot';
    text: string;
    safeText: SafeHtml; // Updated type for safe HTML
    imageUrl?: string; // Optional property for the image URL
}

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements AfterViewChecked {
    messages: ChatMessage[] = [{ text: 'Halo! ada yang bisa saya bantu?', from: 'bot', safeText: '' as SafeHtml }];
    userInput: string = '';
    @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;
    private isUserAtBottom = true;
    isTyping = false;
    isMinimized = false; // New property to track minimized state

    constructor(private rasaService: RasaService, private sanitizer: DomSanitizer) {
        this.sanitizeMessages();
    }

    ngAfterViewChecked() {
        if (this.isUserAtBottom && !this.isMinimized) {
            this.scrollToBottom();
        }
    }

    toggleChat() {
        this.isMinimized = !this.isMinimized; // Toggle minimized state
    }

    sanitizeMessages() {
        this.messages.forEach(message => {
            message.safeText = this.sanitizer.bypassSecurityTrustHtml(message.text);
        });
    }

    sendMessage() {
        if (this.userInput.trim()) {
            const userMessage: ChatMessage = { from: 'user', text: this.userInput, safeText: '' as SafeHtml };
            this.messages.push(userMessage);
            const messageToSend = this.userInput;
            this.userInput = '';

            this.isTyping = true;
            this.rasaService.sendMessage(messageToSend).subscribe(
                (response) => {
                    this.isTyping = false;
                    response.forEach((botReply: any) => {
                        const botMessage: ChatMessage = {
                            from: 'bot',
                            text: botReply.text,
                            safeText: '' as SafeHtml,
                            imageUrl: botReply.imageUrl // Assuming your response includes an image URL
                        };
                        this.messages.push(botMessage);
                    });
                    this.sanitizeMessages();
                    this.checkIfUserIsAtBottom();
                },
                (error) => {
                    this.isTyping = false;
                    console.error('Error connecting to Rasa:', error);
                    const errorMessage: ChatMessage = {
                        from: 'bot',
                        text: 'Maaf, chatbot tidak bisa merespond sekarang.',
                        safeText: '' as SafeHtml
                    };
                    this.messages.push(errorMessage);
                    this.sanitizeMessages();
                    this.checkIfUserIsAtBottom();
                }
            );
        }
    }

    scrollToBottom(): void {
        this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    }

    checkIfUserIsAtBottom() {
        const { scrollTop, scrollHeight, clientHeight } = this.chatMessagesContainer.nativeElement;
        this.isUserAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
        if (this.isUserAtBottom) {
            this.scrollToBottom();
        }
    }

    onKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    onScroll(): void {
        const { scrollTop, scrollHeight, clientHeight } = this.chatMessagesContainer.nativeElement;
        this.isUserAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    }
}
