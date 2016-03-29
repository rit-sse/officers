FROM node:5

 WORKDIR /app

 # Fetch the dependancies
 COPY ./package.json /app/package.json
 RUN npm install

 # Grab the args
 # ARG API_ROOT
 ENV API_ROOT=/api/v1/
 # ARG NODE_ENV=production
 ENV NODE_ENV=production

 # Copy in source, this wont copy node_modules because its in the .dockerignore
 COPY ./ /app
 RUN npm run build

 RUN npm install http-server -g

 WORKDIR /app/dist
 RUN mkdir officers
 RUN mv * ./officers || exit 0
 EXPOSE 8000
 CMD http-server -p 8000 -a 0.0.0.0 -d false
