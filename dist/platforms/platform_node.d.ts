import { Platform } from './platform';
export declare const getNodeFetch: {
    importFetch: () => any;
};
export declare let systemFetch: (url: string, init?: RequestInit) => Promise<Response>;
export declare class PlatformNode implements Platform {
    private textEncoder;
    util: any;
    constructor();
    encode(text: string, encoding: string): Uint8Array;
    decode(bytes: Uint8Array, encoding: string): string;
    fetch(path: string, requestInits?: RequestInit): Promise<Response>;
}
