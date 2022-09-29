<template>
  <form
      class="form"
      @submit.prevent="validate"
  >
    <div class="form__title">
      {{ $t('register.title') }}
    </div>
    <svg class="icon icon_badge form__badge" height="1em" width="1.1724137931034482em">
      <use xlink:href="#icon-badge"></use>
    </svg>
    <div class="form__holder">
      <div class="form__field form__field_email">
        <input
            class="form__input"
            type="email"
            name="email"
            placeholder="E-mail"
            required="required"
            v-model="data.email"
        />
        <svg class="icon icon_email form__field-icon" height="1em" width="1em">
          <use xlink:href="#icon-email"></use>
        </svg>
      </div>
      <div class="form__field form__field_password">
        <input
            class="form__input"
            type="password"
            name="password"
            placeholder="Password"
            required="required"
            v-model="data.password"
            autocomplete="on"
        />
        <svg class="icon icon_password form__field-icon" height="1em" width="1em">
          <use xlink:href="#icon-password"></use>
        </svg>
      </div>

      <button
          class="button form__submit"
          type="submit">
        <span>Get Bonus</span>
      </button>
    </div>

    <div v-if="v$.email.$error" class="error">
      <!--       {{ $t(emailError) }}-->
      <p v-for="error in v$.email.$errors" :key="error.$uid" class="error">
        {{ $t(error.$message) }}
      </p>
    </div>
    <div v-if="v$.password.$error" class="error">
      {{ $t('error-password') }}
    </div>

    <ClientOnly>
      <VueRecaptcha
          ref="recaptcha"
          size="invisible"
          :sitekey="sitekey"
          @verify="submit"
          @expired="onCaptchaExpired"
      />
    </ClientOnly>

  </form>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, email, minLength, helpers} from '@vuelidate/validators'

import {ref, reactive, onMounted} from "vue";
import {detectedCountry, registerUser} from "@/api/api";

export default {
  name: "RegisterForm",
  setup(_, context) {
    const $externalResults = ref({})

    const sitekey = "6LeP_ycaAAAAAB-iHonGh-DI8tU5etFLbbdyTAVT";
    const data = reactive({
      email: "",
      password: "",
      country_id: null,
      recaptcha_token: null,
      click_hash: null
    });

    const recaptcha = ref(null);
    const isLoad = ref(false);

    const emailError = ref('');
    const isEmailTaken = ref(false);

    /*async function country() {
      const countryData = await detectedCountry();
      data.country_id = countryData.id;
    }

    country();*/

    const rules = {
      email: {
        required,
        email: helpers.withMessage('error-email', email),
        serverValidation: {
          $message: 'User is not found'
        }
      },
      password: {
        required,
        minLength: minLength(8),
        valid: function (value) {
          const containsNumber = /[0-9]/.test(value);
          return containsNumber;
        }
      }
    };

    const v$ = useVuelidate(rules, data, {$externalResults});

    async function validate() {
      $externalResults.value = '';
      v$.value.$reset();
      const isValidate = await v$.value.$validate();
      if (!isValidate) return;

      recaptcha.value.execute();
    }

    async function submit(recaptchaToken) {
      isEmailTaken.value = false;
      data.recaptcha_token = recaptchaToken;
      try {
        isLoad.value = true;
        /*const user = await registerUser(data).then((response) => response.data);
        context.emit('load', isLoad.value, user.token);*/
      } catch (error) {
        if (error.response.data.errors.email) {
          const errors = {
            email: 'email-already-taken',
          }
          $externalResults.value = errors;
        }

      }
    }

    function onCaptchaExpired() {
      recaptcha.value.reset();
    }

    onMounted(() => {
      data.click_hash = localStorage.getItem("click_hash") ? localStorage.getItem("click_hash") : null;
    });


    return {
      data,
      v$,
      recaptcha,
      submit,
      validate,
      isLoad,
      sitekey,
      onCaptchaExpired,
      emailError
    };
  }
}
</script>
