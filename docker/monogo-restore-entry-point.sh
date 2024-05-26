#!/bin/bash
# mongo-restore-entry-point.sh

# Start MongoDB in the background
mongod --fork --logpath /var/log/mongod.log --bind_ip_all

# Function to check if MongoDB is up
function check_mongo {
  mongosh --eval "db.adminCommand('ping')" --quiet
}

# Wait for MongoDB to start
RETRY_COUNT=0
MAX_RETRIES=30

until check_mongo; do
  RETRY_COUNT=$((RETRY_COUNT+1))
  if [ $RETRY_COUNT -gt $MAX_RETRIES ]; then
    echo "MongoDB did not start in time. Exiting."
    exit 1
  fi
  echo "Waiting for MongoDB to start... attempt $RETRY_COUNT"
  sleep 2
done

echo "MongoDB started, performing restore"

# Perform the restore
mongorestore --db "$MONGO_DB" --collection "$MONGO_COLLECTION" /dump/export/nvidiaDB/mnf_data.bson

# Stop MongoDB
mongod --shutdown

# Start MongoDB in the foreground
mongod --bind_ip_all