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
           "Referer":"https://www.104.com.tw/jobs/search/?"}

def fetch_data(url):
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    jobs = soup.find_all("div", class_="b-block__left")
    for job in jobs:
        data_temp = {
            "date": "",
            "job_title": "",
            "company_title": "",
            "industries": "",
            "additional_information": [],
            "salary": "",
            "job_tags": [],
            "job_url": ""
        }

        # 日期
        date = job.find("span", class_="b-tit__date")
        if date:
            data_temp["date"] = date.text.strip()
        else:
            continue

        # 工作標題
        name = job.find("h2", class_="b-tit")
        if name and name.a:
            data_temp["job_title"] = name.a.text.strip()

        # 公司名字
        company = job.find("ul", class_="b-list-inline b-clearfix")
        if company and company.a:
            data_temp["company_title"] = company.a.text.strip()

        # 產業
        company_info = job.find("ul", class_="b-list-inline")
        if company_info:
            industries = company_info.find_all("li", string=re.compile("業"))
            if industries:
                industry = industries[0]
                data_temp["industries"] = industry.text.strip()
            else:
                data_temp["industries"] = ""
        else:
            data_temp["industries"] = ""

            
        # 地區, 經驗, 學歷
        additionInformation = job.find(
            "ul", class_="b-list-inline b-clearfix job-list-intro b-content")
        if additionInformation:
            data_temp["additional_information"] = [information.text.strip() for information in additionInformation.find_all("li")]

        # 薪水
        salary = job.find("span", class_="b-tag--default")
        if salary:
            data_temp["salary"] = salary.text.strip()

        # 額外標籤
        job_tags = job.find("div", class_="job-list-tag b-content")
        if job_tags:
            data_temp["job_tags"] = [link.text.strip() for link in job_tags.find_all("a", class_="b-tag--default")]

        # 工作的連結
        job_url = job.find("h2", class_="b-tit")
        if job_url and job_url.a:
            href_value = job_url.a.get('href')
            # 去掉前面的 //
            href_value = href_value[2:]
            data_temp["job_url"] = href_value

        if data_temp.get("date")!='':
            data_list.append(data_temp)

# Loop through pages
for page in range(1, 6):
    url = f"https://www.104.com.tw/jobs/search/?ro=0&isnew=3&keyword=%E5%8D%80%E5%A1%8A%E9%8F%88&expansionType=area%2Cspec%2Ccom%2Cjob%2Cwf%2Cwktm&order=17&asc=0&page={page}&mode=s&jobsource=2018indexpoc&langFlag=0&langStatus=0&recommendJob=1&hotJob=1"
    print(page)
    fetch_data(url)

############################################
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
    cursor.execute("TRUNCATE TABLE jobs;")

    # 提交清空操作
    connection.commit()

    # 插入数据
    for data_temp in data_list:
        data_temp.get("job_title", "")

        insert_query = """
        INSERT INTO jobs (date, job_title, company_title, industries, additional_information, salary, job_tags, job_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        cursor.execute(insert_query, (
            data_temp.get("date", ""),
            data_temp.get("job_title", ""),
            data_temp.get("company_title", ""),
            data_temp.get("industries", ""),
            ", ".join(data_temp.get("additional_information", [])),
            data_temp.get("salary", ""),
            ", ".join(data_temp.get("job_tags", [])),
            data_temp.get("job_url", "")
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

print(data_list)


