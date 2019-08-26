<template>
  <div class="qrcode">
    <img  class="qrimg" :src="dataUrl" alt="二维码" ref="qrimg" />
    <div  class="poster" ref="poster">
      <img class="poster_bg" src="../../assets/images/imgshare.png" alt="海报背景" />
      <canvas class="canvas" ref="qr_canvas"></canvas>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      url: "http://m.qhiwi.com",
      dataUrl: ""
    };
  },
  mounted() {
    this.createQRCode();
  },
  methods: {
    createQRCode() {
      //先用 QRCode 生成二维码 canvas，然后用 html2canvas 合成整张海报并转成 base64 显示出来
      let canvas  = this.$refs.qr_canvas
      let poster = this.$refs.poster
      QRCode.toCanvas(canvas, this.url, err => {
          if(err) {
              console.log(err)
          }else {
              html2canvas(poster).then(canvas =>  {
                  this.dataUrl = canvas.toDataURL()
              })
          }
      })
    },
    // makeImg() {
    //   let img = this.$refs.qrimg;
    //   let canvas = document.createElement("canvas");
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //   QRCode.toCanvas(canvas, this.url, error => {
    //     if (error) {
    //       console.log("error::", error);
    //     } else {
    //       this.dataUrl = canvas.toDataURL("image/jpeg");
    //     }
    //   });
    // }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.qrcode {
  width: 100vw;
  height: 100vh;
  .qrimg {
    width: 400px;
    height: 400px;
  }
  .canvas{
      width: 500px;
      height: 500px;
  }
}
</style>
