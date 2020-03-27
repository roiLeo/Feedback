<template>
	<div class="card">
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<figure class="image is-48x48">
						<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
					</figure>
				</div>
				<div class="media-content">
					<p class="title is-4">
						<nuxt-link
              				:to="{ name: 'suggestions-id', params: { id: suggestion.id } }"
              			>{{suggestion.title}}</nuxt-link>
					</p>
					<p class="subtitle is-6">@{{suggestion.author}}</p>
				</div>
			</div>

			<div class="content">
				{{suggestion.content}}
				<br />
				<time :datetime="suggestion.creationDate">{{suggestion.creationDate }}</time>
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
	}
};
</script>
