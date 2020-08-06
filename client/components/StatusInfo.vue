<template>
	<span class="tag has-text-weight-bold" :class="showStatusColor(status)">
		{{showStatusText(status)}}
	</span>
</template>

<script>
/* eslint-disable object-property-newline */
export default {
	props: {
		status: {
			type: Number
		}
	},
	data () {
		return {
			// TODO: replace by store
			AllStatus: [
				{id: 1, text: 'Under review', color: 'teal'},
				{id: 2, text: 'Planned', color: 'blue'},
				{id: 3, text: 'In Progress', color: 'purple'},
				{id: 4, text: 'Complete', color: 'green'}
			]
		}
	},
	methods: {
		showStatusText (value) {
			return this.AllStatus.find((status) => status.id === value).text || {}
		},
		showStatusColor (value) {
			return this.AllStatus.find((status) => status.id === value).color || {}
		}
	}
}
</script>

<style lang="scss" scoped>
.tag {
	&.blue {
		background-color: #1fa0ff;
		color: #fff;
	}
	&.purple {
		background-color: #c17aff;
		color: #fff;
	}
	&.green {
		background-color: #6dd345;
		color: #fff;
	}
}
</style>
