import csv
import random
import re
import time
import urllib.request
from bs4 import BeautifulSoup  


def find_origin(name):
    # get the html
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
    url = r'https://www.names.org/n/{}/about'.format(name)
    req = urllib.request.Request(url=url, headers=headers)
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # get the origin
    soup = BeautifulSoup(html, 'lxml')
    result = soup.find("ul", class_="list-inline quick-facts").find_all('li')[0]
    origin = re.findall('Origin:\s+([^\s]+)\s+', result.string)
    return origin[0]

    
def search_origin():
    with open('names.txt', 'r') as f:
        # create the names list you want to search
        names = f.read()
        names_list = names.split(',')

        # create names origin dict and count
        origin_dict = {}
        for name in names_list:
            origin = find_origin(name)

            # timeout for dodge IP blockade
            time.sleep(random.randint(10, 20))
            if origin_dict.get(origin):
                origin_dict[origin] += 1
            else:
                origin_dict[origin] = 1

        # sorted result
        result_list = sorted(origin_dict.items(), key=lambda item:item[1], reverse=True)

        # write result to csv
        with open('origin_count.csv', 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['origin', 'count'])
            writer.writerows(result_list)


if __name__ == '__main__':
     search_origin()


