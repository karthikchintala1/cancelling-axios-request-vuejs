<template>
  <div>
    <div>
      <b-button variant="outline-success" @click="send">Send Request</b-button>
      &nbsp;
      <b-button
        variant="outline-danger"
        :disabled="!requestInProgress"
        @click="cancelRequest"
        >Cancel Request</b-button
      >
      &nbsp;
      <b-button variant="outline-info" @click="reset">Reset</b-button>
    </div>
    <br />
    <p>Request Status: {{ currentState }}</p>
    <div v-if="users.length > 0">
      <div>
        <h4>Users in the reqres.in</h4>
      </div>
      <b-table
        striped
        bordered
        responsive
        hover
        :items="users"
        :fields="fields"
      >
        <template #cell(avatar)="data">
          <img v-bind:src="data.value" :width="50" :height="50" />
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { BTable, BButton } from "bootstrap-vue";
import axios from "axios";

const states = {
  IDLE: "Idle 🟡",
  IN_PROGRESS: "In Progress 📀",
  SUCCEEDED: "Successful ✅",
  CANCELLED: "Cancelled ❌",
};

const API_URL = "https://reqres.in/api/users?delay=2";

export default {
  name: "User",
  components: {
    BTable,
    BButton,
  },
  data() {
    return {
      fields: ["id", "avatar", "first_name", "last_name", "email"],
      users: [],
      request: null,
      currentState: states.IDLE,
    };
  },
  methods: {
    cancelRequest() {
      this.cancel();
      this.updateState(states.CANCELLED);
    },
    send() {
      this.users = [];
      this.updateState(states.IN_PROGRESS);
      this.cancel();
      let axiosSource = axios.CancelToken.source();
      this.request = { cancel: axiosSource.cancel };
      axios
        .get(API_URL, {
          cancelToken: axiosSource.token,
        })
        .then((res) => {
          this.users = res.data.data;
          this.updateState(states.SUCCEEDED);
        });
    },
    updateState(msg) {
      this.currentState = msg;
      this.request = null;
    },
    reset() {
      this.currentState = states.IDLE;
      this.cancel();
      this.request = null;
      this.users = [];
    },
    cancel() {
      if (this.request) this.request.cancel();
    },
  },
  computed: {
    requestInProgress() {
      return this.request;
    },
  },
};
</script>
