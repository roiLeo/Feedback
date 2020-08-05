<template>
	<div>
		<b-field>
			<b-input placeholder="Search suggestions..." 
			rounded
			expanded
			type="search"
			icon="search"
			size="is-medium"
			aria-label="Search by company name or job title"

			@input="handleSearch"></b-input>
			<p class="control">
				<button class="button is-medium">Search</button>
			</p>
		</b-field>
		<b-dropdown 
		v-model="$store.state.suggestion.filter.order"
		@change="handleOrder"
		append-to-body aria-role="menu">
			<a class="navbar-item" slot="trigger" role="button">
				<b-icon icon="sort-amount-down"></b-icon>
				<span>Order By</span>
				<span class="selected-option"
				v-show="$store.state.suggestion.filter.order.length">
				<b>{{ $store.state.suggestion.filter.order }}</b></span>
			</a>
			<b-dropdown-item value="trending">
				<div class="media">
					<b-icon icon="chart-line"></b-icon>
					<div class="media-content">
						<h3>Trending</h3>
					</div>
				</div>
			</b-dropdown-item>
			<b-dropdown-item value="top">
				<div class="media">
					<b-icon icon="fire"></b-icon>
					<div class="media-content">
						<h3>Top</h3>
					</div>
				</div>
			</b-dropdown-item>
			<b-dropdown-item value="new">
				<div class="media">
					<b-icon icon="star"></b-icon>
					<div class="media-content">
						<h3>New</h3>
					</div>
				</div>
			</b-dropdown-item>
		</b-dropdown>
	</div>
</template>

<script>
export default {
	commputed: {
		search () {
			return this.$store.state.list.filter.search
		}
	},
	methods: {
		handleSearch (search) {
			this.$store.dispatch('filterSearch', search)
		},
		handleOrder (order) {
			this.$store.dispatch('orderSearch', order)
		}
	}
}
</script>

<style lang="scss" scoped>
.media-content {
	margin-left: 15px;
}
.selected-option {
	margin-left: 15px;

	&::first-letter {
		text-transform: capitalize;
	}
}
</style>
