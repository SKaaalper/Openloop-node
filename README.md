# **OpenLoop Decentralized bandwidth**


![Banner](https://github.com/SKaaalper/Openloop-node/blob/main/OpenLoopMap.DdU9p2P0.png)


# **Decentralized bandwidth Get paid for sharing your unused Internet From Passive Internet to Active Rewards**


## *Openloop Official Account*

- **Website** https://openloop.so/
- **Twitter** [@openloop_so](https://x.com/openloop_so)
- **Telegram** [@openloop_updates](https://t.me/openloop_updates)
- **discord** https://discord.com/invite/75qBRaUczN


## **Features**

- *Register Accounts*
- *Load Existing Tokens: Load pre-existing tokens if you already have account.*
- *Auto Ping*
- *Auto Reff*
- *Support Multi Accounts*
- *Support Proxy*


## **Requirements**

- **Node.js**: ***Ensure you have Node.js installed.***
- **npm**: ***Ensure you have npm installed.***


### ***make sure you have same number account and proxy***


- if you already have account you can put `access-token` to `token.txt`,

- put your proxy in file `proxy.txt` format `http://username:pass@ip:port`


## **Free proxy for 7 days Trial**

- Go here [7Days proxy free trial](https://dashboard.proxyscrape.com/v2/services/premium/ip-authentication/d0a61512-5605-46df-8653-7e7a3d26c830)
- Create account
- Authenticate 1 IP you use for the Proxy
- For Cloud `curl http://ipinfo.io/` Copy and paste it into your machine
- For Windows `http://ipinfo.io/` Copy and paste it into your browser
- Copy your IP add then authenticate

- Register here: [Openloop](https://chromewebstore.google.com/detail/openloopso-sentry-node-ex/effapmdildnpkiaeghlkicpfflpiambm)
- My Invite Code: `ol985c1beb`


## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/SKaaalper/Openloop-node.git && cd openloop
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. create file for `proxy.txt`
  ```
  nano proxy.txt
  ```
**Take note: 1 ip for 1 token only!**

4. if you already have account you can put `access-token` to `token.txt`
   - Go to `openloop` extension click mouse 2 and click `inspect`
   - Go to `network` and `Fetch/XHR` refresh and click profile copy the `bearer` token start with `eyJhbGciOiJIUzI1Nsah`
   - Create `token.txt` file and save

5. Setup to create accounts and get Tokens:
   ```bash
   npm run setup
   ```
   - Copy the token and save it to `token.txt`

6. Create file for `token.txt`
   ```
   nano token.txt
   ```
   - ctrl + o to `save`
   - ctrl + x to `exit`

7. Open Screen Session
   ```
   screen -S openloop
   ```
   
8. Run The Script:
   ```bash
   npm run start
   ```
   
8. Auto reff using temp mail
   ```bash
   npm run autoreff
   ```

   ![Banner](https://github.com/SKaaalper/Openloop-node/blob/main/123.png)
   
![MIT License](https://img.shields.io/badge/License-MIT-yellow)

   This project is licensed under the [MIT License.](https://github.com/SKaaalper/Openloop-node/blob/main/LICENSE)
