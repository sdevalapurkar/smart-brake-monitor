import csv
import psycopg2
from datetime import datetime

failed_flag = False

while True:
    try:
        txt = input("Please enter your Freno ID: ")
        freno_id = int(txt)
    except ValueError:
        print("Sorry, please enter a valid Freno ID that has been registered.")
        continue
    else:
        break

# connect to the database
con = psycopg2.connect(
    user = "me",
    host = "localhost",
    database = "brakessupreme",
    password = "password",
    port = 5432
)

# cursor
cur = con.cursor()

with open('../data/parsed_braking_data.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')

    for row in csv_reader:
        relative_time_count = float(row[0]) * 5
        dec_x = float(row[1])
        dec_y = float(row[2])
        dec_z = float(row[3])
        gy_x = float(row[4])
        gy_y = float(row[5])
        gy_z = float(row[6])
        drive_date = datetime.today().strftime("%Y-%m-%d")

        try:
            cur.execute("INSERT INTO brakingdata(vehicle_id, dec_x, dec_y, dec_z, gy_x, gy_y, gy_z, drive_date, relative_time_count) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (freno_id, dec_x, dec_y, dec_z, gy_x, gy_y, gy_z, drive_date, relative_time_count))
        except:
            failed_flag = True

# commit the transaction
if failed_flag is False:
    con.commit()
else:
    print("Sorry there was an error. Please try again")

# close the connection
con.close()
