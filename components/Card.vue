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
					<p class="subtitle is-6">@User {{suggestion.userId}}</p>
				</div>
			</div>

			<div class="content">
				{{suggestion.body}}
				<br />
				<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
