<template>
	<b-field>
		<b-input placeholder="Search suggestions..." 
		rounded
		expanded
		type="text"
		icon="search"
		size="is-medium"
		v-bind:value="value"
		v-on:input="$emit('input', $event.target.value)"></b-input>
		<p class="control">
			<button class="button is-medium">Search</button>
		</p>
	</b-field>
</template>

<script>
export default {
	name: 'SearchBar',
	props: ['value']
};
</script>

<style scoped>
input.input {
	box-shadow: inherit;
	-webkit-box-shadow: inherit;
}
</style>
