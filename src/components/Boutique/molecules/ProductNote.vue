<template>
    <div class="note-container">
      <div
        class="note-bar"
        :class="{ 'high-rating': note >= 4.8 }"
        :style="{ width: note * 20 + '%' }"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      note: {
        type: Number,
        required: true,
        validator: (value) => value >= 0 && value <= 5
      }
    }
  }
  </script>
  
  <style scoped>
  .note-container {
    width: 90%;
    height: 15px;
    background-color: #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .note-bar {
    height: 100%;
    background: linear-gradient(90deg, #00c6ff, #0072ff);
  }
  
  /* 🌟 Spécial pour les notes >= 4.8 */
  .high-rating {
    background: linear-gradient(90deg, gold, orange);
    animation: shimmer 1s infinite;
    background-size: 200% 100%;
  }
  
  /* ✨ Animation brillante */
  @keyframes shimmer {
    0% {
      background-position: 100% 0;
      border-radius: 5px;
    }
    100% {
      background-position: -100% 0;
      border-radius: 5px;
    }
  }
  </style>
  