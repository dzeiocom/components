export function buildClassName(...classes: Array<Array<any> | string | undefined>): string|undefined {
	const classesFinal: Array<string> = []
	root: for (const classe of classes) {
		if (typeof classe === 'undefined') {
			continue
		}
		if (typeof classe === 'string') {
			classesFinal.push(classe)
			continue
		}
		const classToPut = classe.shift()
		if (typeof classToPut === 'undefined') {
			continue
		}
		for (const iterator of classe) {
			if (!iterator) {
				continue root
			}
		}
		classesFinal.push(classToPut)
	}
	if (classesFinal.length === 0) {
		return undefined
	}
	return classesFinal.join(' ')
}

export const colors = {
	default: '#3949AB', // This color should never appear
	primary: '#3949AB',
	secondary: '#FCFCFC',
	info: '#03A9F4',
	success: '#2DCE89',
	danger: '#F5365C',
	warning: '#FB6340'
}
