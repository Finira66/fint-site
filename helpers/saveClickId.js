import {ref, onMounted} from 'vue';

export function saveClickId() {
    onMounted(() => {
        const route = useRoute();
        const hash = ref(route.query.clickid ? route.query.clickid : '')

        if (!localStorage.getItem('click_hash')) {
            localStorage.setItem('click_hash', hash.value);
            document.cookie = route.query.clickid ? `click_hash=${hash.value}` : ''
        }

        const date = new Date(); // now date
        const futureDate = new Date(date);
        futureDate.setDate(futureDate.getDate() + 30);

        if (!localStorage.getItem('expiry_date')) {
            localStorage.setItem('expiry_date', `${futureDate.getTime()}`)
        }

        const expiryDate = +localStorage.getItem('expiry_date')

        if (date.getTime() > expiryDate) {
            localStorage.removeItem('expiry_date');
            document.cookie = 'click_hash' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    })
}
