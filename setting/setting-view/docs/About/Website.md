# Website Deployement

## :page_facing_up: Website

이 웹사이트는 최신 정적 웹사이트 생성기인 [Docusaurus 2](https://docusaurus.io/) 를 사용하여 구축되었습니다

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

이 명령은 로컬의 개발 서버를 시작하고 브라우저 창을 엽니다. 대부분의 변경 사항은 서버를 다시 시작하지 않고도 실시간으로 반영됩니다.

### Build

```
$ yarn build
```

이 명령은 `build` 디렉토리에 정적 콘텐츠를 생성하고 정적 콘텐츠 호스팅 서비스를 사용하여 제공할 수 있습니다.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

호스팅을 위해 GitHub 페이지를 사용하는 경우 이 명령은 웹사이트를 구축하고 `gh-pages` 브랜치로 푸시하는 편리한 방법입니다.
