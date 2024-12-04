import fetch from 'node-fetch';
import fs from 'fs';
import chalk from 'chalk';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { banner } from './utils/banner.js';
import { logger } from './utils/logger.js';

const getRandomQuality = () => {
    return Math.floor(Math.random() * (99 - 60 + 1)) + 60;
};

const getProxies = () => {
    return fs.readFileSync('proxy.txt', 'utf8').split('\n').map(line => line.trim()).filter(Boolean);
};

const getTokens = () => {
    return fs.readFileSync('token.txt', 'utf8').split('\n').map(line => line.trim()).filter(Boolean);
};

const shareBandwidth = async (token, proxy) => {
    try {
        const quality = getRandomQuality(); 
        const proxyAgent = new HttpsProxyAgent(proxy);

        const response = await fetch('https://api.openloop.so/bandwidth/share', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quality }),
            agent: proxyAgent,  
        });

        if (!response.ok) {
            throw new Error(`Failed to share bandwidth! Status: ${response.statusText}`);
        }

        const data = await response.json();

        const logBandwidthShareResponse = (response) => {
            if (response && response.data && response.data.balances) {
                const balance = response.data.balances.POINT;
                logger(`Bandwidth shared Message: ${chalk.yellow(response.message)} | Score: ${chalk.yellow(quality)} | Total Earnings: ${chalk.yellow(balance)}`);
            }
        };

        logBandwidthShareResponse(data);
    } catch (error) {
        logger('Error sharing bandwidth:', 'error', error.message);
    }
};

const shareBandwidthForAllTokens = async () => {
    const tokens = getTokens();
    const proxies = getProxies();

    if (tokens.length !== proxies.length) {
        logger('The number of tokens and proxies do not match!', 'error');
        return;
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const proxy = proxies[i];

        try {
            await shareBandwidth(token, proxy);
        } catch (error) {
            logger(`Error processing token: ${token}, Error: ${error.message}`, 'error');
        }
    }
};

const main = () => {
    logger(banner, 'debug');
    logger('Starting bandwidth sharing each minute...');
    shareBandwidthForAllTokens(); 
    setInterval(shareBandwidthForAllTokens, 60 * 1000); 
};

main();
