import csv
import math

with open('../data/testbrakingdata.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    avg_decx = 0
    avg_decy = 0
    avg_decz = 0
    avg_gyx = 0
    avg_gyy = 0
    avg_gyz = 0
    num_values_seen = 0
    counter = 1
    list_of_parsed_values = []

    for row in csv_reader:
        if line_count != 0:
            timestamp = row[0]

            if (math.ceil(float(timestamp)/(300000 * counter)) == 1):
                avg_decx += float(row[1])
                avg_decy += float(row[2])
                avg_decz += float(row[3])
                avg_gyx += float(row[4])
                avg_gyy += float(row[5])
                avg_gyz += float(row[6])
                num_values_seen += 1
            else:
                total_avg_decx = round(avg_decx/num_values_seen, 3)
                total_avg_decy = round(avg_decy/num_values_seen, 3)
                total_avg_decz = round(avg_decz/num_values_seen, 3)
                total_avg_gyx = round(avg_gyx/num_values_seen, 3)
                total_avg_gyy = round(avg_gyy/num_values_seen, 3)
                total_avg_gyz = round(avg_gyz/num_values_seen, 3)
                list_of_parsed_values.append([counter, total_avg_decx, total_avg_decy, total_avg_decz, total_avg_gyx, total_avg_gyy, total_avg_gyz])
                counter += 1

                avg_decx = float(row[1])
                avg_decy = float(row[2])
                avg_decz = float(row[3])
                avg_gyx = float(row[4])
                avg_gyy = float(row[5])
                avg_gyz = float(row[6])
                num_values_seen = 1

        line_count += 1

    list_of_parsed_values.append([counter, total_avg_decx, total_avg_decy, total_avg_decz, total_avg_gyx, total_avg_gyy, total_avg_gyz])

    with open('../data/parsed_braking_data.csv', mode='w') as braking_file:
        employee_writer = csv.writer(braking_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        for row in list_of_parsed_values:
            employee_writer.writerow(row)
