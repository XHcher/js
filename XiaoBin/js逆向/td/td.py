# -*- coding: UTF-8 -*-
import execjs
import js2py

context = js2py.EvalJs()
with open('td.js', 'r', encoding='UTF-8')as f:
    js_code = f.read()
    context.execute(js_code)
    sdd = context.hqxb()
