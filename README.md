# mention-to-slack

## 概要
GitHub上でメンションするとSlackのユーザ名に置換し、Slackの指定のチャンネルに通知します。
また、PRでreviewerを設定した時もSlackに通知します

![web 1920 1](https://user-images.githubusercontent.com/1859021/43616998-5682358a-96fa-11e8-95fa-75641d4e2089.png)


## 準備
- node 8.xのインストール

```shell
$ git clone {this.repository.url}
$ cd path/to/this.repository.name
$ npm install
```

### AWS
Serverless Frameworkを使用し、AWS Lambda上で動作するものです。  
以下を参照し、AWSとServerless Frameworkの設定を行ってください。  
[Serverless Framework \- AWS Lambda Guide \- Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)


### Slack Tokenの設定
Slackに通知するためにTokenが必要です

1. SlackでTokenを生成する(xoxbからはじまるやつ)
    - {your-teamname}.slack.com/apps/manage/custom-integrations のBotsから生成できる
2. 上記のTokenをAWS Systems Managerのパラメーターストアに保存する
    - 名前は `SLACK_TOKEN` で。タイプは `文字列` で生成
    
### account.jsonの編集
- `accounts.json` のサンプルを参考にGitHubアカウントとSlackアカウントのマッピングを行う
- SlackアカウントはIDで記述する
    - `<@{id}>` の形式
    - IDは [ここ](https://api.slack.com/methods/users.list/test) で調べることができる

### デプロイ
```shell
$ npm run deploy
```

### GitHubの設定
↑でデプロイするとendpointがログに表示されるのでそれをメンションを通知したいリポジトリのwebhookに設定します

1. GitHub repository → settings → Webhooks
1. `Payload URL` にendpointを入力
    - この時、通知したいSlackのChannelIDをクエリパラメータにつける
    - 例) https://xxxx.amazonaws.com/dev/to-slack/github?channelId=C14G28YV8
    - ChannelIdは [ここ](https://api.slack.com/methods/channels.list/test)で調べることができる
1. `Content Type` は `application/json`
1. `Let me select individual events.` にして以下にチェック、保存
    - Issue comments
    - Issues
    - Pull requests
    - Pull request reviews
    - Pull request review comments

## Development
以下のコマンドでlocalで起動できます。

```
$ export SLACK_TOLEN=your_token
$ npm start
```
