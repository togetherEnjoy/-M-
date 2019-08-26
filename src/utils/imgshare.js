


const {createCanvas, loadImage} = require('canvas');//引入canvas
const canvas = createCanvas(750, 1334);//新建一张画布 500x500
const cts = canvas.getContext('2d');
// const fs =require('fs');


//TODO 二维码生成
function qr_code() {
    let qr = require('qr-image');//生成二维码模块
    let url='http://testm.qhiwi.com';
    // let text = 'm.qhiwi.com';//二维码要填充的内容或者链接
    let text=url;
    try {
        let img = qr.imageSync(text, {size: 50});
        drawing(img);
    } catch (e) {
        console.log(e)
    }
}

//TODO 组合图片
function drawing(img) {
    loadImage('http://60.205.183.20:5130/public/demo.png').then((image) => {//添加一张背景图片
        cts.drawImage(image, 0, 0, 750, 1334);//750x1334
        loadImage(img).then((image) => {//在背景图片的x轴、y轴、宽度、高度绘制图片
            // loadImage('demo2.jpg').then((image) => {//在背景图片的x轴、y轴、宽度、高度绘制图片
            cts.drawImage(image, 115, 400, 510, 510);
            console.log(canvas.toDataURL());//直接返回一个base64
            //generate(canvas.toDataURL());//生成图片

        })
    });
}

//TODO base64转图片
function generate(imgDemo) {
    let base64Data = imgDemo.replace(/^data:image\/\w+;base64,/, "");
    // let dataBuffer = new Buffer(base64Data, 'base64');
    // fs.writeFile("image.jpg", dataBuffer, function(err) {
    //     if(!err){
    //         console.log('图片生成成功');
    //     }else{
    //         console.log('图片生成出错:'+err);
    //     }
    // });

}


qr_code();
