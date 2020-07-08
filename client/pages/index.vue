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

		<!-- <Tabs :status="status" :count="countByStatus"></Tabs> -->

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

	// created() {
	// 	this.$store.dispatch('loadStatus')
	// },

	fetch ({store}) {
		store.dispatch('loadSuggestions')
		store.dispatch('loadStatus')
  	},

	computed: {
		suggestions() {
			// stored in suggestions = []
			return this.$store.getters.suggestions
		},
		status() {
			// stored in status = []
			return this.$store.getters.status
		},
		countByStatus() {
			if(this.suggestions) { 
				return this.suggestions.reduce((acc, d) => {
					const found = acc.find(a => a.status === d.status)
					!found ? acc.push({status: d.status, count: 1}) : found.count++
					return acc
				}, [])
			}
		}
	},

}
</script>