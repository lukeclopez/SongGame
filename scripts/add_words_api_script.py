import requests

# url = "http://127.0.0.1:8000/words/"
url = "http://127.0.0.1:8000/words/"
auth = ("luke", input("Enter Password: "))

word_objects = []


class WordObject:
    def __init__(self, g_word):
        self.g_word = g_word
        self.t_words = []
        
        word_objects.append(self)


with open("BibleTaboo\data\wordlist.txt", "r") as input_file:
    file_text = input_file.read()
    file_text = file_text.replace("\t", "")
    
    for word in file_text.split("\n"):
        if "@" in word:
            guess_word = word.replace("@", "")
            newest_word = WordObject(guess_word)
        else:
            newest_word.t_words.append(word)

    for word_object in word_objects:
        formatted_t_words = ', '.join(word_object.t_words)

        response = requests.post(url, auth=auth, data={
            "guess_word": word_object.g_word,
            "taboo_words": formatted_t_words
        })
    
        