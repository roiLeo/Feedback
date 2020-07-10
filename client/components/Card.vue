<template>
	<div class="card">
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<VotesCounter :votes="suggestion.votes" @updateVotes="updateSuggestionVote"></VotesCounter>
				</div>
				<div class="media-content">
					<p class="title is-4">
						<nuxt-link
							:to="{ name: 'suggestions-id', params: { id: suggestion._id } }"
						>{{suggestion.title}}</nuxt-link>
					</p>
					<p class="subtitle is-6">@{{suggestion.author}}</p>
				</div>
				<div class="media-right">
					<b-button
						tag="nuxt-link"
						:to="{ name: 'suggestions-id', params: { id: suggestion._id } }"
						type="is-primary has-text-light"
						icon-left="comment-alt"
					></b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VotesCounter from '~/components/VotesCounter'

export default {
	components: {
		VotesCounter
	},
	props: {
		suggestion: {
			type: Object,
			required: true
		}
	},
	methods: {
		updateSuggestionVote(number) {
			let newsuggestion = {
				id: this.suggestion._id,
				data: {
					votes: number
				}
			}

			console.log(this.suggestion)
			console.log(newsuggestion)
			this.$store.dispatch('updateSuggestion', newsuggestion)
			// this.suggestion.votes = number
		}
	}
}
</script>

<style>
.card {
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
	border-radius: 0.5rem;
}

.card .media-right {
	margin-top: auto;
	margin-bottom: auto;
}
</style>