import re
import js2py
import requests


headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,"
              "application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "cookie": "nickname=%2500; sajssdk_2015_cross_new_user=1; resolution=1080*1920; "
              "Hm_lvt_c826b0776d05b85d834c5936296dc1d5=1647318071; kk_s_t=1647318072630; "
              "cf_clearance=TiOLWGoaq1L_GPcgAmT4jq.SWMUaalg1LBvJaJE.ano-1647318076-0-150; "
              "sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217f8bcef5a9869-06b73a81eabbe7-978183a-2073600"
              "-17f8bcef5aae27%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A"
              "%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5"
              "%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22"
              "%24device_id%22%3A%2217f8bcef5a9869-06b73a81eabbe7-978183a-2073600-17f8bcef5aae27%22%7D; "
              "referer_name=; __cf_bm=aIJXZy7igaEEGk9X5tW9V76ibHr_9Aff0ZFeg5inkMQ-1647336157-0"
              "-AWmeYHYjKIeR8jLIaWHPfIenmmx4WrlFzegRK2xFNQecmtHx4KhYLLKnK6WbN/vwvK/vbb3ZRatVuJpu/XaSoYQ=; "
              "Hm_lpvt_c826b0776d05b85d834c5936296dc1d5=1647336157",
    "pragma": "no-cache",
    "referer": "https://www.kuaikanmanhua.com/web/topic/7873/",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/96.0.4664.45 Safari/537.36 "
}
response = requests.get('https://www.kuaikanmanhua.com/web/comic/380991/', headers=headers)
html = response.text
src = re.findall('window.__NUXT__=(.*?)</script>', html)[0]
var = 'var passsss = ' + src
asddsdsd = var + '\npaaaaaaaa = passsss.data[0].comicInfo.comicImages;\n\
function asdsad(){\
                return     paaaaaaaa}'
context = js2py.EvalJs()
with open('./kuaisis.js', 'w', encoding='utf-8')as f:
    f.write(asddsdsd)
with open('./kuaisis.js', 'r', encoding='utf-8')as f:
    context.execute(f.read())
    sdd = context.asdsad()
    a = 0
    for i in sdd:
        print(i['url'])
        a += 1
        print(a)
