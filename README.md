# Questions and Answers API

This is the Atelier API service that services the Catwalk website for all questions and related answers for a product. This is a RESTful API, please use the following routes for this API.

## **Important**
Please ensure parameters are sent as noted in the parameter headers below, either as request params, query, or within the body.

<br/>

## **List of Questions**

`GET /qa/questions` will retrieve a list of questions and related answers for a particular product. This list *does NOT* include any reported questions.

<br/>

**Parameters**

|Query Parameter|Type|Description|
|---|---|---|
|product_id|integer|Specifies the product for which to retrieve questions.|
|page|integer|Specifies the page of results to return. Default 1|
|count|integer|Specifies how many results per page to return. Default 5|

<br/>

**Response**

`Staus: 200 OK`

<br/>

**Sample Data**
```json
{
  "product_id": "1",
  "results": [
    {
      "_id": "61e9ec51ee6dba6276bf5b96",
      "question_id": 4,
      "product_id": 1,
      "question_body": "How long does it last?",
      "question_date": "2019-07-06",
      "asker_name": "funnygirl",
      "asker_email": "first.last@gmail.com",
      "reported": 0,
      "question_helpfulness": 6,
      "__v": 0,
      "answers": {
        "65": {
            "_id": "61e9ee3b69ee88897dea9285",
            "id": 65,
            "question_id": 4,
            "body": "It runs small",
            "date": "2019-11-17",
            "answerer_name": "dschulman",
            "answerer_email": "first.last@gmail.com",
            "reported": 0,
            "helpful": 1,
            "photos": [
                "https://images.unsplash.com/photo-1470116892389",
                "https://images.unsplash.com/photo-1536922645426"
            ]
        },
          "89": {
              "_id": "61e9ee3b69ee88897dea929d",
              "id": 89,
              "question_id": 4,
              "body": "Showing no wear after a few months!",
              "date": "2019-09-06",
              "answerer_name": "sillyguy",
              "answerer_email": "first.last@gmail.com",
              "reported": 0,
              "helpful": 8,
              "photos": []
          }
        }
    },
    //...
  ]
}
```
<br/>

## **List of Answers**

`GET /qa/questions/:question_id/answers` will retrieve a list of answers for a particular question. This list *does NOT* include any reported answers. If a request is made for a reported question, this endpoint will still retrieve a list of answers.

<br/>

**Parameters**

|Parameter|Type|Description|
|---|---|---|
|question_id|integer|Specifies the question for which to retrieve answers.|

|Query Parameter|Type|Description|
|---|---|---|
|page|integer|Specifies the page of results to return. Default 1|
|count|integer|Specifies how many results per page to return. Default 5|

<br/>

**Response**

`Staus: 200 OK`

<br/>

**Sample Data**
```json
{
  "question_id": "5",
  "results": [
    {
      "_id": "61e9ee3b69ee88897dea9272",
      "id": 46,
      "question_id": 5,
      "body": "I've thrown it in the wash and it seems fine",
      "date": "2018-02-08",
      "answerer_name": "marcanthony",
      "answerer_email": "first.last@gmail.com",
      "reported": 0,
      "helpful": 8,
      "photos": [
        "https://images.unsplash.com/photo-124135213515",
        "https://images.unsplash.com/photo-123412341645",
        //...
      ]
    },
    {
      "_id": "61e9ee3b69ee88897dea92a9",
      "id": 101,
      "question_id": 5,
      "body": "Only if you want to ruin it!",
      "date": "2018-03-08",
      "answerer_name": "ceasar",
      "answerer_email": "first.last@gmail.com",
      "reported": 0,
      "helpful": 5,
      "photos": []
    }
    //...
  ]
}
```
<br/>

## **Add a Question**

`POST /qa/questions` will add a question for a particular product. This endpoint will return the added question with certain fields generated such as a question_id and a timestamp.

<br/>

**Parameters**

|Body Parameter|Type|Description|
|---|---|---|
|product_id|integer|The required ID of the product for which the question is posted
|body|text|The required text of question being asked. Must not be empty|
|name|text|The required text of the username asking the question. Must not be empty|
|email|text|The required text of the asker's email address. Must not be empty|

<br/>

**Response**

`Staus: 201 CREATED`

<br/>

**Sample Data**
```json
{
  "question_id": "5",
  "results": [
    {
      "_id": "61e9ee3b69ee88897dea9272",
      "id": 46,
      "question_id": 5,
      "body": "I've thrown it in the wash and it seems fine",
      "date": "2018-02-08",
      "answerer_name": "marcanthony",
      "answerer_email": "first.last@gmail.com",
      "reported": 0,
      "helpful": 8,
      "photos": [
        "https://images.unsplash.com/photo-124135213515",
        "https://images.unsplash.com/photo-123412341645",
        //...
      ]
    },
    {
      "_id": "61e9ee3b69ee88897dea92a9",
      "id": 101,
      "question_id": 5,
      "body": "Only if you want to ruin it!",
      "date": "2018-03-08",
      "answerer_name": "ceasar",
      "answerer_email": "first.last@gmail.com",
      "reported": 0,
      "helpful": 5,
      "photos": []
    }
    //...
  ]
}
```
<br/>

## **Add an Answer**

`POST /qa/questions/:question_id/answers` will add an answer for a particular question. This endpoint will return the added answer with certain fields generated such as a answer_id and a timestamp.

<br/>

**Parameters**

|Parameter|Type|Description|
|---|---|---|
|question_id|integer|Specifies the question for which to retrieve answers.|

|Body Parameter|Type|Description|
|---|---|---|
|body|text|The required text of answer. Must not be empty|
|name|text|The required text of the username answering the question. Must not be empty|
|email|text|The required text of the answerer's email address. Must not be empty|
|photos|"["text"]"|A JSON array of urls corresponding to images to display

<br/>

**Response**

`Staus: 201 CREATED`

<br/>

**Sample Data**
```json
{
  "_id": "6201417228940e2d34ba8df4",
  "id": 12392957,
  "__v": 0,
  "answerer_email": "mctest@test.com",
  "answerer_name": "mctester",
  "body": "this is a test answer",
  "date": "2022-02-07",
  "helpful": 0,
  "photos": [
      "test.com",
      "test2.com"
  ],
  "question_id": 5,
  "reported": 0
}
```
<br/>

## **Mark Question Helpful**

`PUT /qa/questions/:question_id/helpful` will increment a counter that tracks how helpful a question has been.

<br/>

**Parameters**

|Parameter|Type|Description|
|---|---|---|
|question_id|integer|Specifies the question for which to mark helpful.|

<br/>

**Response**

`Staus: 204 NO CONTENT`

<br/>

## **Report Question**

`PUT /qa/questions/:question_id/report` will report a question.

<br/>

**Parameters**

|Parameter|Type|Description|
|---|---|---|
|question_id|integer|Specifies the question for which to report.|

<br/>

**Response**

`Staus: 204 NO CONTENT`

<br/>

## **Mark Answer Helpful**

`PUT /qa/answers/:answer_id/helpful` will increment a counter that tracks how helpful an answer has been.

<br/>

**Parameters**

|Parameter|Type|Description|
|---|---|---|
|answer_id|integer|Specifies the answer for which to mark helpful.|

<br/>

**Response**

`Staus: 204 NO CONTENT`

<br/>

## **Report Answer**

`PUT /qa/answers/:answer_id/report` will report an answer.

<br/>

**Parameters**

|Parameter|Type|Description|
|---|---|---|
|answer_id|integer|Specifies the answer for which to report.|

<br/>

**Response**

`Staus: 204 NO CONTENT`


