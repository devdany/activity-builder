# Activity Builder 과제

본 프로젝트는 Edmission 대학 지원 플랫폼의 Activity Builder 기능 일부를 구현하는 과제입니다.  
학생이 비교과 활동(Extracurricular Activities)을 입력하고, 활동의 티어와 조건에 따라 영향도 점수를 계산하는 UI를 제공합니다.

---

## 1. 프로젝트 세팅

### 사용 기술 스택

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- ESLint + Prettier
- pnpm

### 로컬 환경 요구사항

- Node.js 18 이상
- pnpm

pnpm이 설치되어 있지 않은 경우 아래 명령어로 설치합니다.

```bash
npm install -g pnpm
```

### 의존성 설치

```bash
pnpm install
```

## 2. 프론트엔드 개발 서버 실행 방법

아래 명령어를 실행하면 개발서버가 실행됩니다.

```bash
pnpm dev
```

브라우저에서 다음 주소로 접속합니다.

```
http://localhost:5173
```

## 3. 백엔드 개발 서버 실행 방법

백엔드는 Express + TypeScript 기반의 간단한 API 서버이며,  
SQLite를 로컬 파일 DB로 사용합니다.

---

### 디렉토리 구조

백엔드 서버는 프론트엔드와 분리되어 `server/` 디렉토리에서 실행됩니다.

activity-builder/
├─ src/ # Frontend (React)
├─ server/
│ ├─ index.ts # Express entry
│ ├─ db/
│ │ └─ index.ts # SQLite setup
│ ├─ routes/
│ │ └─ activities.ts
│ ├─ activity.db # SQLite database (자동 생성)
│ └─ package.json

---

### 백엔드 의존성 설치

먼저 `server` 디렉토리로 이동한 뒤 의존성을 설치합니다.

```bash
cd server
pnpm install
```

백엔드 개발 서버 실행

아래 명령어를 실행하면 Express 개발 서버가 실행됩니다.

```
pnpm dev
```

### SQLite 관련 주의사항 (pnpm 사용 시)

이 프로젝트에서는 SQLite 라이브러리로 `better-sqlite3`를 사용합니다.  
`better-sqlite3`는 네이티브 바이너리를 포함하고 있으며, pnpm의 보안 정책으로 인해  
기본적으로 빌드 스크립트 실행이 차단될 수 있습니다.

이 경우 아래와 같은 에러가 발생합니다.

```
Error: Could not locate the bindings file
```

---

#### 해결 방법: pnpm 네이티브 빌드 승인

pnpm에서는 네이티브 모듈의 빌드를 명시적으로 승인해야 합니다.  
아래 명령어를 실행하세요.

```bash
pnpm approve-builds
```

```
rm -rf node_modules
pnpm install
pnpm approve-builds
```

참고: https://github.com/WiseLibs/better-sqlite3/issues/146

## 4. 프로젝트 요구사항

### 과제 목표

- Activity Builder **2-1 ~ 2-5 단계** 및 **3-1 단계** 구현
- 비교과 활동 입력 UI 및 실시간 영향도 계산 기능 구현

---

### Activity Entry Component 요구사항

#### 1. 입력 폼 (Form Fields)

- **Activity name**
  - 필수 입력
  - 최대 50자
- **Category** (필수 선택)
  - Sports
  - Arts
  - Academic
  - Community Service
  - Leadership
  - Other
- **Tier** (필수 선택)
  - School
  - Regional
  - State
  - National
  - International
- **Description**
  - 필수 입력
  - 최대 150자
  - 실시간 글자 수 카운터 표시
- **Hours per week**
  - 숫자 입력
  - 0 ~ 40 범위 제한
- **Leadership position**
  - 체크박스

---

#### 2. 실시간 기능 (Real-Time Features)

- Description 입력 시 글자 수 실시간 표시
- 글자 수가 최대치에 가까워질 경우 색상 변경
- Impact Score 실시간 계산
  - Tier 점수
    - School: 1
    - Regional: 2
    - State: 3
    - National: 4
    - International: 5
  - Leadership 선택 시 +2
  - Hours per week > 10일 경우 +1
- Impact Score에 따라 Badge 색상 변경
  - Low: Gray
  - Medium: Yellow
  - High: Green
  - Exceptional: Purple

---

#### 3. Activity 리스트

- 입력된 활동을 카드(Card) 형태로 표시
- 각 카드에 포함될 정보
  - Activity name
  - Category badge
  - Tier
  - Impact score
  - Hours per week
- 각 카드에 Edit / Delete 버튼 제공
- 활동이 없을 경우 Empty state 메시지 표시

---

#### 4. Validation

- 필수 입력값이 비어 있을 경우 Submit 버튼 비활성화
- Description이 150자를 초과할 경우 에러 메시지 표시
- Hours per week 값이 0 ~ 40 범위를 벗어날 경우 검증 처리

---

### UI / UX 요구사항

- **shadcn/ui** 컴포넌트 사용
  - Button, Input, Select, Textarea, Card, Badge, Checkbox
- 다크 모드 지원
  - `isDark` prop 기반 스타일 처리
- 모바일 퍼스트 반응형 디자인
- Activity 추가/삭제 시 부드러운 전환 효과 적용
