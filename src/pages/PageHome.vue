<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newQweetContent"
            placeholder="What's happening?"
            counter
            maxlength="200"
            autogrow
            class="new-qweet"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img
                  src="https://secure.gravatar.com/avatar/3a7e9702158dcb9a35aa8edd451913fa?s=64"
                />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            :disable="!newQweetContent"
            class="q-mb-lg"
            unelevated
            rounded
            color="primary"
            label="Qweet"
            no-caps
          />
        </div>
      </div>
      <q-separator class="divider" size="10px" color="grey-2" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item v-for="qweet in qweets" :key="qweet.id" class="qweet q-py-md">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img
                  src="https://secure.gravatar.com/avatar/3a7e9702158dcb9a35aa8edd451913fa?s=64"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Alex Esaki</strong>
                <span class="text-grey-7">
                  @AlexEsaki <br class="lt-md" />&bull;{{
                    dateTime(qweet.date)
                  }}</span
                >
              </q-item-label>
              <q-item-label class="qweet-content text-body1">
                {{ qweet.content }}
              </q-item-label>

              <div class="qweet-icon row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  flat
                  round
                  icon="far fa-comment"
                  size="sm"
                />
                <q-btn
                  color="grey"
                  flat
                  round
                  icon="fas fa-retweet"
                  size="sm"
                />
                <q-btn color="grey" flat round icon="far fa-heart" size="sm" />
                <q-btn
                  color="grey"
                  flat
                  round
                  icon="fas fa-trash"
                  size="sm"
                  @click="deleteQweet(qweet)"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";

import moment from "moment";
moment.locale("fr");

export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [
        // {
        //   content:
        //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi debitis quidem cumque, sequi fuga, assumenda voluptatum culpa reprehenderit obcaecati laborum quibusdam totam molestiae provident, laboriosam accusantium optio? Quis, non unde.",
        //   date: 1627204254709,
        // },
        // {
        //   content:
        //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi debitis quidem cumque, sequi fuga, assumenda voluptatum culpa reprehenderit obcaecati laborum quibusdam totam molestiae provident, laboriosam accusantium optio? Quis, non unde.",
        //   date: 1627204281782,
        // },
      ],
    };
  },

  methods: {
    dateTime(value) {
      return moment().startOf(value).fromNow();
    },

    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
      };
      // this.qweets.unshift(newQweet);
      db.collection("qweets")
        .add(newQweet)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      this.newQweetContent = "";
    },

    deleteQweet(qweet) {
      db.collection("qweets")
        .doc(qweet.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },

  mounted() {
    db.collection("qweets")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let qweetChange = change.doc.data();
          qweetChange.id = change.doc.id;
          if (change.type === "added") {
            console.log("New qweet: ", qweetChange);
            this.qweets.unshift(qweetChange);
          }
          if (change.type === "modified") {
            console.log("Modified qweet: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed qweet: ", change.doc.data());
            let index = this.qweets.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            this.qweets.splice(index, 1);
          }
        });
      });
  },
};
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
.qweet-content
  white-space: pre-line
.qweet-icon
  margin-left: -5px
</style>