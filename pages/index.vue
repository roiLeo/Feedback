<template>
	<section class="home">
		<h1 class="title is-2 has-text-centered">Feature Requests</h1>
		<h2
			class="subtitle has-text-grey has-text-centered"
		>Join other users in helping make the website better</h2>

		<div class="columns is-centered">
			<div class="column is-6">
				<SearchBar></SearchBar>
			</div>
		</div>

		<Tabs></Tabs>

		<div class="has-text-right">
					<b-button
			size="is-medium"
			type="is-info"
			icon-left="plus"
			tag="nuxt-link"
			to="/new"
		>New</b-button>
		</div>

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
