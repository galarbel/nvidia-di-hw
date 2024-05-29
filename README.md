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
the project was created with Node 22, but should work for node 18+
it also uses pnpm v8 (v9 is not working well with )

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
