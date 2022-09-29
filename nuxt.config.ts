import {defineNuxtConfig} from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        public: {
            apiUrl: process.env.NODE_ENV === 'production' ? 'https://api.finteria.com/api' : 'https://dev-api.finteria.com/api'
        }
    },
    css: [
        '@/assets/styles/main.scss'
    ],
    publicRuntimeConfig: {
        baseUrl: process.env.BASE_URL,
    },
    build: {
        optimization: {
            minimize: true
        }
    },
    app: {
        // baseURL: '/land/forex',
        head: {
            title: "Finteria",
            /*noscript: [{ innerHTML: '<iframe src="ns" height="0" width="0" style="display:none;visibility:hidden"></iframe>', body: true }],
            script: [
                {
                    hid: 'gtm',
                    children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W36239F');`
                }
            ]*/
        }
    }
})
