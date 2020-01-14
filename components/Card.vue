<template>
	<div class="card">
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<b-button
						size="is-small"
						type="is-flat"
						icon-left="chevron-up"
						@click.prevent="incrementCounter"
					></b-button>
					<div class="is-size-3 has-text-centered has-text-weight-bold">{{ count }}</div>
					<b-button
						size="is-small"
						type="is-flat"
						icon-left="chevron-down"
						@click.prevent="decrementCounter"
					></b-button>
				</div>
				<div class="media-content">
					<p class="title is-4">
						<nuxt-link
							:to="{ name: 'suggestions-id', params: { id: suggestion.id } }"
						>{{suggestion.title}}</nuxt-link>
					</p>
					<p class="subtitle is-6">@User {{suggestion.userId}}</p>
				</div>
				<div class="media-right">
					<b-button
						tag="nuxt-link"
						:to="{ name: 'suggestions-id', params: { id: suggestion.id } }"
						type="is-primary has-text-light"
						icon-left="comment-alt"
						rounded
					></b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		suggestion: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			count: 0
		};
	},
	methods: {
		incrementCounter() {
			this.count++;
		},
		decrementCounter() {
			this.count > 0 && this.count--;
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