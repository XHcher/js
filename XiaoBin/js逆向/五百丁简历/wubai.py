import requests
import js2py

url = 'https://www.500d.me/common/public_key/?_=1647247536743'
headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Cookie": "token=3ae27b27-af98-44b3-b67a-a37fdc014e85; Hm_lvt_f2a5f48af9d935f4001ca4c8850ce7c0=1647244488; Hm_lvt_3e432021fa3cef1b8b58965a002fd8c9=1647244488; Hm_lvt_e3536a6a3ab44f13b238e19790090eb5=1647244488; _ga=GA1.2.1710727023.1647244488; _gid=GA1.2.696786518.1647244488; SESSION=5a553ee4-78a5-4723-9ffd-d76adc4c17b3; rememberMobile=2652256344%40qq.com; rememberPassword=true; memberAccount=2652256344%40qq.com; memberPassword=NTAwZHdvb2RvMDgxODE5aHF4Yg%3D%3D; _gat=1; Hm_lpvt_e3536a6a3ab44f13b238e19790090eb5=1647247525; Hm_lpvt_3e432021fa3cef1b8b58965a002fd8c9=1647247525; Hm_lpvt_f2a5f48af9d935f4001ca4c8850ce7c0=1647247525",
    "Host": "www.500d.me",
    "Pragma": "no-cache",
    "Referer": "https://www.500d.me/",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
}
r = requests.request("get", url, headers=headers).json()
datas = r['modulus']
# print(datas)
context = js2py.EvalJs()
with open('./wubai.js', 'r', encoding='utf-8')as f:
    context.execute(f.read())
    sdd = context.xb('081819hqxb', '{}'.format(datas))
data = {
    "username": "2652256344@qq.com",
    "enPassword": "{}".format(sdd),
    "service": "",
    "remember": "true"
}
dadsad = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "249",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": "rememberMobile=2652256344; token=4a89e4b5-1519-4b7b-8803-c261d40c426f; Hm_lvt_f2a5f48af9d935f4001ca4c8850ce7c0=1647244488; Hm_lvt_3e432021fa3cef1b8b58965a002fd8c9=1647244488; Hm_lvt_e3536a6a3ab44f13b238e19790090eb5=1647244488; _ga=GA1.2.1710727023.1647244488; _gid=GA1.2.696786518.1647244488; SESSION=5a553ee4-78a5-4723-9ffd-d76adc4c17b3; rememberMobile=2652256344%40qq.com; rememberPassword=true; memberAccount=2652256344%40qq.com; memberPassword=NTAwZHdvb2RvMDgxODE5aHF4Yg%3D%3D; _gat=1; Hm_lpvt_e3536a6a3ab44f13b238e19790090eb5=1647247525; Hm_lpvt_3e432021fa3cef1b8b58965a002fd8c9=1647247525; Hm_lpvt_f2a5f48af9d935f4001ca4c8850ce7c0=1647247525",
    "Host": "www.500d.me",
    "Origin": "https://www.500d.me",
    "Pragma": "no-cache",
    "Referer": "https://www.500d.me/",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "token": "3ae27b27-af98-44b3-b67a-a37fdc014e85",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
}
urs = 'https://www.500d.me/login/submit/'
session = requests.session()
r = session.post(urs, data=data, headers=dadsad)
print(r.cookies.get_dict())
print(r.text)
