import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import ger from '@/locales/ger.json'
import ita from '@/locales/ita.json'

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'en',
        messages: {
            en,
            ru,
            ger,
            ita
        }
    })

    vueApp.use(i18n)
})
