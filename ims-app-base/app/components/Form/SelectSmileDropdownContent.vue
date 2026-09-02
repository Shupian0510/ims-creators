<template>
  <base-select-reaction-dropdown-content
    :reactions="smiles"
    :get-reaction-view="(n) => getLikeEmoji(n)"
    :selected-reactions="selectedSmiles"
    @select="$emit('select', $event)"
  ></base-select-reaction-dropdown-content>
</template>
<script lang="ts">
import { getLikeEmoji, smileNames } from '#logic/constants';
import { defineComponent } from 'vue';
import BaseSelectReactionDropdownContent from './BaseSelectReactionDropdownContent.vue';

export default defineComponent({
  name: 'SelectSmileDropdownContent',
  components: {
    BaseSelectReactionDropdownContent,
  },
  props: {
    selectedSmiles: {
      type: Set,
      default: null,
    },
  },
  emits: ['select'],
  computed: {
    smiles() {
      return smileNames;
    },
  },
  methods: {
    getLikeEmoji,
  },
});
</script>
