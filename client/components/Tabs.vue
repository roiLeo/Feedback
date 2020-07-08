<template>
    <section>     
		<b-tabs 
		type="is-toggle-rounded" 
		position="is-centered">
            <b-tab-item 
			v-for="tab in status"
			:key="tab.desc"
			:label="tab.desc">
				<template slot="header">
					<b-icon :icon="tab.icon" size="is-small"></b-icon>
					<span> {{tab.desc}} </span>

					<b-tag type="has-text-primary" rounded> {{displayCounterByStatus(tab.id) || 0}} </b-tag> 
				</template>
			</b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
export default {
	props: {
		status: {
			type: Array,
			required: true
		},
		count: {
			type: Array
		},
	},
	methods: {
		displayCounterByStatus(status) {
			return this.count.find(a => a.status === status).count
		}
	},
}
</script>

<style>
.tabs .icon {
	vertical-align: middle;
}
.tabs .tag {
	margin-left: .5em;
}
.tabs a {
	background-color: #fff;
}
</style>