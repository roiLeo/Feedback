<template>
	<section class="suggestion">
		<b-button type="is-flat" icon-left="arrow-left" tag="nuxt-link" to="/">Back</b-button>

		<h1 class="title is-2 has-text-centered">Suggestion</h1>

		<Card :suggestion="suggestion"></Card>

		<section class="section">
			<b-field label="Title">
				<b-input v-model="suggestion.title" placeholder="Quick summary about your suggestion"></b-input>
			</b-field>

			<b-field label="Description">
				<b-input v-model="suggestion.body" maxlength="200" type="textarea" placeholder="Go into more detail about your idea"></b-input>
			</b-field>

			<b-button 
			type="is-info"
			class="is-pulled-right">Edit</b-button>
		</section>
	</section>
</template>

<script>
import Card from '~/components/Card';

export default {
	components: {
		Card
	},

	created() {
		this.$store.dispatch('loadSuggestion', this.$route.params.id);
	},

	computed: {
		suggestion() {
			// stored in suggestion = []
			return this.$store.getters.suggestions
		},
	}
};
</script>

<style>
</style>