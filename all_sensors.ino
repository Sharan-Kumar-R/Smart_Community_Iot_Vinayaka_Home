#include <DHT.h>

#define AO_PIN 36  // ESP32's pin GPIO36 connected to AO pin of the flame sensor
#define TRIG_PIN 12 // Connect the trigger pin of the ultrasonic sensor to digital pin 12
#define ECHO_PIN 13 // Connect the echo pin of the ultrasonic sensor to digital pin 13
const int PIR_PIN = 2; // Connect the signal pin of the PIR sensor to digital pin 2
const int MQ135_PIN = 34; // Analog input pin for MQ135 sensor


DHT dht(16, DHT11); // Digital pin 16 connected to the DHT sensor

void setup() {
  Serial.begin(9600);
  pinMode(AO_PIN, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(PIR_PIN, INPUT);
  pinMode(MQ135_PIN, INPUT);
  dht.begin();
}

void loop() {
  int infrared_value = analogRead(AO_PIN);
  long duration, distance;
  int motion = digitalRead(PIR_PIN);
  int mq135_value = analogRead(MQ135_PIN);

  // Clear the trigger pin
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  // Send a 10 microsecond pulse to the trigger pin
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);


  // Measure the duration of the pulse on the echo pin
  duration = pulseIn(ECHO_PIN, HIGH);

  // Calculate the distance in centimeters
  distance = duration * 0.034 / 2;

  // Print the flame detection status, motion detection status, MQ135 sensor value, and the distance to the serial monitor
  if (infrared_value < 100) {
    Serial.println("Flame detected!");
  } else {
    Serial.println("Flame Not detected!");
  }
  
  if (motion == HIGH) {
    Serial.println("Motion detected!");
    // You can add your desired actions here, such as turning on a light or activating an alarm
  } else {
    Serial.println("Motion not detected!");
    // You can add your desired actions here, such as turning on a light or activating an alarm
  }
  delay(200);

  float temperature = dht.readTemperature(); // Read temperature as Celsius
  float humidity = dht.readHumidity(); // Read humidity

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C\t");
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
  }

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  Serial.print("MQ135: ");
  Serial.println(mq135_value);

  delay(1000); // Delay for stability
}
