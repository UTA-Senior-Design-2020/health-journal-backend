# Health Journal Backend  &middot; ![Deploy to Amazon ECS](https://github.com/UTA-Senior-Design-2020/health-journal-backend/workflows/Deploy%20to%20Amazon%20ECS/badge.svg?branch=master)

Backend Server built with **Express js** & deployed with AWS

## 1. Setup
[TODO]

## 2. Requests

## 2.1 Tasks

### Adding New Tasks

#### URL endpoint
POST: `/tasks`

#### Request body

```
{
	"task": {
		"title": "Node", "startDate": "2020-09-06 18:58:41", 
		"instruction": "idk", "frequency": 1, "impactAdherence": 1,
		"patientId": 5
	}
}
```
