FROM node:lts-alpine

WORKDIR /app

COPY . /app/

# Print the current working directory
RUN pwd

# Optional: list files to confirm structure
RUN ls -al

RUN npm --prefix /app/ install

EXPOSE 8000

CMD ["npm", "run", "dev", "--", "--port", "8000", "--host", "0.0.0.0"]