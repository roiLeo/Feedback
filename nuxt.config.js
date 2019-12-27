
export default {
	mode: 'universal',
	/*
	** Headers of the page
	*/
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'apple-touch-icon', type: 'image/x-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
			{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
			{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },
	/*
	** Global CSS
	*/
	css: [
		'assets/scss/main.scss'
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://buefy.github.io/#/documentation
		'nuxt-buefy',
		'nuxt-fontawesome'
	],
	buefy: {
		materialDesignIcons: false,
		defaultIconPack: 'fas',
		defaultIconComponent: 'font-awesome-icon'
	},
	fontawesome: {
		imports: [
			{
				set: '@fortawesome/free-solid-svg-icons',
				icons: ['fas']
			}
		]
	},
	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
		}
	}
}
