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
					<TimeAgo :date="suggestion.creationDate"></TimeAgo>
					<Tags :tags="suggestion.tags"></Tags>
				</div>

				<div>
					<StatusInfo :status="suggestion.status"></StatusInfo>
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
	</div>
</template>

<script>
import StatusInfo from '~/components/StatusInfo'
import Tags from '~/components/Tags'
import TimeAgo from '~/components/TimeAgo'
import VotesCounter from '~/components/VotesCounter'

export default {
	components: {
		StatusInfo,
		Tags,
		TimeAgo,
		VotesCounter
	},
	props: {
		suggestion: {
			type: Object,
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

<style>
.card {
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
	border-radius: 0.5rem;
}

.card .media-right {
	margin-top: 8px;
	margin-bottom: auto;
	margin-left: 0;
	text-align: right;
}
</style>
