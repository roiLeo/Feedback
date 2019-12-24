<template>
  <section class="home">
	   <div class="hero is-fullheight is-primary">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title is-2">Feature Requests</h1>
                    <h2 class="subtitle has-text-light">Learn everything you need to start using Buefy ;)</h2>

					<SearchBar></SearchBar>
					<Tabs></Tabs>
                </div>
            </div>
        </div>
  </section>
</template>

<script>
import Card from '~/components/Card'
import SearchBar from '~/components/SearchBar'
import Tabs from '~/components/Tabs'

export default {
  name: 'HomePage',

  components: {
	Card,
	SearchBar,
	Tabs
  }
}
</script>
