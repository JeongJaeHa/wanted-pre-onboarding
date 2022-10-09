# 개요

### 원티드 프리온보딩 사전과제
- 본 서비스는 기업의 채용을 위한 웹 서비스 입니다.
- 회사는 채용공고를 생성하고, 이에 사용자는 지원합니다.
<br/>
### 기술스택
- JavaScript<br/>
- Node.js / Express<br/>
- MySQL 8.0<br/>
- Postman<br/>
<br/>
<br/>
# ERD<br/>
![ERD](https://user-images.githubusercontent.com/99805929/194757229-0410b241-e7ec-48ed-97db-d18f655e1a97.png)
<br/>
<br/>
# API documentation<br/>
[API documentation](https://documenter.getpostman.com/view/22378810/2s83tJEVB9)
<br/>
<br/>
# 요구사항 분석 및 구현내용
## 요구사항 분석
 1. 요구사항이 채용공고를 중심으로 이루어지는 기능들이라고 생각하여 채용공고(posts)를 메인 테이블로 생각하고 구현을 진행하였습니다.
 --- 

## 구현내용
### **1.채용 공고를 등록합니다.**
1-1. 사용자(기업)이 폼에 맞게 입력하여 데이터 전송 시 posts 테이블에 삽입되도록 구현.<br/>
1-2. position, skill은 별도의 테이블을 만들어 테이블에는 id값을 입력<br/>
1-3. 2번의 내용으로 인해 skill, position을 잘못 입력하면 에러가 발생하여 검증하는 로직을 추가

```javaScript
Request(body)
{
  "title": "신입 개발자 모집중입니다!",
  "name": "넥슨",
  "position": "백엔드주니어",
  "skill": "Node.js",
  "compensation": "100000",
  "explanation": "환영합니다 넥슨과 함께 성장해요",
  "deadline": "2022-10-30"
}
```
```javaScript
Response
{
    "message": "채용공고 등록에 성공하였습니다!"
}
```

### **2. 채용공고를 수정합니다.**
2-1. 채용공고 등록과 동일한 과정으로 진행되나 데이터 전송시 게시글 id도 추가로 전송합니다.<br/>
```javaScript
Request(body)
{
    "id":"13",
    "title":"신입 개발자 모집",
    "name":"원티드",
    "position":"백엔드주니어",
    "skill":"Node.js",
    "compensation":"100000",
    "explanation":"환영합니다 원티드와함께 성장해요",
    "deadline":"2022-10-30"
}
```
```javascript
Response
{
  "message": "edit success"
}
```

### **3. 채용공고를 삭제합니다.**
3-1 게시글 id 전송 시 게시글 존재여부 확인 후 해당 게시글을 삭제합니다.
```javascript
http://127.0.0.1:8080/post?id=93
```

### **4-1. 채용공고 목록을 가져옵니다.**
4-1 엔드포인트에 요청 시 posts 테이블에 있는 전체 게시글을 불러옵니다.
```javascript
http://127.0.0.1:8080/post/list
```
```javascript
{
  "list": [
    {
      "title": "백엔드 신입개발자 채용합니다.",
      "name": "원티드",
      "location": "강남",
      "position": "백엔드주니어",
      "skill": "Node.js"
    },
    {
      "title": "백엔드 시니어 개발자 채용합니다.",
      "name": "쏘카",
      "location": "역삼",
      "position": "백엔드시니어",
      "skill": "Django"
    }
    ...
    (이하생략)
  ]
}
```
### **4-2. 채용공고 검색기능 구현**
4-2 4-1에서 Response하는 데이터와 유사하나 키워드가 일치하는 게시글들만 전송합니다.
```javascript
http://127.0.0.1:8080/post/list/search?keyword=원티드
```

```javascript
{
  "result": [
    {
      "title": "백엔드 신입개발자 채용합니다.",
      "name": "원티드",
      "location": "강남",
      "position": "백엔드주니어",
      "skill": "Node.js"
    },
    {
      "title": "신입 개발자 모집",
      "name": "원티드",
      "location": "강남",
      "position": "백엔드주니어",
      "skill": "Node.js"
    }
    ...(이하생략)
  ]
}
```
### **5. 채용공고 상세페이지를 가져옵니다.**
5-1 조회를 원하는 게시글의 id 전송 시 해당게시글의 상세정보를 불러옵니다.
5-2 해당 게시글을 올린 회사의 다른 게시글의 id를 두번째 배열에 반환합니다.
```javascript
http://127.0.0.1:8080/post/detail?id=13
```
```javascript
{
  "detailPost": [
    [
      {
        "title": "2022년 하반기 개발자 채용공고",
        "name": "배달의민족",
        "location": "구로",
        "position": "백엔드주니어",
        "skill": "Node.js",
        "compensation": "250000",
        "explanation": "주 32시간 근무, 노트북 지급, 성과에 따른 인센티브 제공",
        "deadline": "2022-10-30"
      }
    ],
    [
      {
        "otherPostsId": 4
      },
      {
        "otherPostsId": 8
      },
      {
        "otherPostsId": 14
      }
    ]
  ]
}
```
### **6. 사용자는 채용공고에 지원합니다.**
6-1 지원하고자 하는 게시글의 id와 사용자ID(userId) 전송 시 applications 테이블에 삽입됩니다.<br/>
6-2 지원하기/취소하기 를 하나의 버튼에서 한다고 가정하고 첫번째 전송 시 지원(row 삽입), 두번째 전송 시 지원을 취소하도록(row 삭제) 구현하였습니다.<br/>
### **7. Unit TEST**
7-1 각각 구현사항을 성공/실패 하는 경우로 테스트를 진행하였습니다.
<br/>
<br/>
![unit test](https://user-images.githubusercontent.com/99805929/194757257-9e881103-5d1f-4f14-9203-2eb3009843f8.png)


