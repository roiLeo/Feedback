<template>
	<section class="suggestion">
		<b-button
		type="is-flat"
		icon-left="arrow-left" 
		tag="nuxt-link" 
		to="/">Back</b-button>

		<h1 class="title is-2 has-text-centered">Suggestion</h1>
	
		<!-- <Card :suggestion="suggestion"></Card> -->
		
	</section>
</template>

<script>
import Card from '~/components/Card'

export default {
	components: {
		Card,
	},

	created() {
		this.$store.dispatch('loadSuggestion', this.$route.params.id)
	},

	suggestion() {
		// stored in suggestion = []
		return this.$store.getters.suggestions
	},
}
</script>

<style>
</style>