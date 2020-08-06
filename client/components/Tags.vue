<template>
	<div class="field">
		<span v-for="(tag, index) in tags"
		:key="index">
			<b-tag
				v-if="isTag1Active"
				type="is-primary"
				closable
				aria-close-label="Close tag"
				@close="isTag1Active = false"
			>{{tag}}</b-tag>
		</span>
	</div>
</template>

<script>
export default {
	props: {
		tags: {
			type: Array,
		}
	},
	data () {
		return {
			isTag1Active: true
		}
	}

}
</script>

<style>
</style>
