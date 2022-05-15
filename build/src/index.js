"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Timer_1 = __importDefault(require("./Timer"));
const package_json_1 = __importDefault(require("../package.json"));
const tsafe_1 = require("tsafe");
const undici_1 = require("undici");
const debug_1 = __importDefault(require("debug"));
const reqDebug = (0, debug_1.default)("eris-docs:request");
class ErisDocs {
    static USER_AGENT = `ErisDocs/${package_json_1.default.version} (https://github.com/DonovanDMC/ErisDocs)`;
    static BASE = "https://eris.owo-whats-this.dev/api";
    userAgent;
    constructor(userAgent) {
        this.userAgent = userAgent || ErisDocs.USER_AGENT;
    }
    /**
     * Get the ast of a specific version - use search for a more friendly version
     *
     * @param {string} [version="latest"]
     * @returns {Promise<AST.Root>}
     */
    static async getVersion(version = "latest") {
        const url = `${ErisDocs.BASE}/versions/${version}`;
        reqDebug(`-> GET ${url}`);
        const start = Timer_1.default.now();
        const req = await (0, undici_1.fetch)(url, {
            method: "GET"
        });
        const end = Timer_1.default.now();
        reqDebug(`<- GET ${url} - ${req.status} ${req.statusText} [0] - ${Timer_1.default.calc(start, end, 3)}`);
        if (req.status !== 200) {
            const body = await req.text();
            if (req.status === 400)
                throw new Error(`Unsupported version "${version}"`);
            if (req.status === 403)
                return null;
            throw new Error(`Unexpected ${req.status} ${req.statusText} on GET ${url} (${body})`);
        }
        const body = await req.json();
        return body.data;
    }
    /**
     * Get a list of eris versions & api supported versions
     *
     * @returns {Promise<VersionsResponseData>}
     */
    static async getVersions() {
        const url = `${ErisDocs.BASE}/versions`;
        reqDebug(`-> GET ${url}`);
        const start = Timer_1.default.now();
        const req = await (0, undici_1.fetch)(url, {
            method: "GET"
        });
        const end = Timer_1.default.now();
        reqDebug(`<- GET ${url} - ${req.status} ${req.statusText} [0] - ${Timer_1.default.calc(start, end, 3)}`);
        const body = await req.json();
        return body.data;
    }
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
    static async search(version = "latest", options) {
        const qs = [];
        (0, tsafe_1.assert)(typeof version === "string", "a version string is required");
        if (options) {
            if (options.class)
                qs.push(`class=${options.class}`);
            if (options.event)
                qs.push(`class=${options.event}`);
            if (options.method)
                qs.push(`class=${options.method}`);
            if (options.property)
                qs.push(`class=${options.property}`);
            if (options.hideIrrelevant)
                qs.push(`hide=${options.hideIrrelevant ? "true" : "false"}`);
        }
        const url = `${ErisDocs.BASE}/search/${version}${qs.length === 0 ? "" : `?${qs.join("&")}`}`;
        reqDebug(`-> GET ${url}`);
        const start = Timer_1.default.now();
        const req = await (0, undici_1.fetch)(url, {
            method: "GET"
        });
        const end = Timer_1.default.now();
        reqDebug(`<- GET ${url} - ${req.status} ${req.statusText} [0] - ${Timer_1.default.calc(start, end, 3)}`);
        if (req.status !== 200) {
            const body = await req.text();
            if (req.status === 400)
                throw new Error(`Unsupported version "${version}"`);
            if (req.status === 403)
                return null;
            throw new Error(`Unexpected ${req.status} ${req.statusText} on GET ${url} (${body})`);
        }
        const body = await req.json();
        return body.data;
    }
    get search() { return ErisDocs.search.bind(ErisDocs); }
}
exports.default = ErisDocs;
exports = ErisDocs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQVM1QixtRUFBa0M7QUFDbEMsaUNBQStCO0FBQy9CLG1DQUErQjtBQUMvQixrREFBMEI7QUFFMUIsTUFBTSxRQUFRLEdBQUcsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUM1QyxNQUFNLFFBQVE7SUFDYixNQUFNLENBQUMsVUFBVSxHQUFHLFlBQVksc0JBQUcsQ0FBQyxPQUFPLDJDQUEyQyxDQUFDO0lBQ3ZGLE1BQU0sQ0FBQyxJQUFJLEdBQUcscUNBQXFDLENBQUM7SUFDcEQsU0FBUyxDQUFTO0lBQ2xCLFlBQVksU0FBa0I7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsUUFBUTtRQUN6QyxNQUFNLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLGFBQWEsT0FBTyxFQUFFLENBQUM7UUFFbkQsUUFBUSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxQixNQUFNLEtBQUssR0FBRyxlQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDMUIsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFBLGNBQUssRUFBQyxHQUFHLEVBQUU7WUFDNUIsTUFBTSxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7UUFDSCxNQUFNLEdBQUcsR0FBRyxlQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsVUFBVSxlQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFH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