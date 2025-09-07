// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import { createManager } from '@vue-youtube/core'
import PrimeVue from 'primevue/config'
import './style.css'
import './custom.css'
import preset from '@primevue/themes/aura'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Carousel from 'primevue/carousel'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faUser, faTerminal } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    library.add(faInstagram, faTiktok, faYoutube, faPlayCircle, faUser, faTerminal)
    // app.use(createManager())
    app.use(PrimeVue, {
      theme: {
        preset,
      },
    })
    app.component('font-awesome-icon', FontAwesomeIcon)
    app.component('FloatLabel', FloatLabel)
    app.component('InputText', InputText)
    app.component('Carousel', Carousel)
  },
} satisfies Theme
