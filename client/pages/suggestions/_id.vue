<template>
	<section class="suggestion">
		<b-button type="is-flat" icon-left="arrow-left" tag="nuxt-link" to="/">Back</b-button>

		<h1 class="title is-2 has-text-centered">Suggestion</h1>

		<CardInfos :suggestion="suggestion"></CardInfos>

		<section class="section">
			<form @submit.prevent="updateSuggestion">
				<b-field label="Title">
					<b-input v-model="suggestion.title" placeholder="Quick summary about your suggestion" required></b-input>
				</b-field>

				<b-field label="Description">
					<b-input v-model="suggestion.content" maxlength="350" type="textarea" placeholder="Go into more detail about your idea" required></b-input>
				</b-field>

				<b-button 
				type="is-info"
				native-type="submit"
				class="is-pulled-right">Edit</b-button>
			</form>
		</section>
	</section>
</template>

<script>
import CardInfos from '~/components/CardInfos';

export default {
	components: {
		CardInfos
	},

	created() {
		this.$store.dispatch('loadSuggestion', this.$route.params.id)
	},

	computed: {
		suggestion() {
			// stored in suggestion = []
			return this.$store.getters.suggestions
		},
	},
	methods: {
		updateSuggestion() {
			let newsuggestion = {
				id: this.$route.params.id,
				data: {
					title: this.suggestion.title,
					content: this.suggestion.content
				}
			}
			this.$store.dispatch('updateSuggestion', newsuggestion)
		}
	}
}
</script>

<style>
</style>