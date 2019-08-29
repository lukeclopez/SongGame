"""This script is used to generate a list of words
in the right format for the game.
"""

import pandas as pd
import pathlib as pl

words_csv_path = pl.Path("data/CSV All English Songs Freq.csv")
output_path = pl.Path("data/Word List.csv")
final_output_path = pl.Path("data/Ready-to-Use Words.txt")

exclude_words = [
    "chorus",
    "evry",
    "psalm",
    "acts",
    "luke",
    "matt",
    "youve",
    "prov",
    "evryone",
    "phil",
    "jehovahs",
    "john",
    "there",
    "youll",
    "whats",
    "youre",
    "matthew",
    "weve",
    "others",

]

capitalize_words = [
    "jehovah",
    "jesus",
    "christ",
    "lord",

]

# Words that need an apostrophe between the third and fourth characters.
abc_d_words = [
    "wont",
    "well",
    "lets",

]

df = pd.read_csv(words_csv_path)
df.to_csv(output_path, columns=["Word"], index=False)

with open(output_path) as words_file:
    with open(final_output_path, "w") as ready_to_use_words_file:
        for index, line in enumerate(words_file):
            print(index)
            line = line.strip()

            if line in exclude_words:
                continue
            elif line in abc_d_words:
                line = line[0:3] + "'" + line[-1]
            elif line in capitalize_words:
                line = line.title()

            ready_to_use_words_file.write(f'"{line}",\r')

            if index == 250 + len(exclude_words):
                break