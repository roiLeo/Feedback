<template>
    <section class="new">
		<b-button size="is-small"
		type="is-flat"
		icon-left="arrow-left" 
		tag="nuxt-link" 
		to="/">Back</b-button>

		<h1 class="title is-2 has-text-centered">Add a suggestion</h1>

		<b-field label="Title">
			<b-input v-model="title" placeholder="Quick summary about your suggestion"></b-input>
		</b-field>

		<b-field label="Description">
			<b-input v-model="message" maxlength="200" type="textarea" placeholder="Go into more detail about your idea"></b-input>
		</b-field>

		<b-button 
		type="is-primary"
		class="is-pulled-right">Submit</b-button>
    </section>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			message: ''
		}
	},
	methods: {
		// addSuggestion() {
		// 	this.$store.dispatch('list/add')
		// }
	}
}
</script>

<style>

</style>