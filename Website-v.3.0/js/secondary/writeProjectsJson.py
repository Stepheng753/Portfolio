#!/usr/bin/env python3

import os
cur_parent = os.getcwd()
parent = '../../../../Personal-Projects/p5.js/'
os.chdir(parent)

def custom_sort(file_path):
    file_name = os.path.basename(file_path)
    file_ext = os.path.splitext(file_name)[1]
    return file_ext[::-1], file_name


def pathsToStr():
    paths = []
    for path, subdirs, files in os.walk(os.curdir):
        filesList = []
        for file in files:
            if any(x in file for x in ('js', 'html')):
                filesList.append(file)
        filesList.sort(key=custom_sort, reverse=True)
        if len(filesList) > 0:
            paths.append([path, filesList])
    paths.sort()

    rtnStr = ''
    for path in paths:
        if len(path[1]) > 0 and not ('vscode' in path[0]):
            rtnStr += '{projectName: \'' + path[0][path[0].rfind('/') + 1:] + '\',\n'
            rtnStr += 'filePaths: ['
            for file in path[1]:
                rtnStr += '\'' + parent[12:] + path[0][2:] + '/' + file + '\',\n'
            rtnStr = rtnStr[:-2] + ']},\n'
    return rtnStr

def writeToFile(filename):
    with open(filename, 'w') as txt_file:
        txt_file.write(pathsToStr())

writeToFile(cur_parent + '/projectPaths.txt')