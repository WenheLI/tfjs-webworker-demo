importScripts('./dist/tf-core.js');
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-layers');
const MOBILENET_MODEL_PATH = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
let model;

let task = async (bitmap) => {
    let {width, height} = bitmap;
    model = await tf.loadLayersModel(MOBILENET_MODEL_PATH);
    const offscreen = new OffscreenCanvas(width, height);
    let ctx = offscreen.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, width, height);
    let pix = tf.browser.fromPixels(offscreen);
    pix = tf.image.resizeBilinear(pix, [224, 224]);
    const offset = tf.scalar(127.5);
    pix = pix.sub(offset).div(offset);
    pix = pix.reshape([1,224,224,3]);
    const res = model.predict(pix);
    res.print();
    const {values, indices} = tf.topk(res, 5);
    values.print();
    indices.print();
    self.postMessage({pix: pix.dataSync()})
};

self.addEventListener('message', (it) => {
    const bitmap = it.data.bitMap;
    task(bitmap)
})