import pandas as pd
import numpy as np
from sklearn.model_selection import ShuffleSplit,cross_val_score
from sklearn.ensemble import RandomForestClassifier
import sys
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from gensim import corpora, models
import gensim
import mysql.connector

print("state")
