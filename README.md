# 개요

### 원티드 프리온보딩 선발 사전과제입니다.

<br/>

# 기술스택
- JavaScript<br/>
- Node.js / Express<br/>
- TypeORM<br/>
- MySQL 8.0<br/>
- Postman<br/>
<br/>

# ERD<br/>
<img width="769" alt="스크린샷 2022-10-11 오후 4 26 54" src="https://user-images.githubusercontent.com/99805929/195045136-5a98fb21-210e-4307-8d85-812747b2a100.png">
<br/>
<br/>

# API Documentation<br/>
[API documentation](https://documenter.getpostman.com/view/22378810/2s83tJEVB9)
<br/>
<br/>
# 요구사항 분석 및 구현내용
## 요구사항 및 분석
- 본 서비스는 기업의 채용을 위한 웹 서비스 입니다.
- 회사는 채용공고를 생성하고, 이에 사용자는 지원합니다.

<br/>
 각 요구사항을 분석하여 4개의 테이블을 구성하였고, 아래 내용과 같이 구현하였습니다.
<br/>
<br/>

 --- 

## 구현내용
### **1.채용 공고를 등록합니다.** <br/>
1-1. 사용자, 기업은 테이블에 삽입 필요<br/>
1-2. 사용자(기업)이 데이터를 입력하여 전송 시 post 테이블에 삽입되도록 구현.<br/>

```javaScript
Request(body)
{
  "title": "신입 개발자 모집중입니다!",
  "name": "원티드",
  "position": "백엔드주니어",
  "skill": "Node.js",
  "compensation": "100000",
  "explanation": "환영합니다 원티드와 함께 성장해요",
  "deadline": "2022-10-30"
}
```
```javaScript
Response
{
    "message": "채용공고 등록에 성공하였습니다!"
}
```

### **2. 채용공고를 수정합니다.** <br/>
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

### **3. 채용공고를 삭제합니다.** <br/>
3-1. 게시글 id 전송 시 게시글 존재여부 확인 후 해당 게시글을 삭제합니다.
```javascript
http://127.0.0.1:8080/post?id=93
```

### **4-1. 채용공고 목록을 가져옵니다.** <br/>
4-1. 엔드포인트에 요청 시 posts 테이블에 있는 전체 게시글을 불러옵니다.
```javascript
http://127.0.0.1:8080/post/list
```
```javascript
{
{
    "list": [
        {
            "id": 1,
            "title": "신입 개발자 모집중입니다!",
            "skill": "Node.js",
            "position": "백엔드주니어",
            "name": "배달의민족"
        },
        {
            "id": 3,
            "title": "수정테스트중입니다",
            "skill": "Node.js",
            "position": "백엔드주니어",
            "name": "원티드"
        },
        ...(이하생략)
    ]
}
```
### **4-2. 채용공고 검색기능 구현** <br/>
4-2. 4-1에서 구현한 채용공고 목록 중 키워드가 들어있는 게시글들만 Response 합니다.
```javascript
http://127.0.0.1:8080/post/list/search?keyword=우리
```

```javascript
{
    "result": [
        {
            "id": 6,
            "title": "우리가 왔다!!!",
            "skill": "Node.js",
            "position": "백엔드주니어",
            "name": "원티드"
        },
        {
            "id": 16,
            "title": "우리가 왔다!!!",
            "skill": "Node.js",
            "position": "백엔드주니어",
            "name": "직방"
        },
        ...(이하생략)
    ]
}
```
### **5. 채용공고 상세페이지를 가져옵니다.** <br/>
5-1. 조회를 원하는 게시글의 id 전송 시 해당게시글의 상세정보를 불러옵니다.<br/>
5-2. 해당 게시글을 올린 회사의 게시글 목록 id를 두번째 배열에 반환합니다.
```javascript
http://127.0.0.1:8080/post/detail?id=13
```
```javascript
{
    "detailPost": [
        [
            {
                "id": 4,
                "title": "신입 개발자 모집중입니다!!!",
                "skill": "Node.js",
                "postiion": "백엔드주니어",
                "name": "원티드",
                "location": "역삼",
                "compensation": "100000.00",
                "deadline": "2022-10-30",
                "explanation": "환영합니다 넥슨과 함께 성장해요"
            }
        ],
        [
            3,
            4,
            5,
            6
        ]
    ]
}
```
### **6. 사용자는 채용공고에 지원합니다.** <br/>
6-1. 지원하고자 하는 게시글의 id와 사용자ID(userId) 전송 시 applications 테이블에 삽입됩니다.<br/>
```javaScript
http://127.0.0.1:8080/application
```
```javaScript
{
    "message": "지원하셨습니다.",
    "post_id": "1",
    "user_id": "1"
}
```
이미 지원한 경우에는 중복 지원이 불가능하다는 메세지로 응답합니다.
```javascript
{
    "message": "이미 지원한 채용공고 입니다.",
    "statusCode": 400
}
```
### **7. Unit TEST** <br/>
7-1. 각각 구현사항을 성공/실패 하는 경우로 테스트를 진행하였습니다.
<br/>
<br/>
![unit test](https://user-images.githubusercontent.com/99805929/195045674-9fe6cc83-d59e-4801-a5ad-0557550cc5c9.png)


