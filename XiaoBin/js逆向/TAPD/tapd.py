import requests
import execjs
import io
import sys

# sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='gbk')
url = 'https://www.tapd.cn/cloud_logins/login?ref=https%3A%2F%2Fwww' \
      '.tapd.cn%2Fcompany%2Fparticipant_projects%3Ffrom%3Dleft_tree2'
with open("./tapd.js", "r") as f:
    js_code = f.read()

ctx = execjs.compile(js_code)
data_dict = ctx.call("aes", "081819Hqxb")
data_dict = data_dict['Login']
datas = {
    "data[Login][ref]": "https://www.tapd.cn/company/participant_projects?from=left_tree2",
    "data[Login][encrypt_key]": data_dict["encrypt_key"],
    "data[Login][encrypt_iv]": data_dict["encrypt_iv"],
    "data[Login][site]": "TAPD",
    "data[Login][via]": "encrypt_password",
    "data[Login][email]": "xiaobin@zhangkongapp.com",
    "data[Login][password]": data_dict["password_encode"],
    "data[Login][login]": "login",
    "dsc_token": "tGMgT8pINSdJbCwh"
}
headers = {

    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36"
}

response = requests.post(url, data=datas, headers=headers)
print(response.text)
response.encoding = 'utf-8'
print(response.cookies)
