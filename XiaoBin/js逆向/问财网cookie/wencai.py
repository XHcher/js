# -*- coding: utf-8 -*-
import io
import sys

import requests
import execjs

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, errors='replace', line_buffering=True)
with open("wencai.js", "r", encoding="utf-8")as f:
    ces = f.read()

cts = execjs.compile(ces)
a = cts.call("asts")
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/96.0.4664.45 Safari/537.36",
    "Cookie": f"{a}",
    "hexin-v": f"{a}",
    "Host": "www.iwencai.com"
}
r = requests.get(
    "http://www.iwencai.com/stockpick/load-data?typed=1&preParams=&ts=1&f=3&qs=result_rewrite&selfsectsn=&querytype"
    "=stock&searchfilter=&tid=stockpick&w=%E7%BB%BF%E8%89%B2%E5%80%BA%E5%88%B8&queryarea=",
    headers=headers)
r.encoding = 'utf-8'
print(r.text)
