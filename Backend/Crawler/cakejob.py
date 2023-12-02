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

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
           "Referer": "https://wchat.freshchat.com/widget/?token=d33525b1-455f-415a-b54c-336f51fc9fad&referrer=aHR0cHM6Ly93d3cuY2FrZXJlc3VtZS5jb20=&eagerLoad=true"}


def fetch_data(url):
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    jobs = soup.find_all("div", class_="JobSearchItem_wrapper__bb_vR")

    for job in jobs:
        data_temp = {
            "job_title": "",
            "company_title": "",
            "job_tags": [],
            "additional_information": [],
            "job_url": ""
        }

        # 工作標題
        name = job.find("div", class_="JobSearchItem_headerTitle__CuE3V")
        if name and name.a:
            # print(name.a.text.strip())
            data_temp['job_title'] = name.a.text.strip()

        # 公司
        company = job.find("div", class_="JobSearchItem_headerSubtitle__3yhh9")
        if company and company.a:
            # print(company.a.text.strip())
            data_temp["company_title"] = company.a.text.strip()

        # Tag
        tags = job.find_all('div', class_='Tags_item__B6Bjo')
        if tags:
            for tag in tags:
                # print(tag.text)
                data_temp["job_tags"].append(tag.text.strip())

        # 相關資訊
        informations = job.find_all('div', class_="InlineMessage_label__LJGjW")
        if informations:
            for information in informations:
                # print(information.text.strip())
                data_temp["additional_information"].append(
                    information.text.strip())

        # url
        job_url = job.find("div", class_="JobSearchItem_headerTitle__CuE3V")
        if job_url and job_url.a:
            href_value = job_url.a.get('href')
            data_temp["job_url"] = href_value

        data_list.append(data_temp)


# Loop through pages
for page in range(1, 6):
    url = f"https://www.cakeresume.com/jobs/%E5%8D%80%E5%A1%8A%E9%8F%88?location_list%5B0%5D=Taiwan&order=latest&page={page}"
    fetch_data(url)

print(data_list)

# ============= connect to DB =============#
try:
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    # 創建cursor
    cursor = connection.cursor()

    # 清空表
    cursor.execute("TRUNCATE TABLE cakeJobs;")

    connection.commit()

    for data_temp in data_list:
        insert_query = """
        INSERT INTO cakeJobs (job_title, company_title, job_tags,additional_information, job_url)
        VALUES (%s, %s, %s, %s, %s)
        """

        cursor.execute(insert_query, (
            data_temp.get("job_title", ""),
            data_temp.get("company_title", ""),
            ", ".join(data_temp.get("additional_information", [])),
            ", ".join(data_temp.get("job_tags", [])),
            data_temp.get("job_url", "")
        ))

    connection.commit()

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    # 关闭游标和连接
    if cursor:
        cursor.close()
    if connection:
        connection.close()
