# NVIDIA home assignment

for both docker run and local, the client will be served on 
http://localhost:4200
and the API on 
http://localhost:3333


### How to run with docker:
```
docker compose build
docker compose up
```

### How to run locally:
the project was created with Node 22, but should work for node 18+.  
it also uses pnpm v8 ([v9 is not working well with nx](https://github.com/nrwl/nx/issues/22850))

suggested to use nvm, or nvm windows
([nvm brew (mac)](https://formulae.brew.sh/formula/nvm) or [nvm windows](https://github.com/coreybutler/nvm-windows))

after installing
```
nvm install 22
nvm use 22

npm i -g pnpm@8
pnpm i
```

to get the DB up, with the dummy data already loaded 
```
docker compose build -f docker-compose.db.yml
docker compose up -f docker-compose.db.yml -d
```

once the DB is up, can run the client and api with
```
pnpm start
```

#### Tech Explanation
this is a monorepo managed by Nx, serving and building both Client (react) and API (Node).
I chose a monorepo for this assignment in order to leverge shared TypeScript interfaces / util functions, and to easily store everything in 1 repo (small assignment).

##### Open Issues, To Dos:
Both (Client and/or API):
* Better use of shared libraries for various TypeScript types, common functionalities
* Change the way PN filter works, currently it's a potential performance issue as it's a regex search on the BE. could add API for autocomplete feature on the FE to allow selecting a specific PN via autocomplete search, then match it on the report API.
* handle date gaps in the report. i.e. if there are tests on 01-04-2023, and 03-04-2023, but no tests at all on the 02-04-2023 - the graph will simply ignore that point and the gap between points will be inconsistent. this can be handled on either FE or BE to add "blank" points when there were no tests.
* setup production builds
* setup lint/tests

Client:
* Add react-router to save user filter selection, support refreshing the page and sharing urls
* Enhance chart tooltip to show more info per point. (show number of tests, number of total tests)
* Can enhance the week picker and title on the chart, and the month picker and month values. when selecting "weeks", it can potentially show only partial week data.
* UI components lib - all UI components should sit in a UI lib and only that lib will import from antd (or other 3ed party)
* UI/UX improvements - overall UI/UX can be improved, empty state SVGs, a bit more color, etc'.


API:
* Change controllers to a more OOP approach (Classes vs Functions). since this is a small project and my first time setting up Node/Express server I went with a little basic.
* Range limit protection. I've put a limit on the FE to the ammount of dates you can pick per granularity, need to also protect the BE.