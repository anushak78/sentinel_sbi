
from datetime import datetime
from dateutil import relativedelta

# Aug 7 1989 8:10 pm
date_1 = datetime(1989, 8, 7, 20, 10)

# Dec 5 1990 5:20 am
date_2 = datetime(1990, 12, 5, 5, 20)

# This will find the difference between the two dates
difference = relativedelta.relativedelta(date_2, date_1)

years = difference.years
months = difference.months
days = difference.days
hours = difference.hours
minutes = difference.minutes

print(years)
print(months)
print(days)
print(hours)
print(minutes)
