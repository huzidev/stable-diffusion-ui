export interface PromptState {
    prompt: string;
    steps: number;
    restore: boolean;
    width: number;
    height: number;
    batch: number;
    cfg: number;
}