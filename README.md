# Basketball Matching App (Next.js)

모바일 형식의 농구 매칭 프론트엔드입니다.

## 빠른 실행

```bash
npm run setup:local
npm run run:local
```

## 서버에서 클론이 안 될 때

### 1) `Permission denied (publickey)`

SSH 주소(`git@github.com:...`)로 클론했지만 서버에 GitHub SSH 키 권한이 없을 때 발생합니다.

해결 방법:
- 가장 간단: HTTPS 주소로 클론
- SSH를 계속 쓸 경우: 공개키 등록 후 `ssh -T git@github.com`로 인증 확인

### 2) `Repository not found`

HTTPS로 바꿨는데도 `Repository not found`가 뜨면 아래 중 하나입니다.

- owner/repo 이름 오타
- 저장소가 private인데 권한 없음
- 실제 저장소 이름이 다름

가장 정확한 방법은 **GitHub 저장소 페이지 → Code 버튼 → HTTPS URL 복사**입니다.

```bash
# 예시(placeholder): 반드시 실제 owner/repo로 바꿔서 사용
# git clone https://github.com/<owner>/<repo>.git
```

`dreamer` 계정이라면 보통 아래 형태입니다.

```bash
git clone https://github.com/dreamer/<repo>.git
```

> 참고: 이전에 안내된 `junsu3994/...` 주소는 예시가 잘못 들어간 값일 수 있으니,
> 반드시 본인 GitHub에서 복사한 URL을 사용하세요.

## 레포 페이지 확인 방법

현재 로컬 폴더가 어느 GitHub 레포와 연결됐는지 확인하려면:

```bash
git remote -v
```

- `origin  https://github.com/<owner>/<repo>.git (fetch)` 형태가 보이면,
  레포 페이지는 `https://github.com/<owner>/<repo>` 입니다.
- 아무것도 출력되지 않으면 아직 원격 레포가 연결되지 않은 상태입니다.

원격 연결이 없다면 먼저 생성/연결하세요:

```bash
git remote add origin https://github.com/<owner>/<repo>.git
git push -u origin main
```

## 특정 브랜치로 서버에 받기

사용자 요청값이 `codex/create-basketball-matching-app-with-next.js-8dxw27` 형태일 때,
아래 두 경우로 나눠서 확인하면 됩니다.

### 경우 A) 저장소명 자체가 `create-basketball-matching-app-with-next.js-8dxw27`

```bash
git clone https://github.com/codex/create-basketball-matching-app-with-next.js-8dxw27.git
cd create-basketball-matching-app-with-next.js-8dxw27
```

### 경우 B) 저장소는 `create-basketball-matching-app-with-next.js`이고 브랜치가 `8dxw27`

```bash
git clone -b 8dxw27 --single-branch https://github.com/codex/create-basketball-matching-app-with-next.js.git
cd create-basketball-matching-app-with-next.js
```

브랜치 존재 여부 먼저 확인:

```bash
git ls-remote --heads https://github.com/codex/create-basketball-matching-app-with-next.js.git
```

클론 후 실행:

```bash
npm run setup:local
npm run run:local
```

## 복붙용 명령어 (터미널)

아래를 그대로 순서대로 입력하세요.

```bash
# 1) 브랜치 존재 확인
git ls-remote --heads https://github.com/codex/create-basketball-matching-app-with-next.js.git

# 2) 8dxw27 브랜치만 클론
git clone -b 8dxw27 --single-branch https://github.com/codex/create-basketball-matching-app-with-next.js.git

# 3) 폴더 이동
cd create-basketball-matching-app-with-next.js

# 4) 설치/실행
npm run setup:local
npm run run:local
```

2번에서 `Repository not found`가 뜨면 아래로 시도:

```bash
git clone https://github.com/codex/create-basketball-matching-app-with-next.js-8dxw27.git
cd create-basketball-matching-app-with-next.js-8dxw27
npm run setup:local
npm run run:local
```

## 생 서버(처음)에서 설치부터 실행까지

아래는 **Ubuntu/Debian 기준**입니다.

```bash
# 0) 필수 패키지
sudo apt update
sudo apt install -y git curl

# 1) Node.js 20 설치 (NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 2) 버전 확인
node -v
npm -v

# 3) 프로젝트 받기 (브랜치 8dxw27)
git clone -b 8dxw27 --single-branch https://github.com/codex/create-basketball-matching-app-with-next.js.git
cd create-basketball-matching-app-with-next.js

# 4) 의존성 설치 + 실행
npm run setup:local
npm run run:local
```

### 접속

- 서버 내부에서: `http://localhost:3000`
- 외부(LAN)에서: `http://<서버IP>:3000` (보안그룹/방화벽 3000 포트 허용 필요)
- `scripts/run.sh`는 기본으로 `HOST=0.0.0.0`로 실행됩니다.

### 만약 clone 실패 시

```bash
# 레포명이 -8dxw27 인 경우
git clone https://github.com/codex/create-basketball-matching-app-with-next.js-8dxw27.git
cd create-basketball-matching-app-with-next.js-8dxw27
npm run setup:local
npm run run:local
```


### `Starting...` 후 바로 종료될 때

```bash
# 로그 남기면서 백그라운드 실행
npm run run:local:bg

# 로그 확인
tail -f .logs/next-dev.log
```

자주 원인:
- 포트 충돌 (`3000` 이미 사용 중)
- 의존성 설치 실패
- 런타임 에러로 Next 프로세스 종료
