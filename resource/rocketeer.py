
# coding: utf-8

# In[1]:

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

path="/home/shared/rocketeer/resource/business.csv"
#path="/home/haosun/Documents/CS411/project/rocketeer/resource/business.csv"


#cnx = mysql.connector.connect(user='root', password='cs411CS411!!',
#                          host='127.0.0.1',
#                          database='yelp_db')
#cursor = cnx.cursor()

#state = sys.argv[1]
#city = sys.argv[2]
#category = sys.argv[3]
#input = sys.argv[4]
print("state")
#input=list(input)
#xtest=pd.DataFrame([input])
#query = ("select review.text from business, category, review where state = %s and city = %s and business.id ="
#     " category.business_id and category.category = %s and business.id = review.business_id limit 10")
#cursor.execute(query, (state, city, category))

#data = []
#for review in cursor:
#    data.append(review[0])

#cursor.close()
#cnx.close()

#recommendation = lda(data)
#attribute = ['attributes_Alcohol', 'attributes_BusinessAcceptsBitcoin', 'attributes_BusinessAcceptsCreditCards',
#             'attributes_ByAppointmentOnly', 'attributes_DriveThru', 'attributes_GoodForKids',
#             'attributes_NoiseLevel', 'attributes_OutdoorSeating', 'attributes_RestaurantsGoodForGroups',
#             'attributes_RestaurantsPriceRange2', 'attributes_RestaurantsTakeOut',
#             'attributes_WheelchairAccessible','stars']
#predicted_score = mainmodel(xtest, attribute,city, category)
#print(recommendation)
#print(predicted_score)


