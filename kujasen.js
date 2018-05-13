const { Format, WeightedRandom } = require('meristem')

const v = new WeightedRandom({
	'a': 7,
	'i': 5,
	'u': 4,
	'e': 3,
	'aa': 1,
	'o': 1
})

const c = new WeightedRandom({
	'n': 6,
	's': 6,
	'j': 6, 
	'h': 5, 
	'r': 4, 
	// 'm': 4, 
	'q': 4, 
	// 'f': 4, 
	't': 4, 
	'l': 3, 
	'y': 3, 
	'b': 3, 
	'sh': 3, 
	'w': 3, 
	'd': 2, 
	'k': 2,
	'\'': 2,
	'k': 2,
	'kh': 2,
	'th': 1,
	'z': 1,
	'g': 1
})

const l = new WeightedRandom({
	'r': 5,
	'w': 4,
	'y': 3,
	'l': 1,
})

initial = new WeightedRandom({
	'(c)': 6,
	'': 2,
	'(c)(l)': 1
})

final = new WeightedRandom({
	'(c)': 5,
	'': 3,
	'(c)(c)': 1,
	'(l)(c)': 1
})

const syl = new Format('(initial)(v)(final)', { initial, final, c, v, l })

const form = new WeightedRandom({
	'ta(c)a(c)i(c)': 3,
	'(c)(v)(c)e(c)': 3,
	'ni(c)(c)aa(c)': 3,
	'ma(c)(c)e(c)': 3,
	'(c)u(c)(v)(c)': 2,
	'(c)a(c)o(c)': 2,
	'us(c)a(c)aa(c)': 2,
	's(c)a(c)aa(c)': 1,
	'fu(c)(c)aa(c)': 1,
	'fu(c)(c)ee(c)': 1,	
}) 

const nounFromSyl = new Format('(syl)(end)', {
	syl: '(initial)(v)(final)',
	end: new WeightedRandom(['(initial)(v)(final)(end)', 1], ['', 1]),
	initial, final, c, v, l
})

const nounFromForm = new Format('(form)', { form, initial, final, c, v, l})

const noun = new Format('(noun)', {
	noun: new WeightedRandom(['(nounFromForm)', 3], ['(nounFromSyl)', 1]),
	nounFromForm, nounFromSyl, form, initial, final, c, v, l
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