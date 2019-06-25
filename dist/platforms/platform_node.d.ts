import { Platform } from './platform';
export declare const getNodeFetch: {
    importFetch: () => any;
};
export declare let systemFetch: (url: string, init?: RequestInit) => Promise<Response>;
export declare class PlatformNode implements Platform {
    private textEncoder;
    private textDecoder;
    constructor();
    encodeUTF8(text: string): Uint8Array;
    decodeUTF8(bytes: Uint8Array): string;
    fetch(path: string, requestInits?: RequestInit): Promise<Response>;
}
