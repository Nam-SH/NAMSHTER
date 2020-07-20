<template>
  <v-container>
    <v-container>
      <v-btn @click="fillData()">Randomize</v-btn>
    </v-container>
    <v-row>
      <div class="small">
        <line-chart :chart-data="datacollection"></line-chart>
      </div>
      <div class="small">
        <line-chart :chart-data="datacollection"></line-chart>
      </div>
      <div class="small">
        <line-chart :chart-data="datacollection"></line-chart>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from "@/components/LineChart.js";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            // backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: "Data One",
            // backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style>
.small {
  max-width: 300px;
  margin: 10px auto;
}
</style>
