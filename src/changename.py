import os
def changeName(path, cName):
    i = 1
    for filename in os.listdir(path):
        print(path + filename, '=>', path + str(cName) + str(i) + '.jpg')
        os.rename(path + filename, path + str(cName) + str(i) + '.jpg')
        i += 1


changeName('C:/Users/김현지/newhackathon/datasets/valid/blackrot/', 'blackrot')