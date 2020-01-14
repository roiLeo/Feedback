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
					<h2 class="is-size-3 has-text-centered has-text-weight-bold">{{ count }}</h2>
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
		}
	},
	methods: {
        incrementCounter() {
            this.count ++
		},
		decrementCounter() {
			this.count > 0 && this.count --
		}
    }
}
</script>
