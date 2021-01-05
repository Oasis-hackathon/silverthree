import os, re, glob
import cv2
import numpy as np
from tensorflow import keras
import tensorflow as tf

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])



def MyPythonCode():
    categories = ["healthy", "blackrot", "esca", "leafblight"]
    model = tf.keras.models.load_model('/home/hyeonji/silverthree/src/model.h5')
    print("loaded model from disk")

    def Dataization(img_path):
        image_w = 32
        image_h = 32
        ff = np.fromfile(img_path, np.uint8)
        img = cv2.imdecode(ff, cv2.IMREAD_UNCHANGED)
    
        img=cv2.resize(img, None, fx=image_w/img.shape[1], fy=image_h/img.shape[0])
        return (img/256)

    src=[]
    name=[]
    test=[]

    image_dir= "/home/hyeonji/silverthree/test/"

    for file in os.listdir(image_dir):
        if (file.find('.jpg') is not -1):
            src.append(image_dir+file)
            name.append(file)
            test.append(Dataization(image_dir+file))

    test = np.array(test)


    predict = model.predict_classes(test)

    for i in range(len(test)):
        print(name[i] + ": , predict: " + str(categories[predict[i]]))
        printdata = name[i] + ": , predict: " + str(categories[predict[i]])
    
    return render_template('client.html', data=printdata)

if __name__ == "__main__":
    app.run()

