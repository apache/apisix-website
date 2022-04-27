export interface BaseLinkInfo {
    url: string;
    file: string;
    position: string;
    status: boolean;
}

export type InternalLinkInfo = BaseLinkInfo & {
    external: false;
    parsedUrl: string;
}

export type ExternalLinkInfo = BaseLinkInfo & {
    external: true;
    msg: string;
};

export type LinkInfo = InternalLinkInfo | ExternalLinkInfo;

export interface Info {
    url: string;
    path: string;
    pos: string;
}

export interface Options {
    includeAll: boolean;
    base: string;
    files?: string[];
    ignore: (string | RegExp)[];
    beforeHandlePath: ((path: string) => string);
}

export function CheckInternalLink(info: Info, opt: Options): Promise<LinkInfo>;
export function CheckExternalLink(info: Info, opt: Options): Promise<LinkInfo>;
