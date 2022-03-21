# -*- coding: UTF-8 -*-
import requests
from loguru import logger
import re
import time
import js2py
import pymysql
import pandas as pd


class DouY(object):

    def __init__(self):
        self.xx2 = 'ca1f68a016f39ab829cc86f600031601'
        self.backlist = ['35518', '9596882', '9542834', '7658306', '8211997', '7658306']
        self.test()

    @staticmethod
    def get_room(room_id):
        url: str = f'https://www.douyu.com/{room_id}'
        headers = {
            'referer': f'https://www.douyu.com/{room_id}',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                          '(KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.84',
        }
        try:
            r = requests.get(url, headers=headers).text
            try:
                roomid = re.search("\\$ROOM.room_id =(\\d+);", r).group(1)
                return roomid
            except Exception as e:
                logger.error(e)
                roomid = re.search("\\$ROOM.room_id =(.*?);", r).group(1).split(' ')[1]
                return roomid
        except Exception as e:
            logger.error(e)

    def douyuapi(self, xx0):
        data = {
            'name': xx0
        }
        try:
            xx1 = str(int(time.time()))
            r = requests.post('http://127.0.0.1:5000/get/AutoInfoList', data=data).json()
            js = r['data']
            context = js2py.EvalJs()
            context.execute(js)
            sdd = context.ub98484234(xx0, self.xx2, xx1)
            sdds = sdd.split('&')[-1].replace('sign=', '')
            return sdds, xx1
        except Exception as e:
            logger.error(e)

    @staticmethod
    def room_data(roomid, xx1, sdds):
        gethf = f'https://www.douyu.com/lapi/live/getH5Play/{roomid}'
        headers = {
            'referer': f'https://www.douyu.com/{roomid}',
            # 'referer':'https: // www.douyu.com / topic / LPLXJS?rid = 5067522',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                          '(KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.84'
        }
        vtime = time.strftime('%Y%m%d', time.localtime())
        vtime = '2201' + str(vtime)
        data = {
            'v': vtime,
            'did': 'ca1f68a016f39ab829cc86f600031601',
            'tt': xx1,
            'sign': sdds,
            'cdn': '',
            'rate': 0,
            'ver': 'Douyu_221083105',
            'iar': 1,
            'ive': 0,
            'hevc': 0,
            'fa': 0
        }
        logger.info(xx1)
        resp = requests.post(gethf, headers=headers, data=data).text
        if "房间未开播" in resp:
            logger.debug('房间状态:未开播')
        else:
            logger.debug('房间状态:已开播')
        logger.info(resp)
        return resp

    def test(self):
        # for i in self.backlist:

        for i in self.ward_rounds():
            try:
                logger.info(f"监测房间：【{i}】")
                xx0 = self.get_room(i)
                logger.info(f"真实房间号:{xx0}")
                context, xx1 = self.douyuapi(xx0)
                self.room_data(xx0, xx1, context)
                time.sleep(0.2)
            except Exception as e:
                logger.error(e)

    @staticmethod
    def ward_rounds():
        connection = pymysql.connect(user='sjdsData', port=59877, password='sjds!@#$1234',
                                     host='gz-cdb-ljtzmqnf.sql.tencentcdb.com', database='mtv')
        with connection.cursor() as cursor:
            query = f"SELECT source_url FROM `menu_model`.`menu_model_source` WHERE `source_url` LIKE '%douyu://%' " \
                    f"GROUP BY `source_url`"
            chunks = []
            for chunk in pd.read_sql(query, connection, chunksize=10000):
                chunks.append(chunk)
            result = pd.concat(chunks, ignore_index=True)
        cursor.close()
        connection.close()
        dou_adp = []
        for i in list(set(result['source_url'])):
            douyu_url = re.search('\\d+', i).group(0)
            dou_adp.append(douyu_url)
        return dou_adp


if __name__ == '__main__':
    DouY()
