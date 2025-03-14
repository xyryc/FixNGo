# 🚀 FixNGo

FixNGo is a **car repair service shop web application** built with **Next.js**, styled using **Tailwind CSS**, and enhanced with **shadcn/ui components**. It allows users to **book or cancel services** while demonstrating **secure CRUD operations in Next.js**.

## Live Site

[FixNGo Live](https://fixngo.vercel.app/)

## 📌 Features

- **Secure authentication** with email/password and Google login using NextAuth.js
- **Browse and select car repair services**, with detailed service descriptions
- **Fill out a form to confirm service orders**
- **Manage bookings** from the "Bookings" page
- **Update or delete booked services**

## 🛠️ Technologies Used

- Frontend: Next.js, Tailwind CSS, shadcn/ui
- Backend: API Routes (Next.js)
- Database: MongoDB
- Authentication: NextAuth.js Auth

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/xyryc/FixNGo.git
cd FixNGo
```

### 2. Install Dependencies

```sh
npm install  # or yarn install
```

### 3. Setup Environment Variables

Create a .env.local file and add:

```sh
NEXT_PUBLIC_MONGODB_URI=your_mongodb_uri
DB_NAME=database_name
NEXT_PUBLIC_URL=http://localhost:3000  #production
NEXTAUTH_SECRET=next_auth_secret
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
```

### 4. Run the Development Server

Create a .env.local file and add:

```sh
npm run dev  # or yarn dev
```

## Contribution

Feel free to fork the repository, make improvements, and submit a pull request. For major changes, open an issue first to discuss the proposed changes.
