import os, re, glob
import cv2
import numpy as np

train_groups_folder_path = "C:/Users/김현지/newhackathon/datasets/train/"
valid_groups_folder_path = "C:/Users/김현지/newhackathon/datasets/valid/"
categories = ["healthy", "blackrot", "esca", "leafblight"]
num_classes = len(categories)

image_w = 32
image_h = 32

X_train = []
Y_train = []
X_valid = []
Y_valid = []

for idex, categorie in enumerate(categories):
    label = [0 for i in range(num_classes)]
    label[idex] = 1
    train_image_dir = train_groups_folder_path + categorie + "/"
    valid_image_dir = valid_groups_folder_path + categorie + "/"

    for top_train, dir_train, f_train in os.walk(train_image_dir):
        for filename in f_train:
            print(train_image_dir + filename)
            # 경로에 한글명
            ff = np.fromfile(train_image_dir+filename, np.uint8)
            img = cv2.imdecode(ff, cv2.IMREAD_UNCHANGED)
            # 경로에 한글명 끝
            img = cv2.resize(img, None, fx=image_w / img.shape[1], fy=image_h / img.shape[0])

            X_train.append(img / 256)
            Y_train.append(label)

    for top_valid, dir_valid, f_valid in os.walk(valid_image_dir):
        for filename in f_valid:
            print(valid_image_dir + filename)
            # 경로에 한글명
            ff = np.fromfile(valid_image_dir+filename, np.uint8)
            img = cv2.imdecode(ff, cv2.IMREAD_UNCHANGED)
            # 경로에 한글명 끝
            img = cv2.resize(img, None, fx=image_w / img.shape[1], fy=image_h / img.shape[0])

            X_valid.append(img / 256)
            Y_valid.append(label)

X_train = np.array(X_train)
Y_train = np.array(Y_train)
X_valid = np.array(X_valid)
Y_valid = np.array(Y_valid)

xy = (X_train, Y_train, X_valid, Y_valid)

print(xy[0].shape)
print(xy[1].shape)
print(xy[2].shape)
print(xy[3].shape)

np.save("C:/Users/김현지/newhackathon/models/model.npy", xy)
