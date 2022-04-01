import requests
import execjs
# import js2py
import base64

with open('td.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
asst = execjs.compile(js_code)
sdd = asst.call("hqxb", "081819hqxb")

headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/96.0.4664.45 Safari/537.36",
    "referer": "https://account.talkingdata.com/?languagetype=zh_cn"
}
username = "2652256344@qq.com"
username = base64.b64encode(username.encode("utf8"))
name = ''.join(str(username)[1:]).replace("'", "")
data = {
    "email": name,
    "password": f"{sdd}"
}
setis = requests.session()
r = setis.post("https://account.talkingdata.com/api/v1/login", headers=headers, json=data)
cookies = setis.cookies.get_dict()
res = requests.get("https://account.talkingdata.com/client/api/v1/public/group", headers=headers, cookies=cookies)

print(res.text)
