import type { SearchResponseData, VersionsResponseData } from "./types";
import AST from "./ast";
declare class ErisDocs {
    static USER_AGENT: string;
    static BASE: string;
    userAgent: string;
    constructor(userAgent?: string);
    /**
     * Get the ast of a specific version - use search for a more friendly version
     *
     * @param {string} [version="latest"]
     * @returns {Promise<AST.Root>}
     */
    static getVersion(version?: string): Promise<AST.Root | null>;
    /**
     * Get a list of eris versions & api supported versions
     *
     * @returns {Promise<VersionsResponseData>}
     */
    static getVersions(): Promise<VersionsResponseData>;
    /**
     * Search for classes, events, methods & properties (searches are done via a fuzzy search)
     *
     * @param {string} [version="latest"] - the version number, defaults to latest (lowest supported: 0.14.0)
     * @param {object} [options]
     * @param {string} [options.class] - filter classes by class name
     * @param {string} [options.event] - filter classes by event name
     * @param {string} [options.method] - filter classes by method name
     * @param {string} [options.property] - filter classes by property name
     * @param {boolean} [options.hideIrrelevant=true] - hide irrelevant information, like methods & properties when searching events and vice versa
     * @returns {Promise<SearchResponseData | null>} - the search results, null if the version is still loading
     */
    static search(version?: string, options?: {
        class?: string;
        event?: string;
        method?: string;
        property?: string;
        hideIrrelevant?: boolean;
    }): Promise<SearchResponseData | null>;
    get search(): typeof ErisDocs.search;
}
export default ErisDocs;
export { AST };
export * from "./types";
