# API Documentation

This document describes the REST API endpoints used by the Emotion Aware Learning Platform.

---

## Base URL

Local Development

http://127.0.0.1:5000

Production

https://emotion-recognition.duckdns.org

---

# 1. Facial Emotion Prediction

### Endpoint

POST /predict_face

### Description

Predicts the emotion from an uploaded facial image using the trained CNN model.

### Request

Content-Type

multipart/form-data

Parameter

| Name | Type | Description |
|------|------|-------------|
| image | File | Face image |

### Success Response

```json
{
    "emotion": "Happy",
    "confidence": 0.96
}
```

---

# 2. Audio Emotion Prediction

### Endpoint

POST /predict_audio

### Description

Predicts the emotion from an uploaded audio file using the trained MLP model.

### Request

Content-Type

multipart/form-data

Parameter

| Name | Type | Description |
|------|------|-------------|
| audio | File | Audio recording |

### Success Response

```json
{
    "emotion": "Neutral",
    "confidence": 0.91
}
```

---

# 3. Register User

### Endpoint

POST /register

### Description

Creates a new user account.

### Request

Content-Type

application/json

```json
{
    "name":"Akshay",
    "email":"akshay@example.com",
    "age":21,
    "password":"password123"
}
```

### Success Response

```json
{
    "message":"User registered successfully"
}
```

---

# 4. Login

### Endpoint

POST /login

### Description

Authenticates the user.

### Request

```json
{
    "email":"akshay@example.com",
    "password":"password123"
}
```

### Success Response

```json
{
    "user_id":1,
    "name":"Akshay"
}
```

---

# 5. Prediction History

### Endpoint

GET /history

### Description

Returns all stored emotion predictions.

### Success Response

```json
[
    {
        "id":1,
        "emotion":"Happy",
        "confidence":0.95
    }
]
```

---

# 6. Latest Prediction

### Endpoint

GET /latest_prediction/<user_id>

### Description

Returns the latest emotion detected for a specific user.

### Example

GET /latest_prediction/1

### Success Response

```json
{
    "emotion":"Happy",
    "timestamp":"2026-07-25 15:20:30"
}
```

---

# 7. Save Activity

### Endpoint

POST /activity

### Description

Stores the learning activity completed by the user.

### Request

```json
{
    "user_id":1,
    "emotion":"Happy",
    "activity_name":"Flashcards"
}
```

### Success Response

```json
{
    "message":"Activity saved successfully"
}
```

---

# 8. Test Endpoint

### Endpoint

GET /test

### Description

Checks whether the backend server is running.

### Success Response

```json
{
    "message":"Backend is running"
}
```

---

# 9. Available Routes

### Endpoint

GET /routes

### Description

Returns all available API routes.

### Success Response

```json
[
    "/predict_face",
    "/predict_audio",
    "/register",
    "/login",
    "/history",
    "/activity"
]
```

---