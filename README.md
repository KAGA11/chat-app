后端:
我的后端是基于 Firebase 搭建的。我们选择 Firebase 是因为它提供完整的解决方案来处理用户身份验证、数据库存储、文件存储

### 为什么选择 Firebase 来搭建后端？
选择 Firebase 作为后端有几个关键的理由：
简化开发流程：开发者不需要自己管理服务器和数据库，这大大简化了开发过程。
高效的身份验证：Firebase Authentication 支持多种身份验证方式，如电子邮件/密码登录、社交账号登录等，简化了用户管理。
实时数据同步：适合聊天应用等需要实时更新的场景。
安全性：Firebase 提供了内置的安全规则，可以根据用户身份和数据类型控制对数据库和存储的访问权限。


### 你是怎么实现前后端通信，我开两个网页a网页发送消息 b网页是怎么知道的
1. 发送消息
在用户发送消息时，`sendMessage` 函数被触发，这里调用了 Firebase 的 API 来更新消息数据
    API 调用：通过 `updateDoc` 方法，将新消息对象添加到指定 `messagesId` 的文档中。这是一个直接的 API 调用，Firebase SDK 处理了与后端的通信。

2. 数据更新
当 `updateDoc` 被执行后，Firebase 的后端会将此更改写入其数据库中：

3. 实时推送
Firebase 使用 WebSocket 连接来实现实时数据推送：
- 长连接：当客户端（你的网页）连接到 Firebase 时，它建立了一个 WebSocket 连接。这个连接是持久的，可以用于双向通信。
- 实时双向通信
- 减少延迟 降低带宽消耗   不需要每次都重新建立连接

4. 接收更新
在客户端，使用 `onSnapshot` 方法订阅特定文档，以实时接收更新：

5. 前端更新

接收到新消息后，应用通过 React 的状态管理更新组件：


### 你的用户身份验证是怎么做的
用户身份验证是通过 Firebase Authentication 实现的，具体步骤如下：

用户注册登录：通过 Firebase 的 createUserWithEmailAndPassword 方法注册，将密码安全地哈希存储。调用 Firebase 的 signInWithEmailAndPassword 方法，如果匹配成功，Firebase 会返回一个 JSON Web Token（JWT），用于管理会话。

会话管理：JWT 被存储在客户端（如 indexDB），每次用户与 Firebase 的交互时，都会使用这个令牌来验证身份。
jwt只是一种令牌格式 包含三个部分：
Header：说明令牌的类型（JWT）和使用的签名算法（例如 HMAC SHA256）。
Payload：存储实际数据，比如用户 ID（uid）、创建时间、过期时间等。
Signature：使用 header 和 payload 生成的加密签名，确保令牌没有被篡改。


背后的OAuth2.0:
OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用