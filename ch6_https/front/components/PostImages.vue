<template>
  <div v-if="images.length === 0"></div>
  <div v-else-if="images.length === 1">
    <!-- :src="images[0].src.replace(/original\//, 'thumb/')" -->
    <!-- :src="`http://localhost:3085/${images[0].src}`" -->
    <v-img :src="`${srcAddress}/${images[0].src}`" contain aspect-ratio="2" @click="zoomImages" />
    <image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images" />
  </div>
  <div v-else-if="images.length === 2" style="display: flex">
    <v-img
      :src="`${srcAddress}/${images[0].src}`"
      contain
      aspect-ratio="2"
      style="flex: 1"
      @click.prevent="zoomImages"
    />
    <v-img
      :src="`${srcAddress}/${images[1].src}`"
      contain
      aspect-ratio="2"
      style="flex: 1"
      @click.prevent="zoomImages"
    />
    <image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images" />
  </div>

  <div v-else style="display: flex">
    <v-img
      :src="`${srcAddress}/${images[0].src}`"
      contain
      aspect-ratio="2"
      style="flex: 1"
      @click.prevent="zoomImages"
    />
    <div
      style="flex: 1; align-items: center; justify-content: center; display: flex"
      @click.prevent="zoomImages"
    >
      <div style="text-align: center">
        <v-icon>mdi-dots-horizontal</v-icon>
        <div>더 보기</div>
      </div>
    </div>
    <image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images" />
  </div>
</template>

<script>
import ImageZoom from "@/components/ImageZoom.vue";

export default {
  components: {
    ImageZoom
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      imageZoomed: false
    };
  },
  computed: {
    srcAddress() {
      return process.env.NODE_ENV === "production"
        ? "https://api.namshter.com"
        : "http://localhost:3085";
    }
  },
  methods: {
    closeModal() {
      this.imageZoomed = false;
    },
    zoomImages() {
      this.imageZoomed = true;
    }
  }
};
</script>