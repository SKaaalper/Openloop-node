import { banner } from './utils/banner.js';
import { logger } from './utils/logger.js';
import fetch from 'node-fetch';
import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
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
        const accessToken = loginData.data.accessToken;
        logger('Login successful get Token:', 'success', accessToken);
        
        fs.writeFileSync('token.txt', accessToken + '\n', 'utf8');
        logger('Access token saved to token.txt');
    } catch (error) {
        logger('Error during login:', 'error', error.message);
    }
};

const registerUser = async () => {
    try {
        const email = await askQuestion('Enter your email: ');
        const name = email;
        const password = await askQuestion('Enter your password: ');
        const inviteCode = 'ol41fe134b'; 

        const registrationPayload = { name, username: email, password, inviteCode };
        const registerResponse = await fetch('https://api.openloop.so/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationPayload),
        });

        if (registerResponse.status === 401) {
            logger('Email already exist. Attempting to login...');
            await loginUser(email, password);
            return;
        }

        if (!registerResponse.ok) {
            throw new Error(`Registration failed! Status: ${registerResponse.status}`);
        }

        const registerData = await registerResponse.json();
        logger('Registration successful:','success', registerData.message);

        await loginUser(email, password);
    } catch (error) {
        logger('Error during registration:', 'error', error.message);
    } finally {
        rl.close();
    }
};

registerUser();
