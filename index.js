let work = new Worker('./work.js');

let img = document.getElementById('img');

let val = tf.browser.fromPixels(img);
const offset = tf.scalar(127.5);
// Normalize the image from [0, 255] to [-1, 1].
const normalized = val.sub(offset).div(offset);
work.postMessage({val: normalized.dataSync()})

work.onmessage = (data) => {
    let res = data.data;
    const {values, indices} = res;
    console.log(`It is a ${IMAGENET_CLASSES[indices]} with ${values*100}% confidence`)
}