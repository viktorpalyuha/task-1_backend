module.exports = {
	"extends": "eslint:recommended",
	"env": {
		"node": true,
		"es6": true
	},
	"rules": {
		"no-console": "off",
		"curly": "error",
		"eqeqeq": ["error", "always"],
		"guard-for-in": "warn",
		"no-caller": "error",
		"no-empty-function": "error",
		"no-eval": "error",
		"no-extra-bind": "error",
		"no-multi-spaces": "error",
		"no-new": "warn",
		"block-spacing": "error",
		"brace-style": "error",
		"comma-dangle": ["error", "never"],
		"func-call-spacing": ["error", "never"],
		"max-len": ["error", { "code": 120, "ignoreComments": true }],
		"new-cap": ["error", { "newIsCap": true }],
		"new-parens": "error",
		"no-unneeded-ternary": "error",
		"quotes": ["warn", "single", { "avoidEscape": true , "allowTemplateLiterals": true }],
		"arrow-spacing": ["error", { "before": true, "after": true }],
		"no-var": "warn",
		"no-unused-vars": ["error", { "vars": "local" }]
	}
}
