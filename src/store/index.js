import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [{
            id: "route1",
            imageUrl: 'http://www.hopper.com/cms-assets/images/Destinations/North-America/USA/Illinois/Chicago-fountain-ss-800.jpg',
            title: 'Vue Js Meetup - 1 in Chicago',
            createdDate: '2017-07-01',
            location: 'Chicago Downtown',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda at deserunt dolorum eius esse eum, expedita hic illo ipsum magni, nobis, odio odit quaerat quibusdam quis rem veritatis voluptas!'
        }, {
            id: "route2",
            imageUrl: 'http://www.carpemundi.com.br/wp-content/uploads/2015/09/theatre-chicago.jpg',
            title: 'Vue js Meetup - 2 in Chicago',
            createdDate: '2017-07-12',
            location: 'Chicago Downtown',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda at deserunt dolorum eius esse eum, expedita hic illo ipsum magni, nobis, odio odit quaerat quibusdam quis rem veritatis voluptas!'
        }, {
            id: "route3",
            imageUrl: 'https://www.wtca.org/system/images/W%40siZiIsIjIwMTUvMDYvMTAvMTUvMDAvMTkvOTI%23LzFfY%23hpY%23Fnb%40%3Eza%24lsaW%5ElX%23plZmZfbGV%24aXMuanBnIl%21sWyJwIiwidGh%40bWIiLCI%5ENzV%25NDI%40IyJdXQ/1-chicago-skyline-jeff-lewis.jpg',
            title: 'Vue js Meetup - 3 in Chicago',
            createdDate: '2017-07-16',
            location: 'Chicago Downtown',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda at deserunt dolorum eius esse eum, expedita hic illo ipsum magni, nobis, odio odit quaerat quibusdam quis rem veritatis voluptas!'
        }, {
            id: "route4",
            imageUrl: 'http://airlines-airports.com/wp-content/uploads/2016/07/USA-chicago.jpg',
            title: 'Vue js Meetup - 4 in Chicago',
            createdDate: '2017-07-21',
            location: 'Chicago Downtown',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda at deserunt dolorum eius esse eum, expedita hic illo ipsum magni, nobis, odio odit quaerat quibusdam quis rem veritatis voluptas!'
        }],
        user: {
            id: 'asdasdfsd2343',
            registeredMeetups: ["dsafdsafsdfdfsfd"]
        }
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload);
        }
    },
    actions: {
        createMeetup({commit}, payload) {
            var meetup = {
                id: parseInt(Math.random(1000,99999)*10000).toString(),
                title: payload.title,
                description: payload.description,
                imageUrl: payload.imageUrl,
                location: payload.location,
                createdDate: payload.createdDate
            }
            commit('createMeetup', meetup)
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
        }
    }
})