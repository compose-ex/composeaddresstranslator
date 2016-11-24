# ComposeAddressTranslator

This is a simple address translator that takes the mapping information obtained
from the Compose UI or API for Scylla databases and converts it into a usable
address translator.

## Example Code

```javascript
var cassandra = require('cassandra-driver');
var compose = require('composeaddresstranslator');
var authProvider = new cassandra.auth.PlainTextAuthProvider('scylla', 'password');

addresses= {
    "SOURCE_IP_1:SOURCE_PORT_1": "EXTERNAL_NAME_1:EXTERNAL_PORT_1",
    "SOURCE_IP_2:SOURCE_PORT_2": "EXTERNAL_NAME_2:EXTERNAL_PORT_2",
    "SOURCE_IP_2:SOURCE_PORT_2": "EXTERNAL_NAME_3:EXTERNAL_PORT_3"
}

translator=new compose.ComposeAddressTranslator();

translator.setMap(addresses);

client = new cassandra.Client({
    contactPoints: translator.getContactPoints(),
    policies: {
        addressResolution: translator
    },
    authProvider: authProvider
});
```

## Methods

`setMap()`: Takes a JavaScript object and converts it to an address map for
the translation process.

`getMapContactPoints()`: Returns the external names and ports as an array for initial connection to the database.
