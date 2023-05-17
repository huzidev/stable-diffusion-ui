export interface PromptState {
    prompt: string;
    steps: number;
    restore_faces: boolean;
    width: number;
    height: number;
    batch_count: number;
    cfg_scale: number;
}