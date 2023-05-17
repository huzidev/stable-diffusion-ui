export interface PromptState {
    prompt: string;
    steps: number;
    restore_faces: boolean;
    width: number;
    height: number;
    n_iter: number;
    cfg_scale: number;
    sampler_name: any;
}