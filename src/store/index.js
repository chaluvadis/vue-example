import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase'

let config = {
    apiKey: "AIzaSyAaaAphMFYJTWPF7pe1nBIkSmLy5AB_0WM",
    authDomain: "devmeetup-74f32.firebaseapp.com",
    databaseURL: "https://devmeetup-74f32.firebaseio.com",
    projectId: "devmeetup-74f32",
    storageBucket: "",
    messagingSenderId: "334324140892"
};

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [],
        user: null,
        loading: null,
        error: null
    },
    mutations: {
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload);
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        loadMeetups({ commit }) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            location: obj[key].location,
                            createdDate: obj[key].createdDate
                        })
                    }
                    console.log(meetups);
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)

                })
                .catch((err) => {
                    console.log(err);
                    commit('setLoading', false)
                })
        },
        createMeetup({ commit }, payload) {
            var meetup = {
                title: payload.title,
                description: payload.description,
                imageUrl: payload.imageUrl,
                location: payload.location,
                createdDate: payload.createdDate.toISOString()
            }

            firebase.database()
                .ref('meetups')
                .push(meetup).
                then((data) => {
                    var key = data.key
                    commit('createMeetup', {
                        ...meetup,
                        id: key
                    })
                })
                .catch((err) => {
                    commit('setError', err)
                })
        },
        onUserSignUp({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    console.log(user);
                    commit('setLoading', false)

                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                })
                .catch(error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                })
        },
        onUserSignIn({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    console.log(user);
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                })
                .catch(error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                })
        },
        clearError({ commit }) {
            commit('clearError')
        }
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.createdDate > meetupB.createdDate;
            })
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup(state) {
            return (meetupId) => {
                var temp = state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                });
                return temp
            }
        },
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }
})