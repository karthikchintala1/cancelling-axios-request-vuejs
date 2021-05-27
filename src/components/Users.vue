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
    </div>
    <br />
    <p>Request Status: {{ currentStatus }}</p>
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "Users",
  components: {
    BTable,
    BButton,
  },
  data() {
    return {
      fields: ["id", "avatar", "first_name", "last_name", "email"],
    };
  },
  methods: {
    ...mapActions("user", ["getUsersAsync"]),
    ...mapMutations("user", ["cancelRequest"]),
    async send() {
      await this.getUsersAsync();
    },
  },
  computed: {
    ...mapState("user", ["users", "currentStatus"]),
    ...mapGetters("user", ["requestInProgress"]),
  },
};
</script>
