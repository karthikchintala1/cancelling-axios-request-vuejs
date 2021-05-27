import * as actions from './actions';

const states = {
    IDLE: "Idle 🟡",
    IN_PROGRESS: "In Progress 📀",
    SUCCEEDED: "Successful ✅",
    CANCELLED: "Cancelled ❌",
};

const state = {
    cancelRequest: null,
    users: [],
    currentStatus: states.IDLE
};

const getters = {
    requestInProgress (state) {
        if (state.cancelRequest) {
            return true;
        }
        return false;
    }
};

function updateStatus (state, msg) {
    state.currentStatus = msg;
}

const mutations = {
    addRequest (state, payload) {
        state.users = [];
        state.cancelRequest = payload;
        updateStatus(state, states.IN_PROGRESS);
    },
    cancelRequest (state) {
        if (state.cancelRequest) {
            state.cancelRequest();
        }
        state.cancelRequest = null;
        updateStatus(state, states.CANCELLED);
    },
    updateUserData (state, payload) {
        state.users = [];
        payload.data.forEach(user => {
            state.users.push(user);
        });
        state.cancelRequest = null;
        updateStatus(state, states.SUCCEEDED);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
