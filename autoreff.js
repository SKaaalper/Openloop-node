import fetch from 'node-fetch';
import readline from 'readline';
import fs from 'fs';
import { logger } from './utils/logger.js';
import { banner } from './utils/banner.js';
import Mailjs from '@cemalgnlts/mailjs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
};

const registerUser = async (name, email, password, inviteCode) => {
    try {
        const registrationPayload = { name, username: email, password, inviteCode };
        const registerResponse = await fetch('https://api.openloop.so/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationPayload),
        });

        if (!registerResponse.ok) {
            logger(`Registration failed! Status: ${registerResponse.status}`, 'error');
        }

        const registerData = await registerResponse.json();
        logger('Registration:', 'success', registerData.message);

        await loginUser(email, password);
    } catch (error) {
        logger('Error during registration:', 'error', error.message);
    }
};

const loginUser = async (email, password) => {
    try {
        const loginPayload = { username: email, password };

        const loginResponse = await fetch('https://api.openloop.so/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginPayload),
        });

        if (!loginResponse.ok) {
            throw new Error(`Login failed! Status: ${loginResponse.status}`);
        }

        const loginData = await loginResponse.json();
        logger('Login successful get token:', 'success', loginData.data.accessToken);

        const accessToken = loginData.data.accessToken;

        fs.appendFileSync('token.txt', accessToken + '\n', 'utf8');
        logger('Access token saved to token.txt');
    } catch (error) {
        logger('Error during login:', 'error', error.message);
    }
};

const mailjs = new Mailjs();

// Main Function
async function manageMailAndRegister() {
    try {
        logger(banner, 'debug');

        const input = await askQuestion('How many reff to create: ');
        const accountCount = parseInt(input, 10);
        if (isNaN(accountCount) || accountCount <= 0) throw new Error('Invalid account count.');

        const ref = await askQuestion('Use my referral code: (y/N): ');
        const referralCode = ref.toLowerCase() === 'n'
            ? await askQuestion('Enter referral code: ')
            : 'ol985c1beb';

        logger(`Register Using Referral code: ${referralCode}`, 'info');

        for (let i = 0; i < accountCount; i++) {
            try {
                const account = await mailjs.createOneAccount();
                const email = account.data.username;
                const password = account.data.password;
                const name = email;
                if (email === undefined) {
                    i--;
                    continue;
                }
                logger(`Creating account #${i + 1} - Email: ${email}`, 'debug');

                await registerUser(name, email, password, referralCode);

                fs.appendFileSync('accounts.txt', `Email: ${email}, Password: ${password}` + '\n', 'utf8');
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            } catch (error) {
                logger(`Error with account #${i + 1}: ${error.message}`, 'error');
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            }
            
        }
    } catch (error) {
        logger(`Error: ${error.message}`, 'error');
    } finally {
        rl.close();
    }
}

manageMailAndRegister();
