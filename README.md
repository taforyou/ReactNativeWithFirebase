# ReactNativeWithFirebase

จากตัวอย่างของ firebase เอง 

https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html

เอามาแก้ 
-Syntax ผิด
-รันบน Android
-เอา AlertIOS ออกเพราะใช้ได้แค่ IOS หา libary ใหม่มาใช้แทน
-ใช้ NativeBase ด้วยเอามายำๆ รวมกัน

สามารถเอาไปทำตามได้เลยครับ

1. พิมพ์ git clone https://github.com/taforyou/ReactNativeWithFirebase.git 
2. พิมพ์ cd ReactNativeWithFirebase
3. พิมพ์ npm install รอจนเสร็จ
4. พิมพ์ react-native run-android
5. ถ้าอยากลอง Firebase ของตัวเองให้แก้ค่าต่างๆตาม Account ของตัวเองครับ
6. แก้ที่ File "index.android.js" ที่เดียวพอครับ ปล.ผมยังไม่ได้ทดสอบ IOS แต่คิดว่าได้เลยครับเพราะ PopUp ผมหา libary ที่ใช้ได้สำหรับ 2 Platform มาแล้ว

![Alt text](./screenshot/FirebaseConfig.png?raw=true "Demo")

![Alt text](./screenshot/Demo.png?raw=true "Demo")
