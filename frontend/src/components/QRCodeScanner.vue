<template>
  <div>
    <h2>QR Code 掃描</h2>

    <!-- 選擇相機 -->
    <select v-model="selectedConstraints">
      <option v-for="option in cameraOptions" :key="option.label" :value="option.constraints">
        {{ option.label }}
      </option>
    </select>

    <!-- 顯示掃描結果 -->
    <p v-if="result">掃描結果: <b>{{ result }}</b></p>
    <p class="error" v-if="error">{{ error }}</p>

    <!-- QR Code 掃描組件 -->
    <qrcode-stream
      :constraints="selectedConstraints"
      :formats="selectedBarcodeFormats"
      @detect="onDetect"
      @error="onError"
      @camera-on="onCameraReady"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";

// 掃描結果
const result = ref("");
const error = ref("");

// 相機選擇
const selectedConstraints = ref({ facingMode: "environment" });
const cameraOptions = ref([
  { label: "後置相機", constraints: { facingMode: "environment" } },
  { label: "前置相機", constraints: { facingMode: "user" } }
]);

// 掃描條碼格式（可支援 QR Code / EAN / CODE128 等）
const barcodeFormats = ref({
  qr_code: true,
  code_128: false,
  code_39: false,
  ean_13: false,
  ean_8: false
});
const selectedBarcodeFormats = computed(() =>
  Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
);

// 偵測 QR Code
function onDetect(detectedCodes) {
  console.log("偵測到 QR Code:", detectedCodes);
  result.value = detectedCodes.map((code) => code.rawValue).join(", ");
}

// 相機初始化
async function onCameraReady() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(({ kind }) => kind === "videoinput");

    // 更新相機列表
    cameraOptions.value = videoDevices.map(({ deviceId, label }) => ({
      label: label || `相機 ${deviceId}`,
      constraints: { deviceId }
    }));

    console.log("可用相機:", cameraOptions.value);
    error.value = "";
  } catch (err) {
    console.error("相機初始化失敗:", err);
    error.value = "無法存取相機，請確認權限或裝置相機是否可用";
  }
}

// 錯誤處理
function onError(err) {
  console.error("掃描錯誤:", err);
  error.value = `[${err.name}]: ${err.message}`;
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
