<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
                <h4>Singup</h4>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mb-2" v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onUserSingUp">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="email" type="email" hint="example@example.com" class="input-group--focused" id="email" v-model="email" label="Enter your email" required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="password" id="password" v-model="password" type="password" label="Enter your password" hint="At least 8 characters" min="8" class="input-group--focused" required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="conformpassword" id="conformpassword" v-model="conformpassword" type="password" label="Enter your password" hint="At least 8 characters" min="8" class="input-group--focused" :rules="[comparePassword]" required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn type="submit" :disabled="loading" :loading="loading">
                                Sign Up
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            conformpassword: ''
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
        comparePassword() {
            return this.password !== this.conformpassword ? "Password not matched" : ''
        },
        user() {
            return this.$store.getters.user;
        },
        error() {
            return this.$store.getters.error;
        }
    },
    watch: {
        user(value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    },
    methods: {
        onUserSingUp() {
            this.$store.dispatch('onUserSignUp', {
                email: this.email,
                password: this.password
            })
        },
        onDismissed() {
            console.log('Dismiss alert')
            this.$store.dispatch('clearError')
        }
    }
}
</script>