
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

def mainmodel(xtest,attribute,city,category):
    data=getdata(attribute,city,category)
    data=preprocess(data)
    dev=data.sample(frac=0.2)
    devx=dev[attribute]
    devy=dev['stars']
    depth=paratuning(devx,devy)
    model= RandomForestClassifier(max_depth=depth)
    ytrain=data['stars']
    xtrain = data.drop('stars', axis=1)
    model.fit(xtrain,ytrain)
    return model.predict(xtest)[0]


def preprocess(business):
    business['attributes_NoiseLevel'] = business['attributes_NoiseLevel'].map({'loud':1, 'average':0, 'quiet':0})
	business['attributes_RestaurantPriceRange2']=business['attribute_RestaurantPriceRange2'].map({1:0,2:0,3:1,4:1})
    business['stars']=business['stars']*2
    business.fillna(5, inplace=True)
    return business

def paratuning(x,y):
    max_depth=[3,5,10,20,50,100]
    cv = ShuffleSplit(n_splits=5, test_size=0.2, random_state=0)
    accus=[]
    for depth in max_depth:
        rf = RandomForestClassifier(max_depth=depth)
        rf_logs_scores=cross_val_score(rf, x, y, cv=cv)
        accus.append(np.mean(rf_logs_scores))
    dep=max_depth[np.argmax(accus)]
    return dep

def getdata(attribute,city,category):
    data=pd.read_csv(path)
    business=data.loc[data['city'] == city]
    business=business.dropna(subset=['categories'])
    business = business[business['categories'].str.contains(category)]
    business = business[attribute]
    return business

def accuracy(predict,actual):
    return np.mean(predict-actual<=1)



def lda(data):
    stemmer = PorterStemmer()
    tokenizer = RegexpTokenizer(r'\w+')
    init_stopwords =[stemmer.stem(v) for v in stopwords.words('english')]
    additional_stopwords = ["'s","thi","littl","place","...","'ve","``","''","'m",'--',"'ll","'d","wa"]
    en_stop = additional_stopwords + init_stopwords
    p_stemmer = PorterStemmer()
    doc_set=[]

    for i in range(0,len(data)):
        doc_set.append(data[i])
    texts = []
    for i in doc_set:
        raw = i.lower()
        tokens = tokenizer.tokenize(raw)
        stopped_tokens = [i for i in tokens if not i in en_stop]
        stemmed_tokens = [p_stemmer.stem(i) for i in stopped_tokens]
        texts.append(stemmed_tokens)
    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]
    ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics=1, id2word = dictionary, passes=20)
    final=ldamodel.print_topics(num_topics=2, num_words=4)
    final[0][1]
    final=ldamodel.print_topics(num_topics=2, num_words=4)
    aa=[]
    aa.append(final[0][1].split()[0].split("*")[1])
    aa.append(final[0][1].split()[2].split("*")[1])
    aa.append(final[0][1].split()[4].split("*")[1])
    aa.append(final[0][1].split()[6].split("*")[1])
    
    p=[]
    for i in aa:
        p.append(i.replace('"',''))
    pp=[]
    for i in p:
        if i!='wa'and i!='thi':
            pp.append(i)
    ppp=" ".join(str(x) for x in pp)
    return ppp


cnx = mysql.connector.connect(user='root', password='cs411CS411!!',
                          host='127.0.0.1',
                          database='yelp_db')
cursor = cnx.cursor()

state = sys.argv[1]
city = sys.argv[2]
category = sys.argv[3]
input = sys.argv[4]
input=list(input)
xtest=pd.DataFrame([input])
query = ("select review.text from business, category, review where state = %s and city = %s and business.id ="
     " category.business_id and category.category = %s and business.id = review.business_id limit 10")
cursor.execute(query, (state, city, category))

data = []
for review in cursor:
    data.append(review[0])

cursor.close()
cnx.close()

recommendation = lda(data)
attribute = ['attributes_BusinessAcceptsCreditCards','attributes_RestaurantsPriceRange2',
             'attributes_ByAppointmentOnly', 'attributes_DriveThru', 
             'attributes_NoiseLevel', 'attributes_OutdoorSeating', 'attributes_GoodForKids',
             'attributes_WheelchairAccessible','stars']
predicted_score = mainmodel(xtest, attribute,city, category)
print(recommendation)
print(predicted_score)

