<template>
  <q-page>
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

    <q-list>
      <q-item>
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
            <span class="text-grey-7"> @AlexEsaki </span>
          </q-item-label>
          <q-item-label class="qweet-content text-body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            perferendis quis tempore iure modi at doloribus sunt molestias vero
            quod officia, aut, inventore neque similique porro ad, voluptates
            architecto sed.
          </q-item-label>

          <div class="qweet-icon row justify-between q-mt-sm">
            <q-btn color="grey" flat round icon="far fa-comment" size="sm" />
            <q-btn color="grey" flat round icon="fas fa-retweet" size="sm" />
            <q-btn color="grey" flat round icon="far fa-heart" size="sm" />
            <q-btn color="grey" flat round icon="fas fa-trash" size="sm" />
          </div>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
    };
  },
});
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
.qweet-content
  white-space: pre-line
.qweet-icon
  margin-left: -5px
</style>