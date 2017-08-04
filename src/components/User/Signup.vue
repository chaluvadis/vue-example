<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
                <h4>Singup</h4>
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
                            <v-btn type="submit" :disabled="!formIsValid" class="primary">Sing Un</v-btn>
                            <v-btn type="button" to="/signup">Sing In</v-btn>
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
            password: ''
        }
    },
    computed: {
        formIsValid() {
            return this.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && this.password !== ''
        }
    },
    methods: {
        onUserSingUp() {
            if (!this.formIsValid) {
                return
            }
            var user = {
                email: this.email,
                password: this.password
            }
            //console.log(this.title, this.imageUrl, this.description)
            this.$store.dispatch('createMeetup', meetup)
            this.$router.push('/meetups')
        }
    }
}
</script>