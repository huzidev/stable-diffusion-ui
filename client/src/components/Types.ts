export interface PromptState {
    prompt: string;
    steps: number;
    restore_faces: boolean;
    width: number;
    height: number;
    batch_size: number;
    cfg_scale: number;
}