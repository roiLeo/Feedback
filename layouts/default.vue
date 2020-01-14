<template>
	<div>
		<!-- <nav class="navbar header has-shadow is-primary is-spaced is-transparent" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<a class="navbar-item" href="/">
					<img src="~assets/buefy.png" alt="Buefy" height="28" />
				</a>

				<div class="navbar-burger">
					<span />
					<span />
					<span />
				</div>
			</div>
		</nav> -->

		<div class="hero is-fullheight">
            <div class="hero-body">
                <div class="container">
					<div class="columns is-mobile">
						<div class="column is-three-fifths is-offset-one-fifth">

							<nuxt />

						</div>
					</div>
                </div>
            </div>
		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					title: 'Home',
					icon: 'home',
					to: { name: 'index' }
				},
			]
		};
	}
};
</script>
