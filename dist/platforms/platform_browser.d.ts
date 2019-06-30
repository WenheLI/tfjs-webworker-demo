import { Platform } from './platform';
export declare class PlatformBrowser implements Platform {
    private textEncoder;
    constructor();
    encode(text: string, encoding: string): Uint8Array;
    decode(bytes: Uint8Array, encoding: string): string;
    fetch(path: string, init?: RequestInit): Promise<Response>;
}
