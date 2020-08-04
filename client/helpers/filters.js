export function filterSuggestions (filter, suggestions) {
	let filteredList = [...suggestions] // Filter status
	if (filter.status !== 'all') {
		const filtered = filteredList.filter((lead) => lead.status === filter.status)
		filteredList = filtered
	}

	console.warn('==== FILTER ====')
	console.log(filter)
	console.warn('==== suggestions ====')
	console.log(suggestions)

	// Search
	if (filter.search !== '') {
		const searchList = []
		const searchTerm = filter.search.toLowerCase()
		for (let i = 0; i < filteredList.length; i++) {
			if (
				filteredList[i].title !== null && filteredList[i].title.toLowerCase().includes(searchTerm)

				/*
				 * ||
				 * (filteredList[i].content !== null && filteredList[i].content.toLowerCase().includes(searchTerm))
				 */
			) {
				searchList.push(filteredList[i])
			}
		}
		filteredList = searchList
	}

	console.warn('==== filteredList ====')
	console.log(filteredList)

	return filteredList
}
