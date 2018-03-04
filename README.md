# Verkefni 2

Útfæra skal Express vefþjón sem birtir skráningar form og hefur „stjórnsíðu“ þar sem hægt er að skoða allar skráningar.

## Skráningar form

Skráningarform tekur við eftirfarandi gögnum:

* Nafni, verður að vera skráð
* Netfangi, verður að vera skráð og líta út fyrir að vera netfang
* Kennitölu, verður að vera skráð
* Fjölda, verður að vera skráð og verður að vera tala sem er stærri en 0

Ef gögn eru ekki rétt skráð skal birta notanda villuskilaboð ásamt þeim gögnum sem áður voru skráð. Passa þarf upp á að gögn séu hrein, sérstaklega af `XSS` strengjum. Gögn skulu skráð örugglega (með _parameterized input_) í postgres grunn.

Færslur í postgres skulu einnig hafa auðkenni (nóg að nota hlaupandi tölu) og dagsetningu þegar skráð var.

## Stjórnsíða

Gefin er skrá `users.js` með einum notanda sem skal hafa réttindi til að skrá sig inn. Lykilorð er geymt sem `bcrypt` hash af lykilorðinu `123` og þarf að útfæra þær aðferðir sem til staðar eru. Einnig þarf að setja upp stuðning við `session` á express appi þannig að auðkenning haldist milli beiðna, notasta skal við passport og passport-local strategy.

Stjórnsíða skal birta töflu með öllum skráðum reitum ásamt dagsetningu (ekki er krafa um að forma dagsetningu sérstaklega) og id á færslu (röð skiptir ekki máli).

Fyrir neðan töflu skal vera hlekkur í að sækja upplýsingar og skal það bjóða notanda að sækja `csv` skrá með sömu gögnum, t.d.

```csv
date;name;email;amount;ssn
Wed Jan 31 2018 21:48:51 GMT+0000 (GMT);Óli;ros@hi.is;4;123456-1234
```

bæði er hægt að útbúa gögn sjálf eða sækja pakka til að sjá um.

Í fæti skal birta upplýsingar um innskráðan notanda með nafni ásamt möguleika á að útskrá. Ef engin notandi er innskráður skal vera hlekkur á innskráningarsíðu.

## Útfærsla

Notast skal við PostgreSQL grunn og skal skila skemu af töflu í `schema.sql` (skipun sem býr til töflu–`CREATE TABLE`)

Notast skal við [Pug template](https://pugjs.org/) til að útbúa HTML. Sjá gefinn grunn í `views/`.

## Assignment 2

Create an Express webserver which shows user registration forms and has a ,,admin page“ where one can see all registrations.

## Registration form

Registration form should accept the following inputs:

* Name, must be filled.
* Email, must be filled and appear as an email.
* Social Security number, must be filled
* Number, must be filled and must be a higher integer than 0.

Should input be incorrect an error message should appear alongside the input. The input should be clean, be especially vary of 'XSS' strings. Data should be registered safely using (_parameterized input_) into a postgres schema.
Postgres tuples should have a serialized id and the date it was registered.

Given in the assignment is the file 'users.js' with one user who shall have permission to log in. A bcrypt hash of the password 123. Additionally support for a 'session' built in express so authentication is held between queries. Use passport and passport-local strategy.

