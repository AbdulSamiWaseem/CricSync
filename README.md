# Sports Matchmaking Platform 🏏⚽🏀

A full-stack web application built with **Django** and **React.js** that enables **cricket team captains** to find and organize matches with other teams. The platform includes **user authentication**, **admin management**, **match scheduling**, and **real-time notifications**. Future plans include **tournament support**, **live scoring**, **multi-sport expansion**, and a **mobile app**.

---

## 🌟 Features

- 🧾 **User Registration & Login** – Secure JWT-based authentication
- 🏏 **Create & Join Matches** – Team captains can set up and accept matches
- 🗂️ **Admin Panel** – Manage users, teams, and match data
- 🔔 **Notifications** – Users receive alerts about match requests, acceptances, etc.
- 👥 **View Other Teams** – Browse and connect with other teams in your area
- 📱 **Mobile App (Planned)** – Future Android/iOS app for better accessibility
- 🏆 **Tournament Support (Planned)** – Organize and manage structured tournaments
- 📊 **Scoring System (Planned)** – Record live scores and maintain match history
- 🧑‍🤝‍🧑 **Solo Player Requests (Planned)** – Players without a team can request to join existing ones

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Axios
- React Router
- Bootstrap CSS / CSS Modules

**Backend:**
- Django
- Django REST Framework (DRF)
- JWT Authentication
- SQLite / PostgreSQL

---

## 🚀 Getting Started

### Prerequisites
- Python
- Node.js & npm

### Backend Setup

```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
