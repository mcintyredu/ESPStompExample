# ESPStompExample
An example app based on the Spring Messaging example. Used to demonstrate messaging between two IoT devices.
See https://github.com/spring-guides/gs-messaging-stomp-websocket

# Description
Creates a simple Stomp server which provides two messages flows:

  - Button to Command
  - Sensor to Reading


# Example
You can combine this server with the example code in the Arduino ESP8266 StompClient.

https://github.com/ukmaker/StompClient

# Running
Build the code using 

`mvn clean install`

This creates a runnable Spring Boot JAR in the target directory.

## Run locally

`java -jar target/esp-stomp-example-0.1.0.jar

## Run in Cloud Foundry
If you run the server in Pivotal Cloud Foundry then any devices will be able to access it over the internet.

Note that there is no security configured into the code at this point, so don't connect anything important to it!

`cf push espstomp -p target/esp-stomp-example-0.1.0.jar --random-route`

In the example client code you must connect using WSS, so set the 'useWSS' variable in the example Arduino code to true, and set 'wss_port' to 4443.

