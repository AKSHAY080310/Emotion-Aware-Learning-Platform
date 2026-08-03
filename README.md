<div align="center">

# 🧠 Emotion-Aware Learning Platform for Autistic Children

### End-to-End Multimodal Emotion Recognition using Facial Expressions & Speech Analysis

<p align="center">

<img src="https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python"/>
<img src="https://img.shields.io/badge/TensorFlow-Deep%20Learning-orange?style=for-the-badge&logo=tensorflow"/>
<img src="https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask"/>
<img src="https://img.shields.io/badge/OpenCV-Computer%20Vision-green?style=for-the-badge&logo=opencv"/>
<img src="https://img.shields.io/badge/AWS-EC2-yellow?style=for-the-badge&logo=amazonaws"/>
<img src="https://img.shields.io/badge/SQLite-Database-blue?style=for-the-badge&logo=sqlite"/>

</p>

</div>

---

## 📖 Overview

Emotion-Aware Learning Platform is an end-to-end Artificial Intelligence application designed to support **autistic children** through personalized learning experiences powered by **multimodal emotion recognition**.

The platform combines **Facial Emotion Recognition** and **Speech Emotion Recognition** to identify a user's emotional state from facial expressions and voice recordings. Based on the detected emotion, the system recommends personalized learning activities such as flashcards, quizzes, memory games, and emotion-based storytelling to improve engagement and emotional development.

The application integrates machine learning, computer vision, speech processing, REST APIs, cloud deployment, and database management into a complete production-ready solution.

## 🛠️ Technology Stack

| Category | Technologies |
|----------|--------------|
| **Programming Language** | Python, JavaScript |
| **Machine Learning** | TensorFlow, Keras, Scikit-learn |
| **Computer Vision** | OpenCV |
| **Speech Processing** | Librosa, MFCC Feature Extraction |
| **Backend** | Flask, REST APIs |
| **Frontend** | HTML, CSS, JavaScript |
| **Database** | SQLite |
| **Cloud & Deployment** | AWS EC2, Gunicorn, Nginx, DuckDNS, HTTPS (Let's Encrypt) |
| **Tools** | Git, GitHub, Jupyter Notebook, Google Colab, VS Code |

## 📂 Project Structure

```text
Emotion-Aware-Learning-Platform/
│
├── backend/                  # Flask backend and REST APIs
├── frontend/                 # User interface (HTML, CSS, JavaScript)
├── ml/                       # Audio emotion recognition pipeline
├── models/                   # Trained machine learning models
├── notebooks/                # Model training notebooks
├── database/                 # Database schema and SQLite database
├── docs/                     # Documentation, screenshots and diagrams
│   └── screenshots/
├── .gitignore
├── LICENSE
├── README.md
├── requirements.txt
└── emotion_recognition.db
```

## 🧠 Machine Learning Pipeline

### Facial Emotion Recognition

- Dataset: FER-2013
- Images: 35,887
- Emotion Classes: 7
- Model: Convolutional Neural Network (CNN)
- Framework: TensorFlow/Keras

Pipeline

1. Face Detection
2. Image Preprocessing
3. CNN Prediction
4. Emotion Classification
5. Recommendation Generation

---

### Speech Emotion Recognition

- Feature Extraction: MFCC
- Framework: Scikit-learn

Pipeline

1. Audio Upload / Recording
2. Audio Preprocessing
3. MFCC Feature Extraction
4. Emotion Prediction
5. Recommendation Generation

## 📚 Datasets

### FER-2013

- Images: **35,887**
- Emotion Classes:
  - Angry
  - Disgust
  - Fear
  - Happy
  - Neutral
  - Sad
  - Surprise

### Speech Emotion Dataset

The speech emotion recognition model is trained using an emotion-labelled speech dataset. Audio signals are preprocessed using Librosa and represented using MFCC features before classification.

## 📊 Model Performance

| Model | Dataset | Accuracy | F1 Score |
|--------|---------|----------|----------|
| Facial Emotion Recognition (CNN) | FER-2013 | **58.65%** | **58.00%** |
| Speech Emotion Recognition | Audio Dataset | **75.35%** | **75.00%** |

### Key Highlights

- Facial model trained using TensorFlow/Keras
- Speech model trained using Scikit-learn
- Real-time prediction support
- Cloud deployment on AWS EC2

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/AKSHAY080310/Emotion-Aware-Learning-Platform.git
```

### Navigate

```bash
cd Emotion-Aware-Learning-Platform
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

## 🚀 Running the Project

### Start Backend

```bash
cd backend
python app.py
```

### Open Frontend

Open `frontend/index.html`

or

Run using a local web server.

## 🌐 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/predict_face` | Facial emotion prediction |
| POST | `/predict_audio` | Speech emotion prediction |
| GET | `/history` | Prediction history |
| POST | `/login` | User login |
| POST | `/signup` | User registration |

## ☁️ Deployment

The application is deployed on **AWS EC2** using:

- Gunicorn
- Nginx
- DuckDNS
- HTTPS (Let's Encrypt)

Deployment workflow:

Browser → Nginx → Gunicorn → Flask Backend → Machine Learning Models → SQLite Database

## 🔮 Future Improvements

- Improve facial emotion recognition accuracy using transfer learning.
- Integrate transformer-based speech emotion recognition models.
- Add multilingual speech support.
- Expand learning activities.
- Deploy using Docker and Kubernetes.
- Integrate PostgreSQL for scalable data management.

## 📚 Documentation

Detailed project documentation is available in the `docs/` folder.

- Architecture → `docs/Architecture.md`
- API Documentation → `docs/Api.md`
- User Guide → `docs/UserGuide.md`
- Deployment Guide → `docs/Deployment.md`
- Project Workflow → `docs/ProjectWorkflow.md`
- Future Enhancements → `docs/FutureEnhancements.md`

## 👨‍💻 Author

**Akshay Raj**

- LinkedIn: https://linkedin.com/in/akshay-raj-707022368
- GitHub: https://github.com/AKSHAY080310

## 📄 License

This project is licensed under the MIT License.
