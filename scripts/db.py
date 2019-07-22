import psycopg2

# connect to the database
con = psycopg2.connect(
    user = "me",
    host = "localhost",
    database = "brakessupreme",
    password = "password",
    port = 5432
)

cur = con.cursor()

cur.execute("create table users(user_id serial, name varchar(40), email varchar(40) primary key, password text not null)")
cur.execute("create table vehicles(vehicle_id integer primary key, is_activated boolean, vehicle_name varchar(100) not null, vehicle_weight float not null, tire_specs text not null, email varchar(40) references users(email))")

# close the connection
con.close()
