# Custom Form Builder - README

![image](https://github.com/user-attachments/assets/c6e9d3b4-d843-4079-9d03-cc4030c00c8d)


## 1. 애플리케이션 아키텍처

### 1.1 기술 스택

이 프로젝트는 `react-create-router@latest`를 사용하여 생성되었습니다.

- 프론트엔드: react `v19.0.0`,
- 라우팅: react-router `v7.2.0`
- 개발 환경: vite `v5.4.11`, typeScript `v5.7.2`

추가로 설치한 외부 라이브러리는 다음과 같습니다.

- 상태 관리: zustand `v5.0.3`
  - 애플리케이션 전반의 상태 관리를 위해 사용
- 폼 관리: react-hook-form `v7.54.2`
  - 간편한 폼 입력값 관리 및 유효성 검사를 위해 사용
- 스타일링: tailwindcss `v4.0.0`
  - 빠른 UI 개발을 위해 사용
- 테스트: vitest `v3.0.8`, @testing-library/react `v16.2.0`
  - 테스트 코드 작성을 위해 사용
- 코드 정리: prettier-plugin-tailwindcss `^0.6.11`
  - Tailwind CSS 클래스의 자동 정렬로 일관된 코드 스타일과 가독성 향상을 위해 사용

### 1.2 폴더 구조

각 파일과 동일한 위치에 tests 폴더를 두어 테스트 코드를 관리하는 구조로 되어 있습니다.

```
├── app/
│   ├── components/      # 재사용 가능한 UI 컴포넌트
│   │   ├── common/      # 공통 컴포넌트
│   │   ├── form/        # 폼 관련 컴포넌트
│   │   └── survey/      # 설문조사 관련 컴포넌트
│   ├── constants/       # 상수 정의
│   ├── contexts/        # React 컨텍스트
│   ├── hooks/           # 커스텀 React 훅
│   ├── lib/             # 유틸리티 함수 및 헬퍼
│   ├── routes/          # 라우트 컴포넌트
│   ├── store/           # Zustand 상태 관리
│   └── types/           # TypeScript 타입 정의
└── ...
```

### 1.3 애플리케이션 구조

애플리케이션은 React Router의 파일 기반 라우팅 시스템을 활용하여 다음과 같은 라우트 구조로 구성되어 있습니다:

- 홈 페이지 (`routes/home.tsx`)
- 설문조사 편집 페이지 (`routes/$surveyId.edit.tsx`)
- 에러 페이지 (`routes/error.tsx`)

### 1.4 렌더링 모드

이 애플리케이션은 클라이언트 사이드 렌더링(CSR) 모드로 구성되어 있습니다. React Router 7은 기본적으로 서버 사이드 렌더링(SSR)을 지원하지만, `LocalStorage`사용을 위해 SPA(Single Page Application) 모드로 설정되어 있습니다.

### 1.5 개발 환경

개발자 간의 환경 일관성을 유지하고 의존성 관리를 단순화하기 위해 Docker를 통한 개발 환경을 지원합니다. 구동 방법은 <a href="#1.1 개발 환경 설정">1.1 개발 환경 설정</a>을 확인해주세요.

### 1.6 에러 처리 시스템

애플리케이션은 일관된 에러 처리를 위한 중앙화된 시스템을 구현하고 있습니다:

- 에러 타입 상수화: `constants/error.ts`에서 모든 에러 타입과 메시지를 중앙 관리
- 커스텀 에러 클래스: `AppError` 클래스를 활용한 표준화된 에러 객체 생성
- 전역 에러 스토어: Zustand를 활용하여 애플리케이션 전체에서 에러 상태 관리
- 에러 표시 컴포넌트: `ErrorHandler` 컴포넌트를 통해 에러 발생 시 화면 하단에 팝업 알림 표시 또는 에러 페이지로 리디렉션 처리


## 2. 설치 및 실행 가이드

### 2.1 개발 환경 설정

1. 저장소 클론

```bash
git clone <repository-url>
cd custom-form-builder
```

2. 의존성 설치

```bash
npm install
```

### 2.2 개발 환경 설정

개발서버는 3000포트에서 실행됩니다.

일반 개발 서버 실행:

```bash
npm run dev
```

Docker 이미지 빌드 후 개발 서버 실행 (최초 1회):

```bash
npm run dev:docker:build
```

Docker를 통한 개발 서버 실행:

```bash
npm run dev:docker
```

> Docker 사용을 위해서는 Docker Desktop이 실행중이여야 합니다. 프로그램 설치가 필요한 경우 [Docker Desktop](https://www.docker.com/products/docker-desktop/) 다운로드 가능합니다.

### 2.3 테스트

```bash
npm run test
```

### 2.4 테스트빌드 및 배포

애플리케이션 빌드:

```bash
npm run test
```

빌드된 애플리케이션 실행:

```bash
npm run test
```

## 3. 페이지별 기능명세서

### 3.1 메인 (`routes/home.tsx`)

사용자가 양식을 관리하고 새로운 양식을 생성할 수 있는 메인 화면입니다.

![image](https://github.com/user-attachments/assets/9cd1e41b-b976-4bf8-af77-0b2895356544)


#### 양식 검색 영역

- 헤더 내에있는 검색 영역을 통해 '내 양식'을 검색할 수 있습니다.
- 양식 제목을 기준으로 검색됩니다.
- 검색어가 삭제되면 전체 양식 리스트를 노출합니다.
  
  ![image](https://github.com/user-attachments/assets/20998d74-56c4-46a7-9060-ae36793618bd)  


#### 양식 미리보기 기능 (공통)

'새 양식 만들기'와 '내 양식'의 '미리보기' 버튼을 클릭하면 해당 양식을 미리볼 수 있습니다.
미리보기 영역의 자세한 설명은 <a href="미리 보기 영역">양식 수정 페이지>미리 보기 영역</a>에서 확인하실 수 있습니다.

![image](https://github.com/user-attachments/assets/4c2f9637-aef4-4013-8c6e-4202ec397f27)

#### 새 양식 만들기 영역

- 사이트에서 제공되는 기본 템플릿 리스트가 노출됩니다.
- 템플릿 리스트 중 하나를 클릭하면 해당 템플릿이 '내 양식'에 추가되면서 양식 수정 페이지로 이동합니다.
- '미리보기' 버튼을 클릭하면 양식을 비리볼 수 있는 화면이 우측에 노출됩니다.

#### 내 양식 영역

- 사용자가 생성한 양식 리스트가 제목, 날짜와 함꼐 노출됩니다.
- 양식 리스트 중 하나를 클릭하면 해당 양식의 수정페이지로 이동합니다.
- '미리보기' 기능과 '삭제' 기능을 제공합니다. 
- '삭제' 버튼을 클릭하면 확인창이 노출된 뒤 사용자가 '확인'버튼을 누르면 양식이 삭제됩니다.
![image](https://github.com/user-attachments/assets/b3fa3d3d-5317-4e5b-bfef-9975405517c7)

### 3.2 양식 수정 페이지 (`route/$surveyId,edit.tsx`)

사용자가 기존 양식을 수정하고 관리할 수 있는 양식 수정 페이지입니다.

#### 양식 수정 영역

- 설문지 제목, 설명, 질문들을 수정할 수 있습니다.
- 양식 수정사항이 있을때 브라우저 탭을 새로고침하거나 종료하려고 시도할 경우 경고창이 노출됩니다.
  - ![image](https://github.com/user-attachments/assets/36bedb2f-9efe-4c49-aaa6-11a1f72527c1)
- '실시간 미리보기 닫기/열기' 버튼을 통해 미리보기 영역을 노출/비노출 시킬 수 있습니다.
- '수정 완료' 버튼을 클릭하면 수정 내용이 저장되며 메인 페이지로 이동합니다.

##### 양식 수정 > 질문 영역

- 질문을 추가/삭제 할 수 있습니다. '질문 삭제' 버튼을 클릭시 확인창이 노출되고 '확인'버튼을 누르면 질문이 삭제됩니다.
- 질문은 단답형, 장문형, 객관식, 체크박스, 드롭다운 5개의 타입이 있습니다.
  - ![image](https://github.com/user-attachments/assets/0f96ae28-b245-44e1-b304-48fd1574ef4c) 
- 객관식, 체크박스, 드롭다운은 옵션을 설정할 수 있습니다. 옵션을 추가/삭제할 수 있고 옵션 내용을 수정할 수 있습니다.
  - ![image](https://github.com/user-attachments/assets/f408a05a-2577-4261-a9b6-6dd61c610dc0)
- 옵션이 작성된 상태에서 질문 타입을 옵션을 보유한 다른 타입(객관식, 체크박스, 드롭다운)으로 설정해도 옵션은 리셋되지 않으나, 옵션이 없는 단답형, 장문형으로 선택하는 경우 작성한 옵션이 리셋됩니다.
- '필수 항목' 체크박스를 클릭하여 질문의 필수 항목 여부를 선택할 수 있습니다.


#### 미리 보기 영역

- 사용자가 수정한 양식이 실시간으로 반영됩니다.
- 필수 항목이 존재하는 경우 '설문지 설명' 하단에 '* 표시는 필수 질문입니다' 텍스트가 노출됩니다.
- 필수 항목은 질문 옆에 '*' 표시가 노출됩니다.

![image](https://github.com/user-attachments/assets/f57deea9-9212-4aba-a6c9-133971743aa4)







