# Real Assist Backend

The Real Assist Backend is a service that allows you to generate PDF reports. This README provides information on how to use the `/api/report-generate` POST route and specifies the required request body structure.

## Usage

To generate a PDF report, make a POST request to the `/api/report-generate` route with the following request body:

```json
[
  { "data_year": 2015, "Burglary": 22 },
  { "data_year": 2016, "Burglary": 25 },
  { "data_year": 2017, "Burglary": 75 },
  { "data_year": 2018, "Burglary": 80 },
  { "data_year": 2019, "Burglary": 26 }
]
```
