importScripts('./dist/tf-core.js');
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-layers');
const MOBILENET_MODEL_PATH = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
let model;

let task = async () => {
    model = tf.loadLayersModel(MOBILENET_MODEL_PATH);    
};

task();

self.onmessage = async (data) => {
    model = await model;
    let val = data.data.val;
    val = tf.tensor(val, [1,224,224,3]);
    const res = model.predict(val);
    const {values, indices} = tf.topk(res);

    postMessage({values: values.dataSync(), indices: indices.dataSync()});
}


