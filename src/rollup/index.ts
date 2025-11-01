import {type Plugin} from 'rollup'
import {createFilter} from '@rollup/pluginutils'
import {MdElementsImportsMap} from 'mwc3-back-helpers/md-elements.js'

/** all available element (e.g. "md-icon", "md-elevated-button", etc...) */
const availableElements = Object.keys(MdElementsImportsMap)

interface MdMangleOptions {
	/**
	 * Keep in mind, files under `node_modules/@material/web/` (recursive)
	 * will always get included.
	 *
	 * @default undefined
	 */
	include: string | string[]
	/**
	 * node_modules is automatically ignored.
	 * If you provide a new value, make sure to reinclude node_modules,
	 * You don't need to worry about `node_modules/@material/web` imports, they're always included
	 * no matter the filter.
	 *
	 * @default everything in node_modules
	 */
	exclude: string | string[]
}

export function mdMangle(options: Partial<MdMangleOptions> = {}): Plugin {
	const _o: MdMangleOptions = {
		include: [],
		exclude: ['node_modules/**'],
		...options,
	}

	const filter = createFilter(_o.include, _o.exclude)
	const randomId = Math.floor(Math.random() * 100000).toString()

	// longest first avoids partial replacements (e.g., md-icon-button before md-icon)
	const renameMap: [string, string][] = availableElements
		.sort((a, b) => b.length - a.length)
		.map((name) => [name, `${name}-${randomId}`])

	return {
		name: 'material-all-mangle-names',
		transform(_code: string, id: string) {
			// Only process files matching filter or always include @material/web
			if (!id.includes('@material/web') && !filter(id)) return null

			let code = _code

			for (const [name, replaceName] of renameMap) {
				// Replace all occurrences not followed by a dot (to avoid .js, .ts, etc.)
				const regex = new RegExp(`${name}(?!\\.)`, 'g')
				code = code.split(regex).join(replaceName)
			}

			return {code, map: null}
		},
	}
}

export default mdMangle
