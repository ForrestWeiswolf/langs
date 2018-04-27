const { Format, WeightedRandom } = require('meristem')

const c = new WeightedRandom({
	'r': 8,
	'k': 6,
	'l': 7,
	'n': 6,
	't': 8,
	's': 7,
	'z': 4,
	'd': 4,
	'g': 3,
	'p': 3,
	'th': 2,
	'm': 3,
	'dh': 1
})

const v = new WeightedRandom({
	'a': 6,
	'e': 7,
	'i': 2,
	'o': 5,
	'u': 1
})

const tone = new WeightedRandom({
	'1': 1,
	'2': 3,
	'': 2
})

const initial = new WeightedRandom({
	'(c)': 5,
	'': 1
})

const final = new WeightedRandom({
	'(c)': 2,
	'': 1
})

const syl = new Format('(initial)(v)(tone)(final)', { initial, final, c, v, tone })

const word = new Format('(syl)(end)', {
	syl: '(initial)(v)(tone)(final)',
	end: new WeightedRandom(['(initial)(v)(final)', 2], ['', 5]),
	initial, final, c, v, tone
})

for (let index = 0; index < 10; index++) {
	console.log(
		word.expand()
			.replace(/([sf])g/, (match, fricative) => fricative + 'c')
	)
}
