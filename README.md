# 🎨 Material All Mangle Names

**Transform your @material/web custom elements to unique names for Rollup builds!** 🚀

---

## 🔹 What it does

`material-all-mangle-names` is a **Rollup plugin** that automatically **renames all @material/web custom elements** in your code (e.g., `<md-icon>`, `<md-elevated-button>`) with a unique suffix.

This helps avoid **name collisions** when injecting custom elements into pages or content scripts, without breaking your imports! 🛡️

---

## 📦 Installation

```bash
npm i -D material-all-mangle-names
```

---

## ⚡ Usage

Minimal `rollup.config.js` example:

```ts
import resolve from '@rollup/plugin-node-resolve'
import mdMangle from 'material-all-mangle-names'

export default {
	input: 'src/main.js',
	output: {
		file: 'dist/bundle.js',
		format: 'esm',
	},
	plugins: [
		resolve(),
		mdMangle({
			include: ['src/**/*'], // optional, files to include 🌟
			exclude: ['node_modules/**'], // optional, files to exclude ❌
		}),
	],
}
```

✅ Automatically includes `node_modules/@material/web` files even if you exclude node_modules.

---

## 🛠️ Options

| Option    | Type    | Default   | Description           |
| --------- | ------- | --------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `include` | `string | string[]` | `undefined`           | Keep in mind, files under `node_modules/@material/web/` (recursive) will always get included. Specify additional files or patterns to include. 🌟 |
| `exclude` | `string | string[]` | `['node_modules/**']` | Files to ignore. Node_modules is automatically ignored by default. Make sure to re-include node_modules if you want. ❌                           |

---

## 📝 License

This plugin is released under the **MIT License**. Free to use, modify, and distribute! 🎉

---

## 🙏 Thanks

Big thanks to the amazing **@material/web team** for making such awesome web components! 💖

---

## ✨ Notes

- Longest element names are replaced first to avoid partial replacements (e.g., `md-icon-button` before `md-icon`).
- Replacements are **safe** and won’t affect import paths like `./md-icon.js` thanks to built-in checks.

Enjoy clean, collision-free Material Web components in your Rollup bundles! 🚀
