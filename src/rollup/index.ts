import {createFilter, type FilterPattern} from '@rollup/pluginutils'
import {MdElementsImportsMap} from 'mwc3-back-helpers/md-elements.js'
import {type Plugin} from 'rollup'

/**
 * All available elements (e.g. "md-icon", "md-elevated-button", etc...).
 * Sorted to avoid partial replacements.
 */
const availableElements = Object.keys(MdElementsImportsMap).sort(
	(a, b) => b.length - a.length,
)

interface MdMangleOptions {
	/**
	 * Keep in mind, files under `node_modules/@material/web/` (recursive)
	 * will always get included.
	 *
	 * @default undefined
	 */
	include: FilterPattern
	/**
	 * node_modules is automatically ignored.
	 * If you provide a new value, make sure to reinclude node_modules,
	 * You don't need to worry about `node_modules/@material/web` imports, they're always included
	 * no matter the filter.
	 *
	 * @default everything in node_modules
	 */
	exclude: FilterPattern
}

/**
 * If you redefine "include" make sure you don't include all node_modules again (e.g. with `** /*.js`)
 * or it will slow down the build time.
 */
export function mdMangle(options: Partial<MdMangleOptions> = {}): Plugin {
	const _options: MdMangleOptions = {
		include: ['./{src,lib}/**/*.{ts,js}'],
		exclude: null,
		...options,
	}

	const include =
		_options.include === null
			? []
			: Array.isArray(_options.include)
				? [..._options.include]
				: [_options.include]

	include.push(/@material\/web/) // Always include @material/web elements
	include.push(/FormBuilder\.js/) // from @vdegenne/forms

	const filter = createFilter(include, _options.exclude)

	const buildId = Date.now().toString()
	const renameMap: Record<string, [RegExp, string]> = Object.create(null)

	return {
		name: 'material-all-mangle-names',
		transform(code: string, id: string) {
			if (!filter(id)) return null

			let modified = code

			for (const name of availableElements) {
				let replacement = renameMap[name]

				if (!replacement) {
					replacement = [
						// new RegExp(`(?<!-)${name}(?!\\.)`, 'g'),
						new RegExp(`(?<!-)${name}`, 'g'),
						`${name}-${buildId}`,
					]
					renameMap[name] = replacement
				}

				modified = modified.replace(replacement[0], replacement[1])
			}

			return {code: modified, map: null}
		},
	}
}

export default mdMangle
