# geocode-locator

---

## Import CSV data to mongo db

###Default Installation (Host: localhost - Port: 27017)
mongoimport --db locator-db --collection filiali --type csv --headerline --file elenco-filiali.csv --drop

File in formato testo con campi tra doppio apice (") e separatore di virgola.
