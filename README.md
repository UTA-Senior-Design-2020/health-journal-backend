# Health Journal Backend &middot; ![Deploy to Amazon ECS](https://github.com/UTA-Senior-Design-2020/health-journal-backend/workflows/Deploy%20to%20Amazon%20ECS/badge.svg?branch=master)

Backend Server built with **Express js** & deployed with AWS

## 1. Setup

[TODO]

## 2. Requests

## 2.1 Tasks

### 2.1.1 Adding a New Task

```http
POST /tasks
```

#### Request Body Example

```http
{
	"task": {
		"Title": "Run",
		"StartDate": "2020-09-06 19:58:41",
		"Frequency": 1,
		"Instruction": "Start running",
		"ImpactsAdherence": 1,
		"TaskType": 0,
		"PlotType": 0,
		"PatientId": 6
	}
}
```

### 2.1.2 Updating a Tsak

```http
PUT /tasks
```

#### Request Body Example

```http
{
	"task": {
		"TaskId": "10",
		"Title": "Run Faster",
		"StartDate": "2020-09-06 19:58:41",
		"Frequency": 1,
		"Instruction": "Start running much faster",
		"ImpactsAdherence": 1,
		"TaskType": 0,
		"PlotType": 0,
		"PatientId": 6
	}
}
```

### 2.1.3 Deleting a Task

```http
DELETE /tasks
```

#### Request Body Example

```http
{
	"TaskId": 5
}
```

## 2.2 Patients

### 2.2.1 Adding a New Patient

Adding a new Patient requires a Patient Address. The request body must include both the patient information and address information.

```http
POST /patients
```

#### Request Body Example

```http
{
	"patient": {
		"GivenName": "Bill",
		"FamilyName": "Blurr",
		"Email": "bill.blurr@mavs.uta.edu",
		"CallPhone": "1231231233",
		"TextPhone": "1231231233"
	},
	"address": {
		"Street": "4321",
		"City": "Dallas",
		"StateCode": "TX",
		"PostalCode": "12345"
	}
}
```
