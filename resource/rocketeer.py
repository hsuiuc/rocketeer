import sys
import pandas as pd
import numpy as np
#from sklearn.model_selection import ShuffleSplit,cross_val_score
#from sklearn.ensemble import RandomForestClassifier
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import gensim
from gensim import corpora, models
import mysql.connector

print("state")
