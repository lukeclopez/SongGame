import json

word_objects = []


class WordObject:
    def __init__(self, g_word):
        self.g_word = g_word
        self.t_words = []
        
        word_objects.append(self)

    def __str__(self):
        word = {
            "guessWord": self.g_word,
            "tabooWords": self.t_words,
        }

        json_word = json.dumps(word)

        return json_word


with open("BibleTaboo\wordlist.txt", "r") as input_file:
    file_text = input_file.read()
    file_text = file_text.replace("\t", "")
    
    for word in file_text.split("\n"):
        if "@" in word:
            guess_word = word.replace("@", "")
            newest_word = WordObject(guess_word)
        else:
            newest_word.t_words.append(word)

    with open("BibleTaboo\parsed_words.txt", "w") as output_file:
        output_file.write("var words = [ \n")

        for word_object in word_objects:
            output_file.write(word_object.__str__() + ",\n")
        
        output_file.write("];")
        