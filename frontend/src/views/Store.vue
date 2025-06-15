<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >

    <v-img
      height="250"
      :src="cafe"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title>校內咖啡廳 咖啡兌換券</v-card-title>

      <v-card-subtitle>
        熱門
        <v-icon
          color="error"
          icon="mdi-fire-circle"
          size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        憑本券可兌換中杯拿鐵或美式乙杯(限校內使用)
      </div>
      <v-chip>100 ETH</v-chip>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    
    <v-card-title></v-card-title>

    <div class="px-4 mb-2">
      <v-chip-group v-model="selection" selected-class="bg-deep-purple-lighten-2">
        <v-chip>中杯拿鐵</v-chip>

        <v-chip>中杯美式</v-chip>
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        text="兌換"
        block
        border
        @click="reserve"
      ></v-btn>
    </v-card-actions>
  </v-card>
  
</template>
<script>
  import cafe from '@/assets/7035.jpg'


  export default {
    data: () => ({
      loading: false,
      selection: 1,
      cafe,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>

