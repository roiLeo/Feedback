<template>
    <section>     
		<b-tabs 
		type="is-toggle-rounded" 
		position="is-centered">
            <b-tab-item 
			v-for="tab in TabsData"
			:key="tab.title"
			:label="tab.title">
				<template slot="header">
					<b-icon :icon="tab.icon" size="is-small"></b-icon>
					<span> {{tab.title}} <b-tag :type="tab.tag" rounded> {{tab.count}} </b-tag> </span>
				</template>
			</b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
export default {
	data() {
        return {
			TabsData: [
				{title: 'Pending', icon: 'pause', tag: 'is-white has-text-blue', count: 3},
				{title: 'In progress', icon: 'hourglass-half', tag: 'is-white has-text-green', count: 1},
				{title: 'Completed', icon: 'check-square', tag: 'is-white has-text-red', count: 11},
			],
        }
    },
}
</script>

<style>
.tabs .icon {
	vertical-align: middle;
}
.tabs a {
	background-color: #fff;
}
</style>