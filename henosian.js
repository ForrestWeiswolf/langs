const { Format, WeightedRandom } = require('meristem')

const v = new WeightedRandom({
	'o': 6,
	'e': 4,
	'a': 3,
	'i': 2,
	'u': 1
})

const c = new WeightedRandom({
	's': 6,
	't': 6,
	'r': 6, 
	'n': 5, 
	'p': 4, 
	'h': 4, 
	'k': 4, 
	'l': 4, 
	'd': 4, 
	'g': 3, 
	'f': 3, 
	'm': 3, 
	'b': 3, 
	'x': 3, 
	'z': 2, 
	'v': 2,
})

initial = new WeightedRandom({
	'(c)': 3,
	'': 1
})

final = new WeightedRandom({
	'(c)': 5,
	'': 3
})

const syl = new Format('(initial)(v)(final)', { initial, final, c, v })

const noun = new Format('(syl)(end)', {
	syl: '(initial)(v)(final)',
	end: new WeightedRandom(['(initial)(v)(final)(end)', 1], ['(case)', 1]),
	case: new WeightedRandom({
		'in': 1,
		'az': 1,
		'it': 1,
		'um': 1,
		'u': 1,
		'em': 1,
		'ax': 1,
		'umo': 1,
	}),
	initial, final, c, v
})

for (let index = 0; index < 10; index++) {
	console.log(
		noun.expand()
			.replace('x', 'kh')
			.replace(/^f/, 'v')
			.replace(/([aeiou])h([aeiou$])/, (match, v1, v2) => v1 + v2)
			.replace(/([aeiou])in$/, (match, v) => v + 'n')
			.replace(/([aeiou])az$/, (match, v) => v + 'z')
			.replace(/([aeiou])um$/, (match, v) => v + 'm')
			.replace(/([aeiou])em$/, (match, v) => v + 'm')
			.replace(/([aeiou])umo$/, (match, v) => v + 'mo')
			// .replace(/([dgmnb])[aeiou]/, (match, cons) => cons)
	)
}