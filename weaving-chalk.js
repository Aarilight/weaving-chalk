var chalk = require("chalk");

module.exports = function (library) {
    return {
        name: "weaving-chalk",
        match: ["#", library.REGEX(Object.keys(chalk.styles).join("|")), ":", library.CONTENT],
        return: (_o, style, _c, content) => chalk[style[0]](content)
    };
};