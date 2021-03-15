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
