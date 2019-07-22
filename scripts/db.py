import psycopg2

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

cur.execute("create table users(user_id serial, name varchar(40), email varchar(40) primary key, password text not null)")
cur.execute("create table vehicles(vehicle_id integer primary key, is_activated boolean, vehicle_name varchar(100) not null, vehicle_weight float not null, tire_specs text not null, email varchar(40) references users(email))")
cur.execute("create table brakingdata(vehicle_id integer references vehicles(vehicle_id), dec_x float, dec_y float, dec_z float, gy_x float, gy_y float, gy_z float, drive_date date, relative_time_count integer)")

# commit the transaction
con.commit()

# close the connection
con.close()
