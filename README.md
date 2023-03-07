# ecom-server
ecom server

## start server

To start the server in local, run 

``` npm start ```

## Deployed 
```https://ecom-server-assignment.vercel.app```

# APIs

All the api are attached to the client except the  ```/api/item/create```

curl: 
```
curl --location --request POST 'https://ecom-server-assignment.vercel.app/api/item/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Bayaband Sliders with Signature Branding"
}'
```




