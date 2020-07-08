<template>
  <div>
	<b-button
		size="is-small"
		type="is-flat"
		icon-left="chevron-up"
		@click.prevent="incrementCounter"
	></b-button>
	<div class="is-size-3 has-text-centered has-text-weight-bold">{{ votes }}</div>
	<b-button
		size="is-small"
		type="is-flat"
		icon-left="chevron-down"
		@click.prevent="decrementCounter"
	></b-button>
  </div>
</template>

<script>
export default {
	props: {
		votes: {
			// type: Number, // not working
			required: true
		}
	},
	methods: {
		incrementCounter() {
			let newVote = this.votes
			newVote++
			this.$emit('updateVotes', newVote)
		},
		decrementCounter() {
			let newVote = this.votes
			newVote > 0 && newVote--;
			this.$emit('updateVotes', newVote)
		}
	}
}
</script>

<style>

</style>