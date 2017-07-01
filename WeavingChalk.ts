import chalk = require("chalk");
import * as Weaving from "weaving-api";

import Chain = Weaving.Chain;
import Regex = Weaving.Regex;
import MatchedRegex = Weaving.MatchedRegex;
import MatchedContent = Weaving.MatchedContent;
import Matchables = Weaving.Matchables;
import KEYS = Matchables.KEYS;
import VALUE = Matchables.VALUE;
import CONTENT = Matchables.CONTENT;
import RAWCONTENT = Matchables.RAWCONTENT;

const chalkTypes = `(?:${Object.keys(chalk.styles).join("|")}|strip)`;

const WeavingChalk: Weaving.Library = {
	strands: {
		0: [
			{
				name: "weaving-chalk",
				match: new Chain("#", new Regex(`${chalkTypes}(?:\.${chalkTypes})*`), ":", CONTENT),
				return: (
					_symbol: string,
					styleMatch: MatchedRegex,
					_separator: string,
					content: MatchedContent,
				) => {
					const styles = styleMatch.match[0].split(".");
					let chalkFn: any = chalk;
					for (let style of styles) {
						if (style == "strip") style = "stripColor";
						chalkFn = chalkFn[style as keyof typeof chalk];
					}
					chalkFn(content.content);
				},
			},
		],
	},
};

export default WeavingChalk;
