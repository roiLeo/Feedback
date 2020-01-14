<template>
	<section class="home">
		<h1 class="title is-2 has-text-centered">Feature Requests</h1>
		<h2
			class="subtitle has-text-light has-text-centered"
		>Join other users in helping make the website better</h2>

		<SearchBar></SearchBar>
		<Tabs></Tabs>

		<Card 
		v-for="suggestion in suggestions"
		:key="suggestion.id" 
		:suggestion="suggestion"></Card>
	</section>
</template>

<script>
import Card from '~/components/Card'
import SearchBar from '~/components/SearchBar'
import Tabs from '~/components/Tabs'

export default {
	name: 'HomePage',

	components: {
		Card,
		SearchBar,
		Tabs
	},

	created() {
		this.$store.dispatch('loadSuggestions')
	},

	computed: {
		suggestions() {
			// stored in suggestions = []
			return this.$store.getters.suggestions
		},
	}
}
</script>
