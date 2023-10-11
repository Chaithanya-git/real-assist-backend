# real-assist-backend

Use /report-generate POST route to generate pdf.
The request body must be in this structure:
[
{"data_year": 2015, "Burglary": 22},
{"data_year": 2016, "Burglary": 25},
{"data_year": 2017, "Burglary": 75},
{"data_year": 2018, "Burglary": 80},
{"data_year": 2019, "Burglary": 26}
]
