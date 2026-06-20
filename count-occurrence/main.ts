import { Plugin } from "obsidian";

export default class HelloWorldPlugin extends Plugin {

	onload(): Promise<void> | void {

		this.registerMarkdownCodeBlockProcessor("countoccurrence", async (source, el, ctx) => {
			await this.processCode(source, el);
		});

	}

	private async processCode(source: string, el: Element) {
		el.empty();

		const rows = source.split("\n").filter(row => row.length > 0);
		const content = await this.app.vault.read(this.app.workspace.getActiveFile()!);
		const ul = el.createEl("ul");

		rows.forEach(row =>
			ul.createEl("li", { text: `${row}: ${this.getCount(content, row)}` }));
	}

	private getCount(content: string, pattern: string): number {
		const count = content.match(new RegExp(pattern, "g"))?.length;

		return count ? count - 1 : 0;
	}

}

