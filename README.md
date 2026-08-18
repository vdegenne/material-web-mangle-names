# 🎨 material-web-mangle-names

**Transform @material/web elements to unique names in your Rollup builds!** 🚀

## 🔹 What it does

`material-web-mangle-names` is a **Rollup plugin** that automatically **renames all @material/web custom elements** in your code (e.g., `<md-icon>`, `<md-elevated-button>`) with a unique suffix.

This helps avoid **name collisions** when injecting custom elements into pages or content scripts, without breaking your imports! 🛡️

## 📦 Installation

```bash
npm i -D material-web-mangle-names
```

## ⚡ Usage

Minimal `rollup.config.js` example:

```ts
import {mdMangle} from 'material-web-mangle-names'

export default {
	input: 'src/app.js',
	output: {
		file: 'dist/bundle.js',
		format: 'esm',
	},
	plugins: [
		mdMangle({
			include: ['./lib/**/*.js'], // optional, files to include 🌟
			exclude: [], // optional, files to exclude ❌
		}),
	],
}
```

✅ Automatically includes `node_modules/@material/web` files even if you exclude node_modules.

## 📝 License

This plugin is released under the **MIT License**. Free to use, modify, and distribute! 🎉

## 🙏 Thanks

Big thanks to the amazing **@material/web team** for making such awesome web components! 💖

## ✨ Notes

- Longest element names are replaced first to avoid partial replacements (e.g., `md-icon-button` before `md-icon`).
- Replacements are **safe** and won’t affect import paths like `./md-icon.js` thanks to built-in checks.

Enjoy clean, collision-free Material Web components in your Rollup bundles! 🚀
