// let work = new Worker('./work.js');
const MOBILENET_MODEL_PATH = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

let task = async () => {
    let dog = document.getElementById('dog');
    let bitMap = await createImageBitmap(dog);
    let worker = new Worker('./work.js');
    worker.postMessage({bitMap}, [bitMap]);
    worker.addEventListener('message', async (data) => {

        let model = await tf.loadLayersModel(MOBILENET_MODEL_PATH);
        let res = model.predict(tf.tensor(data.data.pix, [1,224,224,3]));
        const {values, indices} = tf.topk(res, 5);
        values.print();
        indices.print();

    });
}

task();