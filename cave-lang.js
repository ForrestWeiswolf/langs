const { Format, WeightedRandom } = require('meristem')

const c = new WeightedRandom({
	't': 6,
	'd': 4,
	'g': 3,
	'f': 8,
	'v': 6,
	's': 10,
	'z': 5,
	'w': 3,
	'r': 4
})

const k = new WeightedRandom({
	't': 6,
	'd': 4,
	'g': 3,
})
const v = new WeightedRandom({
	'e': 4,
	'a': 6,
	'ah': 1,
	'ee': 3,
	'ay': 2
})

const r = new WeightedRandom({
	'w': 3,
	'r': 4
})

const s = new WeightedRandom({
	'f': 8,
	'v': 6,
	's': 10,
	'z': 5,
	'r': 4
})


initial = new WeightedRandom({
	'(c)(r)': 3,
	'(c)': 5,
	'': 2
})

final = new WeightedRandom({
	'(s)(k)': 3,
	'(c)': 5,
	'': 4
})

const syl = new Format('(initial)(v)(final)', { initial, final, c, v, s, r, k })

const word = new Format('(syl)(end)', {
	syl: '(initial)(v)(final)',
	end: new WeightedRandom(['(initial)(v)(final)', 2], ['', 3]),
	initial, final, c, v, s, r, k
})

for (let index = 0; index < 10; index++) {
	console.log(
		word.expand()
			.replace(/([sf])g/, (match, fricative) => fricative + 'c')

	)
}
