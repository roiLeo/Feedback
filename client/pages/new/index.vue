<template>
	<section class="new">
		<h1 class="title is-2 has-text-centered">Add a suggestion</h1>
		<b-button type="is-flat" icon-left="arrow-left" tag="nuxt-link" to="/">Back</b-button>

		<form @submit.prevent="submitSuggestion">
			<b-field label="Title">
				<b-input v-model="title" placeholder="Quick summary about your suggestion" required></b-input>
			</b-field>

			<b-field label="Description">
				<b-input
					v-model="message"
					maxlength="400"
					type="textarea"
					placeholder="Go into more detail about your idea"
					required
				></b-input>
			</b-field>

			<b-button
			type="is-info"
            native-type="submit"
			class="is-pulled-right">Submit</b-button>
		</form>
	</section>
</template>

<script>

export default {
	data () {
		return {
			title: '',
			message: ''
		};
	},
	methods: {
		submitSuggestion () {
			this.$store.dispatch('addSuggestion', {
				title: this.title,
				content: this.message,
				url: '#',
				votes: 0,
				author: 'Not Leo',
				tags: []
			})

			this.title = ''
			this.message = ''
		}
	}
};
</script>

<style>
</style>
