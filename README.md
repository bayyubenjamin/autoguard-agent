# AutoGuard — Autonomous Monitoring Agent

## Overview

AutoGuard is an autonomous AI agent that continuously monitors system health, detects anomalies, and automatically takes action without human intervention.

It is built using Cloudflare Workers and demonstrates a complete agent loop:
monitoring → decision → action.

## How It Works

* The agent checks a target API endpoint.
* If the system is healthy, no action is taken.
* If an issue is detected (ERROR/DOWN), the agent decides and triggers a response automatically.

## Key Features

* Real-time monitoring using Cloudflare Workers
* AI-powered decision making (with fallback logic)
* Autonomous response execution
* Timestamped system state output

## Demo

Live URL:
https://autoguard-agent.autoguard-agent.workers.dev

## Demo Video

(Insert your video link here)

## Tech Stack

* Cloudflare Workers
* Workers AI

## Notes

The agent includes fallback logic to ensure reliability even when AI is unavailable, making it more robust in real-world scenarios.
