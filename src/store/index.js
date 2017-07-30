import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [{
            id: "route1",
            imageUrl: 'http://www.hopper.com/cms-assets/images/Destinations/North-America/USA/Illinois/Chicago-fountain-ss-800.jpg',
            title: 'Vue Js Meetup - 1 in Chicago',
            createdDate: '2017-07-01'
        }, {
            id: "route2",
            imageUrl: 'http://www.carpemundi.com.br/wp-content/uploads/2015/09/theatre-chicago.jpg',
            title: 'Vue js Meetup - 2 in Chicago',
            createdDate: '2017-07-12'
        }, {
            id: "route3",
            imageUrl: 'https://www.wtca.org/system/images/W%40siZiIsIjIwMTUvMDYvMTAvMTUvMDAvMTkvOTI%23LzFfY%23hpY%23Fnb%40%3Eza%24lsaW%5ElX%23plZmZfbGV%24aXMuanBnIl%21sWyJwIiwidGh%40bWIiLCI%5ENzV%25NDI%40IyJdXQ/1-chicago-skyline-jeff-lewis.jpg',
            title: 'Vue js Meetup - 3 in Chicago',
            createdDate: '2017-07-16'
        }, {
            id: "route4",
            imageUrl: 'http://hdwall.us/wallpaper/chicago_skyline_night_time_desktop_1024x768_hd-wallpaper-118561.jpg',
            title: 'Vue js Meetup - 4 in Chicago',
            createdDate: '2017-07-21'
        }],
        user: {
            id: 'asdasdfsd2343',
            registeredMeetups: ["dsafdsafsdfdfsfd"]
        }
    },
    mutations: {},
    actions: {},
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