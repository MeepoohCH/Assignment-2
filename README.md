# 🚀 Assignment-2: Drone Control Web Frontend

**Assignment-2** เป็นโครงการสร้างส่วนหน้า (Web Frontend) เพื่อแสดงข้อมูลการตั้งค่า (Config) และบันทึกข้อมูล (Log) ของโดรน โดยใช้ API Server ที่สร้างไว้ใน Assignment #1.

โครงการนี้พัฒนาด้วย **Next.js** โดยใช้ **Tailwind CSS** สำหรับการจัดรูปแบบ และมีการทำ **Pagination** ในหน้าแสดง Log.

---

## ✨ Features หลัก & หน้าจอ (Pages)

แอปพลิเคชันประกอบด้วยหน้าหลัก (Homepage) และ 3 หน้าฟังก์ชันหลักที่สามารถเข้าถึงได้ผ่าน **Navigation Bar** ด้านบน

### 1. 🏠 Homepage (DMS Console - Welcome)
* เป็นหน้าต้อนรับ **Drone Management System**
* แสดง **Drone ID** ที่กำลังจัดการอยู่
* มีส่วนนำทาง (Card Section) ไปยัง 3 ฟังก์ชันหลัก ได้แก่ **Configuration Settings**, **Temperature Data Input**, และ **Historical Data Viewer**.

### 2. ⚙️ Page #1: View Config
* เข้าถึงได้จากลิงก์ "Configuration" ใน Navbar
* แสดงข้อมูล **Drone Configuration** ของ Drone ID ที่ระบุในไฟล์ `.env.local`
* แสดงข้อมูลสำคัญ 4 รายการ
    * **Drone ID**
    * **Drone Name**
    * **Country**
    * **Light Status** 

### 3. 🌡️ Page #2: Temperature Log Form
* เข้าถึงได้จากลิงก์ "Log Data" ใน Navbar
* แสดงหน้า **Sensor Data Input** สำหรับบันทึกอุณหภูมิ
* แสดงข้อมูล Config ที่นำมาใช้: **Drone ID**, **Country (Bangladesh)**, และชื่อโดรน **Reasoned Resistor**
* มี **Input Field** สำหรับกรอกค่า **Temperature (Celsius °C)**.
* มีปุ่ม **Submit** สำหรับส่งข้อมูลไปยัง API Server ของ Assignment #1 (POST /logs) โดยส่งข้อมูล `drone_id`, `drone_name`, `country`, และ `celsius` ที่ผู้ใช้กรอก

### 4. 📝 Page #3: View Logs
* เข้าถึงได้จากลิงก์ "View History" ใน Navbar
* แสดงหน้า **Historical Archive** สำหรับดูรายการ Log เฉพาะของ Drone ID 
* ข้อมูลแสดงผลในรูปแบบ **ตาราง (<table>)** ที่เรียงตามเวลา **CREATED** ล่าสุดขึ้นก่อน
* ตารางแสดงข้อมูล **5 คอลัมน์**: **CREATED**, **COUNTRY**, **DRONE ID**, **DRONE NAME**, และ **CELSIUS**
* **Pagination (การแบ่งหน้า):** มีการทำ Pagination โดยจำกัดการแสดงผล และมีปุ่ม **First**, **Previous**, **Next**, **Last** เพื่อนำทางระหว่างหน้า (เช่น Page 1 of 2)

---

## 🛠️ Tech Stack

* **Framework:** Next.js (เวอร์ชัน 16.0.0)
* **Language:** JavaScript (รองรับ TypeScript ด้วยไฟล์ `jsconfig.json`)
* **Styling:** Tailwind CSS (เวอร์ชัน 4.1.16) และ PostCSS
* **UI Library:** Heroicons for React (`@heroicons/react`)
* **Environment Configuration:** ใช้ไฟล์ `.env.local` ในการเก็บค่า Config

---

## 🏗️ Project Setup & Installation

โปรเจกต์นี้ใช้ **npm** ในการจัดการ Dependencies

### Prerequisites

* Node.js (ตามที่ระบุใน `package-lock.json` รองรับเวอร์ชันที่ใช้ Next.js 16.0.0)

### ขั้นตอนการติดตั้ง

1.  **Clone the repository:**
    ```bash
    git clone [Your-GitHub-Repository-URL]
    cd assignment-2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    ไฟล์ `.env.local` ได้ตั้งค่า Drone ID และ API URL ไว้แล้ว:
    ```env
    # ตั้งค่า Drone ID 
    NEXT_PUBLIC_DRONE_ID=66010125

    # API Base URL (API Server จาก Assignment #1)
    NEXT_PUBLIC_API_URL=[https://assignment-1-gray-two.vercel.app](https://assignment-1-gray-two.vercel.app)
    ```
    > **หมายเหตุ:** ไฟล์ `.env.local` ถูกกำหนดให้อยู่ใน `.gitignore` เพื่อป้องกันการ Commit ข้อมูล Config ที่อ่อนไหวเข้าสู่ Repository

---

## 🏃‍♂️ How to Run

ใช้คำสั่งต่อไปนี้เพื่อรันโปรเจกต์ในโหมดพัฒนา (Development Mode):

```bash
npm run dev
# หรือ
next dev --webpack
