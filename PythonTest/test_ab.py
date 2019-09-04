import csv
from serpwow.google_search_results import GoogleSearchResults


# word is what you want to search
def search_word(word):
    # https://serpwow.com/docs/search-api/overview
    # create the serpwow object, passing in our API key(the key can only search 100 times/day)
    serpwow = GoogleSearchResults("6CA18DD42130493BADF9236FB365D323")

    # set up a dict for the search parameters
    params = {
      "q": word,
      "location": "Hong Kong"
    }

    # retrieve the search results as JSON
    result = serpwow.get_json(params)
   
    # return the total results count
    return result['search_information']['total_results']


# search names in names.txt by google and write the total results count to name_count.csv
def search_names():
    # names.txt is all the names you want to search    
    with open('names.txt', 'r') as f:
        # create the names list you want to search
        names = f.read()
        names_list = names.split(',')

        # create the names and count dict 
        result_dict = {}
        for name in names_list:
            result_dict[name] = search_word(name)

        # sorted result 
        result_list = sorted(result_dict.items(), key=lambda item:item[1], reverse=True)

        # write result to csv
        with open('name_count.csv', 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['name', 'count'])
            writer.writerows(result_list)


if __name__ == '__main__':
   search_names()


