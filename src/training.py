from keras.models import Sequential, load_model
from keras.layers import Dropout, Activation, Dense
from keras.layers import Flatten, Convolution2D, MaxPooling2D
from keras.callbacks import EarlyStopping
from keras.metrics import categorical_accuracy
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import json

import matplotlib.pyplot as plt
import numpy as np

X_train, Y_train, X_valid, Y_valid = np.load('C:/Users/김현지/newhackathon/models/model.npy', allow_pickle=True)
categories = ["healthy", "blackrot", "esca", "leafblight"]
early_stopping = EarlyStopping(monitor='loss', patience=10, verbose=1)

num_classes = len(categories)
model = Sequential()
model.add(Convolution2D(16, 3, 3, border_mode='same', activation='relu', input_shape=X_train.shape[1:]))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Convolution2D(32, 3, 3, border_mode='same', activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Convolution2D(64, 3, 3, border_mode='same'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(num_classes,activation='softmax'))

model.compile(loss='categorical_crossentropy', optimizer='Adam', metrics=['accuracy'])
model.fit(X_train, Y_train, batch_size=100, nb_epoch=500, callbacks=[early_stopping])

test_predictions = model.predict(X_valid)
test_predictions = np.round(test_predictions)
accuracy = accuracy_score(Y_valid, test_predictions)
model.summary()

print(classification_report(Y_valid.argmax(axis=1), test_predictions.argmax(axis=1), target_names=["healthy", "blackrot", "esca", "leafblight"]))
print()
print("Overall Accuracy: "+str(accuracy))
'''
model_json = model.to_json()
with open('C:/Users/김현지/newhackathon/models/model.json', "w") as json_file :
    json.write(model_json)
    '''
model.save('C:/Users/김현지/newhackathon/models/model.h5')
print("saved model to disk")