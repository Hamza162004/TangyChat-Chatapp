# Real-Time Chat Application

A feature-rich real-time chat application built with the MERN stack and Socket.IO. This app provides seamless messaging, group chats, media sharing, and more to enhance communication.

## 🌟 Features
- 💬 **Real-time messaging** with notifications, typing indicators, and message alerts.  
- 🟢 **Online status**: View users who are online.  
- 📤 **Media sharing**: Send images, videos, and documents (stored securely on Cloudinary).  
- 👥 **Group chats**: Create chats, communicate in groups, manage members, or leave groups.  
- 🤝 **Friend requests**: Send, accept, and manage connections.  
- 👤 **Profile management**: Signup, login, and edit your profile.  

## 🛠️ Tech Stack
- **Frontend**: React, Material-UI, DaisyUI, React-Hot-Toast  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Real-time Events**: Socket.IO  
- **Media Storage**: Cloudinary  

## 🚀 Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/Hamza162004/TangyTalks-Chatapp
   ```  

2. Install dependencies for the backend:  
   ```bash
   cd server  
   npm install  
   ```  

3. Install dependencies for the frontend:  
   ```bash
   cd ../client  
   npm install  
   ```  

4. Set up environment variables:  
   - Create a `.env` file in the `server` directory with the following keys:  
     ```plaintext
     MONGO_URI=your-mongodb-connection-string  
     CLOUDINARY_CLOUD_NAME=your-cloud-name  
     CLOUDINARY_API_KEY=your-api-key  
     CLOUDINARY_API_SECRET=your-api-secret  
     JWT_SECRET=your-jwt-secret
     CLIENT_URL=your-clientside-url
     ```
   - Create a `.env` file in the `client` directory with the following keys:  
     ```plaintext
     VITE_API_URL=your-serverside-url
     ```  


5. Start the backend server:  
   ```bash
   cd server  
   npm start  
   ```  

6. Start the frontend development server:  
   ```bash
   cd ../client  
   npm start  
   ```  
