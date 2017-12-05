import mysql.connector, sys

cnx = mysql.connector.connect(user='root', password='abcde12345',
                              host='127.0.0.1',
                              database='yelp_db')
cursor = cnx.cursor()

state = sys.argv[1]
city = sys.argv[2]
category = sys.argv[3]

query = ("select review.text from business, category, review where state = %s and city = %s and business.id ="
         " category.business_id and category.category = %s and business.id = review.business_id limit 10")
cursor.execute(query, (state, city, category))
for review in cursor:
    print(review)

cursor.close()
cnx.close()

