<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
                <h4>Create new Meetup</h4>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="title" id="title" v-model="title" label="Title" required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="location" id="location" v-model="location" label="Location" required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="imageUrl" id="image-url" v-model="imageUrl" label="Image Url" required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="description" id="description" label="Description" v-model="description" multi-line required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn type="submit" :disabled="!formIsValid" class="primary">CREATE MEETUP</v-btn>
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
            title: '',
            description: '',
            location: '',
            imageUrl: ''
        }
    },
    computed: {
        formIsValid() {
            return this.title !== ''
                && this.description !== ''
                && this.imageUrl !== ''
                && this.location !== '';
        }
    },
    methods: {

        onCreateMeetup() {
            if(!this.formIsValid){
                return
            }
            var d = new Date();
            var meetup = {
                title: this.title,
                description: this.description,
                imageUrl: this.imageUrl,
                location: this.location,
                createdDate: d.toDateString()
            }
            //console.log(this.title, this.imageUrl, this.description)
            this.$store.dispatch('createMeetup', meetup)
            this.$router.push('/meetups')
        }
    }
}
</script>

