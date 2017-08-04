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
                        <v-flex xs12 sm6 offset-sm3 mb-2>
                            <h4>Choose Date and Time</h4>
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker format="24hr" v-model="time"></v-time-picker>
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
            imageUrl: '',
            date: new Date(),
            time: new Date()
        }
    },
    computed: {
        formIsValid() {
            return this.title !== ''
                && this.description !== ''
                && this.imageUrl !== ''
                && this.location !== '';
        },
        submitableDateTime() {
            let date = new Date(this.date);
            console.log(this.time);
            if(typeof this.time === 'string') {
                let hours = this.time.match(/^(\d+)/)[1]
                let minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
            } else {
                date.setHours(this.time.getHours())
                date.setMinutes(this.time.getMinutes())
            }
            return date;
        }
    },
    methods: {
        onCreateMeetup() {
            if (!this.formIsValid) {
                return
            }
            var meetup = {
                title: this.title,
                description: this.description,
                imageUrl: this.imageUrl,
                location: this.location,
                createdDate: this.submitableDateTime
            }
            //console.log(this.title, this.imageUrl, this.description)
            this.$store.dispatch('createMeetup', meetup)
            this.$router.push('/meetups')
        }
    }
}
</script>

