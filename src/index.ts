import Timer from "./Timer";
import type {
	SearchResponse,
	SearchResponseData,
	VersionResponse,
	VersionsResponse,
	VersionsResponseData
} from "./types";
import AST from "./ast";
import pkg from "../package.json";
import { assert } from "tsafe";
import { fetch } from "undici";
import debug from "debug";

const reqDebug = debug("eris-docs:request");
class ErisDocs {
	static USER_AGENT = `ErisDocs/${pkg.version} (https://github.com/DonovanDMC/ErisDocs)`;
	static BASE = "https://eris.owo-whats-this.dev/api";
	userAgent: string;
	constructor(userAgent?: string) {
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
		const start = Timer.now();
		const req = await fetch(url, {
			method: "GET"
		});
		const end = Timer.now();
		reqDebug(`<- GET ${url} - ${req.status} ${req.statusText} [0] - ${Timer.calc(start, end, 3)}`);

		if (req.status !== 200) {
			const body = await req.text();
			if (req.status === 400) throw new Error(`Unsupported version "${version}"`);
			if (req.status === 403) return null;
			throw new Error(`Unexpected ${req.status} ${req.statusText} on GET ${url} (${body})`);
		}
		const body = await req.json();
		return (body as VersionResponse).data;
	}

	/**
	 * Get a list of eris versions & api supported versions
	 *
	 * @returns {Promise<VersionsResponseData>}
	 */
	static async getVersions() {
		const url = `${ErisDocs.BASE}/versions`;

		reqDebug(`-> GET ${url}`);
		const start = Timer.now();
		const req = await fetch(url, {
			method: "GET"
		});
		const end = Timer.now();
		reqDebug(`<- GET ${url} - ${req.status} ${req.statusText} [0] - ${Timer.calc(start, end, 3)}`);

		const body = await req.json();
		return (body as VersionsResponse).data;
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
	static async search(version = "latest", options?: {
		class?: string;
		event?: string;
		method?: string;
		property?: string;
		hideIrrelevant?: boolean;
	}) {
		const qs: Array<string> = [];
		assert(typeof version === "string", "a version string is required");
		if (options) {
			if (options.class) qs.push(`class=${options.class}`);
			if (options.event) qs.push(`class=${options.event}`);
			if (options.method) qs.push(`class=${options.method}`);
			if (options.property) qs.push(`class=${options.property}`);
			if (options.hideIrrelevant) qs.push(`hide=${options.hideIrrelevant ? "true" : "false"}`);
		}
		const url = `${ErisDocs.BASE}/search/${version}${qs.length === 0 ? "" : `?${qs.join("&")}`}`;

		reqDebug(`-> GET ${url}`);
		const start = Timer.now();
		const req = await fetch(url, {
			method: "GET"
		});
		const end = Timer.now();
		reqDebug(`<- GET ${url} - ${req.status} ${req.statusText} [0] - ${Timer.calc(start, end, 3)}`);

		if (req.status !== 200) {
			const body = await req.text();
			if (req.status === 400) throw new Error(`Unsupported version "${version}"`);
			if (req.status === 403) return null;
			throw new Error(`Unexpected ${req.status} ${req.statusText} on GET ${url} (${body})`);
		}
		const body = await req.json();
		return (body as SearchResponse).data;
	}
	get search() { return ErisDocs.search.bind(ErisDocs); }
}

export default ErisDocs;
export { AST };
export * from "./types";
exports = ErisDocs;
