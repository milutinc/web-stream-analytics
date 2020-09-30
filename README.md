## install OpenJDK 8

https://www.howtodojo.com/2020/07/install-openjdk-8-on-ubuntu-18-04/

## install maven

Download maven https://maven.apache.org/download.cgi

Install maven https://maven.apache.org/install.html

## downloading kafka

Download kafka https://kafka.apache.org/downloads

    wget https://downloads.apache.org/kafka/2.6.0/kafka_2.13-2.6.0.tgz

Extract kafka

    - tar -xzf kafka_2.13-2.6.0.tgz

    - cd kafka_2.13-2.6.0

Start kafka(https://kafka.apache.org/quickstart#quickstart_startserver)

    - bin/zookeeper-server-start.sh config/zookeeper.properties (https://zookeeper.apache.org/)

    - bin/kafka-server-start.sh config/server.properties

Creating and describing topic information: https://kafka.apache.org/quickstart#quickstart_createtopic

## run mongo

https://www.mongodb.com/try/download/community

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#start-mongodb

## kafka connect settings

https://docs.confluent.io/current/connect/index.html#kconnect-long

### running in standalone mode https://docs.confluent.io/current/connect/userguide.html#standalone-mode

edit config/connect-standalone.properties :

* plugin.path=/opt/connectors (at the end of file)
* key.converter must be either(https://www.confluent.io/blog/kafka-connect-deep-dive-converters-serialization-explained/):
    - org.apache.kafka.connect.storage.StringConverter
    - org.apache.kafka.connect.converters.ByteArrayConverter

### add mongodb sink connector

cd /opt/connectors

download connector https://www.confluent.io/hub/mongodb/kafka-connect-mongodb

* wget https://d1i4a15mxbxib1.cloudfront.net/api/plugins/mongodb/kafka-connect-mongodb/versions/1.2.0/mongodb-kafka-connect-mongodb-1.2.0.zip

unzip mongodb-kafka-connect-mongodb-1.2.0.zip

### add config file for the connector

https://docs.mongodb.com/kafka-connector/master/kafka-sink-properties/

create 
    touch config/connect-mongo-sink.properties

``` 
name=mongo-sink
topics=clicks.user.profile, clicks.pages.views, clicks.search, clicks.user.activity
connector.class=com.mongodb.kafka.connect. MongoSinkConnector
tasks.max=1
connection.uri=mongodb://localhost:27017
database=clicks
```

### start the kafka connect worker

bin/connect-standalone.sh config/connect-standalone.properties config/connect-mongo-sink.properties

## setting up the project

git clone https://github.com/milutinc/web-stream-analytics

## configure meteor for the web application

https://www.meteor.com/install

Install packages: 

    meteor npm install 

run meteor with external mongodb: 

    MONGO_URL='mongodb://localhost:27017' meteor