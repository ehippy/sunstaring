#define publish_delay 30000
unsigned int lastPublish = 0;

void setup() {

    Spark.publish("wakeup", 0, 60, PRIVATE);
}

void loop() {
    unsigned long now = millis();

    if ((now - lastPublish) < publish_delay) {
        // it hasn't been 10 seconds yet...
        return;
    }


    Spark.publish("checkin", 0, 60, PRIVATE);

    lastPublish = now;
}