<template>
	<section class="home">
		<h1 class="title is-2 has-text-centered">Feature Requests</h1>
		<h2 class="subtitle has-text-light has-text-centered">Join other users in helping make the website better</h2>

		<SearchBar></SearchBar>
		<Tabs></Tabs>

		<b-button size="is-small"
		type="is-primary"
		icon-left="plus" 
		tag="nuxt-link" 
		to="/new"
		class="is-pulled-right">New</b-button>
	</section>
</template>

<script>
import Card from '~/components/Card';
import SearchBar from '~/components/SearchBar';
import Tabs from '~/components/Tabs';

export default {
	name: 'HomePage',

	components: {
		Card,
		SearchBar,
		Tabs
	}
};
</script>
