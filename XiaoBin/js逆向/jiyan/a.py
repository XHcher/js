#!/usr/bin/python
# -*- coding: utf-8 -*-
import base64

import requests
import json
import time
import random
import execjs
import re
import hashlib
# while True:
#     res = requests.get('https://sh.ke.com/xiaoqu/beicai/')
#     if '人机认证' in res.text:
#         print('有了')
#         break
#     else:
#         continue

session = requests.session()
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
}

def get_token():
    '''获取贝壳token____32位随机数  '''
    ss = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    ss_list = [i for i in ss]
    # print(ss_list)
    token = ''.join(random.sample(ss_list,32))
    print("token:",token)
    return token


def get_gt_challenge(token):
    '''获取gt challenge参数'''
    t_data = {
        "sceneId": "security_goblin",
        "token": "{}".format(token),
    }
    t_res = session.get("https://captcha.lianjia.com/captcha/resource",headers=headers,params=t_data)
    t_json = json.loads(t_res.text)
    challenge = t_json["data"]["puzzle"]["resource"]
    gt = t_json["data"]["puzzle"]["metaData"]["gt"]

    print("challenge:",challenge)
    print("gt:",gt)

    return gt,challenge


def get_img_data(gt,challenge):
    '''获取图片信息 ：c , s ,pic参数'''
    data_gettype = {
        "gt":gt,
        "callback": "geetest_{}".format(str(int(time.time()) * 1000))
    }
    ss = session.get("https://api.geetest.com/gettype.php",headers=headers,params=data_gettype)
    print("aaa:",ss.text)

    ajax_data = {
        "gt": "{}".format(gt),
        "challenge": "{}".format(challenge),
        "lang": "zh-cn",
        "pt": "0",
        "w":"",
        "client_type": "web",
        "callback": "geetest_{}".format(str(int(time.time()) * 1000))
    }
    status = session.get("https://api.geetest.com/ajax.php",headers=headers,params=ajax_data)
    print("bbb:",status.text)

    img_data = {
        "gt": "{}".format(gt),
        "challenge": "{}".format(challenge),
        "lang": "zh-cn",
        "pt": "0",
        "w":"",
        "client_type": "web",
    }

    img = session.get("https://apiv6.geetest.com/get.php",headers=headers,params=img_data)
    img_json = re.compile(r'\((.*?)\)').findall(img.text)[0]
    img_data = json.loads(img_json)
    print('img_data:',img_data)

    c_data = img_data["data"]["c"]
    s_data = img_data["data"]["s"]
    pic_data = img_data["data"]["pic"]
    print(c_data,s_data,pic_data)

    img_url = 'http://static.geetest.com'+pic_data
    print('img_url:',img_url)

    return c_data,s_data,pic_data

def get_tt_data(c_data,s_data):
    '''获取tt参数'''
    with open('jiy_p.js', 'r', encoding='utf8')as f:
        jscode = f.read()
    tt_data = execjs.compile(jscode).call('get_o',c_data,s_data)
    print("tt:",tt_data)
    return tt_data



def get_rp_data(gt,challenge,passtime):
    '''获取rp参数'''
    code_str = gt+challenge+str(passtime)
    md = hashlib.md5(code_str.encode())
    return md.hexdigest()


def xy_data():

    data = input("请输入坐标：x1_y1,x2_y2,x3_y3:")
    x_y_list = data.split(',')
    a = ''
    for xy in x_y_list:
        x = xy.split('_')[0]
        y = xy.split('_')[1]
        final_x = int(round(int(x) / 306 * 100 * 100))
        final_y = int(round(int(y) / 306 * 100 * 100))
        x_y = str(final_x) + '_' + str(final_y)
        a += x_y + ','
    a = a[0:-1]
    return a

#
def get_f(o_data):
    with open('jiy_q.js', 'r', encoding='utf8')as f:
        jscode = f.read()
    f_data = execjs.compile(jscode).call('get_',o_data)
    print("p:",f_data)
    return f_data


def get_u():
    with open('jiyan.js', 'r', encoding='utf8')as f:
        jscode = f.read()
    u_data = execjs.compile(jscode).call('get_w_u')
    print("u:",u_data)
    return u_data

def check_data(gt,challenge,w):

    click_data = {
        "gt": "{}".format(gt),
        "challenge": "{}".format(challenge),
        "lang": "zh-cn",
        "pt": "0",
        "w":"{}".format(w),
        "client_type": "web",
        "callback": "geetest_{}".format(str(int(time.time()) * 1000))
    }

    img = session.get("https://api.geetest.com/ajax.php",headers=headers,params=click_data)
    print(img.text)



def run():
    token = get_token()
    gt, challenge = get_gt_challenge(token)
    c_data, s_data, pic_data = get_img_data(gt,challenge)
    tt = get_tt_data(c_data, s_data)
    passtime = 2986  # passtime 随机
    rp = get_rp_data(gt, challenge, passtime)
    print("rp:", rp)
    a = xy_data()
    print('a:', a)

    o_data = {
        "lang": "zh-cn",
        "passtime": "{}".format(str(passtime)),
        "a": "{}".format(a),
        "pic": "{}".format(pic_data),
        "tt": "{}".format(tt),
        "ep": {
            "ca": [{"x": 403, "y": 457, "t": 1, "dt": 1211},
                   {"x": 406, "y": 358, "t": 1, "dt": 295},
                   {"x": 499, "y": 416, "t": 1, "dt": 344},
                   {"x": 410, "y": 627, "t": 3, "dt": 2344}],
            "v": "3.0.2",
            "te": "false",
            "me": "true",
            "tm": {
                "a": 1643249277766,
                "b": 1643249277970,
                "c": 1643249277972,
                "d": 0,
                "e": 0,
                "f": 1643249277774,
                "g": 1643249277820,
                "h": 1643249277820,
                "i": 1643249277820,
                "j": 1643249277823,
                "k": 0,
                "l": 1643249277823,
                "m": 1643249277958,
                "n": 1643249277961,
                "o": 1643249277975,
                "p": 1643249278956,
                "q": 1643249278956,
                "r": 1643249278956,
                "s": 1643249279320,
                "t": 1643249279320,
                "u": 1643249279321
            }
        },
        "krvg": "2059210578",
        "rp": "{}".format(rp)
    }
    p = get_f(o_data)
    u = get_u()
    # w值
    w = p + u
    print('w:', w)
    check_data(gt, challenge, w)


if __name__ == '__main__':
    run()