import requests
from bs4 import BeautifulSoup
import re
import os
import mysql.connector
from dotenv import load_dotenv
load_dotenv()

# 取得.env檔案中的變數
host = os.getenv("DB_HOST")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
database = os.getenv("DB_NAME")

data_list = []

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
           "Referer":"https://open.spotify.com/"}

def fetch_data(url):
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    descriptions = soup.find_all("article",role="article")

    for description in descriptions:
        data_temp = {
            "time":"",
            "title":"",
            "tags":"",
            "url":"",
            "img":""
        }
        
        # 新聞時間
        time = description.find("span",class_="post-date")
        if time:
            #print(time.text)
            data_temp["time"]=time.text.strip()
        else:
            continue

        # 新聞標題
        title = description.find("h3",class_="title")
        data_temp["title"]=title.text.strip()
        #print(title.text.strip())

        # 新聞tag
        tags = description.find("div",class_="cat")
        if tags:
            data_temp["tags"]=tags.text.strip()

        # 新聞鏈結
        if title and title.a:
            href_value = title.a.get('href')
            data_temp["url"]=href_value.strip()
            #print(href_value)

        # 新聞圖片

        img_element = description.find('img')
        if img_element:
            img_src = img_element['data-lazy-src']
            data_temp["img"] = img_src
            #print(img_src)

        print(data_temp)
        data_list.append(data_temp)

    

for page in range(1,6):
    print(page)
    url = f"https://abmedia.io/blog/page/{page}"
    fetch_data(url)

# print(data_list)

##################################################
try:
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    # 创建游标对象
    cursor = connection.cursor()

    # 清空表
    cursor.execute("TRUNCATE TABLE news;")

    # 提交清空操作
    connection.commit()

    # 插入数据
    for data_temp in data_list:

        insert_query = """
        INSERT INTO news (time, title, tags, url, img)
        VALUES (%s, %s, %s, %s, %s)
        """

        cursor.execute(insert_query, (
            data_temp.get("time", ""),
            data_temp.get("title", ""),
            data_temp.get("tags", ""),
            data_temp.get("url", ""),
            data_temp.get("img", ""),
        ))

    # 提交更改
    connection.commit()


except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    # 关闭游标和连接
    if cursor:
        cursor.close()
    if connection:
        connection.close()