<template>
	<div class="card">
		<div class="card-content">
			<div class="media">
				<div class="media-content">
					<p class="title is-4">
						<nuxt-link
							:to="{ name: 'suggestions-id', params: { id: suggestion.id } }"
						>{{suggestion.title}}</nuxt-link>
					</p>
				</div>
				<div class="media-right">
					<p class="subtitle is-6">@{{suggestion.author}}</p>
				</div>
			</div>

			<div class="media">
				<div class="media-content">{{suggestion.content}}</div>
				<VotesCounter :votes="suggestion.votes" @updateVotes="updateSuggestionVote"></VotesCounter>
			</div>
			<p>
				{{suggestion.status}}
			</p>
			<time
				class="is-size-7"
				:datetime="suggestion.creationDate"
			>Le {{new Date(suggestion.creationDate).toLocaleString() }}</time>
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
			type: [
				Array,
				Object
			],
			required: true
		}
	},
	methods: {
		updateSuggestionVote (number) {
			if (number) {
				const newsuggestion = {
					id: this.suggestion._id,
					data: {
						votes: number
					}
				}
				this.$store.dispatch('updateSuggestion', newsuggestion)
			}
		}
	}
}
</script>
