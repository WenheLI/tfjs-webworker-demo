import { Platform } from './platform';
export declare class PlatformBrowser implements Platform {
    private textEncoder;
    private textDecoder;
    constructor();
    encodeUTF8(text: string): Uint8Array;
    decodeUTF8(bytes: Uint8Array): string;
    fetch(path: string, init?: RequestInit): Promise<Response>;
}
