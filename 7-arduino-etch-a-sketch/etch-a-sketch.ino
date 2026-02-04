

void setup() {
  Serial.begin(9600);
  pinMode(12,INPUT);
  }


void loop() {
  int val1 = analogRead(A3);
  int val2 = analogRead(A2);

  int val3 = digitalRead(12);

  Serial.print(val1); 
  Serial.print(",");
  Serial.print(val2); 
  Serial.print(",");
  Serial.println(val3); 
  delay(100);
}
  
