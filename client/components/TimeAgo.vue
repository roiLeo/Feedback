<template>
	<p class="subtitle is-7">
		<time :datetime="date">{{timeSince(date)}}</time>
	</p>
</template>

<script>
/* eslint-disable array-element-newline */
import * as timeago from 'timeago.js'

export default {
	props: {
		date: {
			// type: Date
		}
	},
	methods: {
		timeSince (date) {
			const locale = (number, index) => [
				['à l\'instant', 'dans un instant'],
				['il y a %s secondes', 'dans %s secondes'],
				['il y a 1 minute', 'dans 1 minute'],
				['il y a %s minutes', 'dans %s minutes'],
				['il y a 1 heure', 'dans 1 heure'],
				['il y a %s heures', 'dans %s heures'],
				['il y a 1 jour', 'dans 1 jour'],
				['il y a %s jours', 'dans %s jours'],
				['il y a 1 semaine', 'dans 1 semaine'],
				['il y a %s semaines', 'dans %s semaines'],
				['il y a 1 mois', 'dans 1 mois'],
				['il y a %s mois', 'dans %s mois'],
				['il y a 1 an', 'dans 1 an'],
				['il y a %s ans', 'dans %s ans']
			][index]
			timeago.register('fr_FR', locale)
			return timeago.format(date, 'fr_FR')
		}
	}
}
</script>

<style>
</style>
