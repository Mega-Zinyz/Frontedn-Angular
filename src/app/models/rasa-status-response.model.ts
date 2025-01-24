// src/app/models/rasa-status-response.model.ts
export interface RasaStatusResponse {
    running: boolean;
    state: 'stopped' | 'starting' | 'running' | 'idle';
    model_file: string;
    model_id: string;
    num_active_training_jobs: number;
    error?: string;
    message?: string;
}
