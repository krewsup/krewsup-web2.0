import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import logo from './assets/logobabes.png';
import rtdPhoto from './assets/rtd.jpg';
import utPhoto from './assets/ut.jpg';
import kdaPhoto from './assets/kda.jpg';
import rtdLogo from './assets/rtdlogo.jpg';
import utLogo from './assets/utlogo.jpg';
import kdaLogo from './assets/kdalogo.jpg';

const GlobalCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    :root {
      --primary-color: #fff;
      --secondary-color: #000;
      --accent-color: #fff;
      --accent-color-rgb: 255, 255, 255;
      --bg-color: #050505;
      --cta-color: #00A3FF;
      --cta-color-rgb: 0, 163, 255;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Space Grotesk', sans-serif;
        color: var(--primary-color);
    }
    body {
        background-color: var(--bg-color);
        overflow-x: hidden;
        min-height: 100vh;
        cursor: none;
    }
    body.modal-open {
        overflow: hidden;
    }
    .gradient-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(
        600px circle at var(--mouse-x) var(--mouse-y),
        rgba(255, 255, 255, 0.08),
        transparent 80%
      );
      z-index: -2;
      transition: background 0.2s linear;
    }
    #bg-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
    }
    header {
        position: fixed;
        top: 20px;
        left: 0;
        width: 100%;
        z-index: 10;
        display: flex;
        justify-content: center;
        transition: top 0.3s ease-in-out;
    }
    nav {
        display: flex;
        align-items: center;
        background: rgba(30, 30, 30, 0.6);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 99px;
        padding: 8px 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease-in-out;
    }
    .logo img {
        width: 130px;
        height: 52px;
        transition: transform 0.4s ease-in-out;
    }
    .logo img:hover {
        transform: scale(1.08) rotate(-2deg);
    }
    .nav-links {
        display: flex;
        gap: 30px;
        margin-left: 25px;
    }
    .nav-links a {
        text-decoration: none;
        font-size: 14px;
        text-transform: uppercase;
        position: relative;
        transition: color 0.3s ease, transform 0.3s ease;
        padding: 5px 0;
        cursor: none;
    }
    .nav-links a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent-color);
        transition: width 0.4s ease-in-out;
    }
    .nav-links a:hover {
        color: var(--accent-color);
        transform: translateY(-2px);
    }
    .nav-links a:hover::after {
        width: 100%;
    }
    .mobile-menu-btn {
        display: none;
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 24px;
        padding: 0 15px;
    }
    .mobile-nav {
        display: none;
        position: fixed;
        top: 100px;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.95);
        padding: 20px;
        flex-direction: column;
        gap: 20px;
        z-index: 9;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .mobile-nav a {
        text-decoration: none;
        font-size: 16px;
        text-transform: uppercase;
        color: #fff;
        transition: color 0.3s ease;
    }
    .mobile-nav a:hover {
        color: var(--accent-color);
    }
    .page {
        padding: 150px 0 100px;
        position: relative;
        z-index: 2;
    }
    .hero {
        min-height: calc(100vh - 250px);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        text-align: center;
        overflow: hidden;
    }
    #hero-canvas-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .hero-content {
        position: relative;
        z-index: 2;
        padding: 40px;
        background: rgba(5, 5, 5, 0.2);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        max-width: 90%;
    }
    @keyframes fadeInHero {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hero-content > *:not(.hero-button-grid) {
        opacity: 0;
        animation: fadeInHero 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }
    .hero-content h1 {
        font-size: clamp(40px, 10vw, 120px);
        font-weight: 700;
        line-height: 1.1;
        text-transform: uppercase;
        margin-bottom: 30px;
        text-shadow: 0 0 30px rgba(var(--accent-color-rgb), 0.3);
        letter-spacing: -0.02em;
    }
    .hero-content h1 span {
        border-bottom: 7px solid var(--accent-color);
        color: var(--accent-color);
        padding-bottom: 5px;
    }
    .hero-content .tagline {
        font-size: clamp(18px, 4vw, 28px);
        margin: 0 auto 40px;
        max-width: 600px;
        opacity: 0.9;
        font-weight: 500;
        animation-delay: 0.2s;
    }
    .hero-content .description {
        font-size: 18px;
        line-height: 1.7;
        opacity: 0.8;
        max-width: 600px;
        margin: 0 auto 40px;
        animation-delay: 0.4s;
    }
    .hero-button-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 40px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        animation: fadeInHero 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        animation-delay: 0.6s;
        opacity: 0;
    }
    .btn {
        padding: 15px 35px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        text-transform: uppercase;
        position: relative;
        overflow: hidden;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #host-btn {
      background: #fff;
      color: #000;
      border: 1px solid #fff;
    }
    #host-btn:hover {
      background: transparent;
      color: #fff;
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    #gig-btn {
      background: #fff;
      color: #000;
      border: 1px solid #fff;
    }
    #gig-btn:hover {
      background: transparent;
      color: #fff;
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    .app-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px 25px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        position: relative;
        overflow: hidden;
        justify-content: flex-start;
    }
    .hero-button-grid .btn,
    .hero-button-grid .app-btn {
        height: 68px;
        width: 100%;
        margin: 0;
        box-sizing: border-box;
    }
    .hero-button-grid .btn {
        padding: 15px 20px;
    }
    .hero-button-grid .app-btn {
        padding: 0 25px;
    }
    .section-title {
        font-size: 48px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 80px;
        text-transform: uppercase;
        transition: letter-spacing 0.3s ease, text-shadow 0.3s ease;
        position: relative;
        display: inline-block;
        color: #fff;
    }
    .section-title:after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: var(--accent-color);
        border-radius: 2px;
        transition: width 0.4s ease-in-out;
    }
    .section-title:hover:after {
        width: 100%;
    }
    .section-title:hover {
        letter-spacing: 3px;
        text-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.4);
    }
    .title-container {
        text-align: center;
        margin-bottom: 80px;
    }
    .card-icon {
        font-size: 40px;
        margin-bottom: 25px;
        display: inline-block;
        transition: transform 0.4s ease-in-out;
    }
    .card-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    .card-desc {
        font-size: 16px;
        line-height: 1.8;
        opacity: 0.8;
    }
    footer {
        padding: 80px 0 40px;
        background: rgba(10, 10, 10, 0.8);
        position: relative;
        z-index: 2;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        overflow: hidden;
    }
    .footer-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
        position: relative;
    }
    .footer-company {
        position: relative;
    }
    .footer-company h3 {
        font-size: 28px;
        margin-bottom: 20px;
        white-space: nowrap;
        color: var(--accent-color);
    }
    .footer-company p {
        opacity: 0.8;
        margin-bottom: 30px;
        line-height: 1.6;
    }
    .footer-links-group h4 {
        font-size: 20px;
        margin-bottom: 25px;
        position: relative;
        display: inline-block;
    }
    .footer-links-group h4::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 50%;
        height: 2px;
        background: var(--accent-color);
        transition: width 0.3s ease-in-out;
    }
    .footer-links-group:hover h4::after {
        width: 100%;
    }
    .footer-links {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .footer-links a {
        text-decoration: none;
        font-size: 16px;
        opacity: 0.7;
        transition: opacity 0.3s ease, color 0.3s ease, padding-left 0.3s ease;
        cursor: pointer;
    }
    .footer-links a:hover {
        opacity: 1;
        color: var(--accent-color);
        padding-left: 8px;
    }
    .footer-social {
        display: flex;
        gap: 20px;
        margin-top: 30px;
    }
    .footer-social a {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
        text-decoration: none;
        font-size: 20px;
    }
    .footer-social a:hover {
        transform: scale(1.15) translateY(-3px);
        box-shadow: 0 0 15px rgba(var(--accent-color-rgb),0.6);
        background: var(--accent-color);
        color: #000;
    }
    .copyright {
        text-align: center;
        font-size: 14px;
        opacity: 0.6;
        margin-top: 60px;
        position: relative;
        z-index: 1;
    }
    .footer-crafted-line {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        opacity: 0.5;
        letter-spacing: 0.5px;
    }
    .steps {
        margin: 60px 0;
    }
    .step {
        display: flex;
        margin-bottom: 50px;
        position: relative;
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.6s ease-in-out;
    }
    .step.visible {
        opacity: 1;
        transform: translateX(0);
    }
    .step-number {
        font-size: 120px;
        font-weight: 700;
        color: rgba(var(--accent-color-rgb), 0.2);
        margin-right: 30px;
        line-height: 1;
        transition: color 0.3s ease-in-out;
    }
    .step:hover .step-number {
        color: rgba(var(--accent-color-rgb), 0.4);
    }
    .step-content {
        padding-top: 20px;
    }
    .step-title {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 15px;
    }
    .step-desc {
        font-size: 18px;
        line-height: 1.6;
        max-width: 600px;
    }
    .step::after {
        content: '';
        position: absolute;
        left: 25px;
        top: 120px;
        height: calc(100% - 60px);
        width: 2px;
        background: linear-gradient(to bottom, rgba(var(--accent-color-rgb), 0.3), transparent);
    }
    .step:last-child::after {
        display: none;
    }
    .testimonials-section {
        padding: 80px 0;
    }
    .testimonial-pair {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5%;
        margin-bottom: 80px;
        opacity: 0;
        transition: opacity 0.8s ease-out;
    }
    .testimonial-pair.visible {
        opacity: 1;
    }
    .testimonial-card-unique {
        flex: 1;
        max-width: 45%;
        padding: 30px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        background: rgba(30, 30, 30, 0.4);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .testimonial-pair.visible .testimonial-card-unique {
        transform: translateY(0) scale(1);
    }
    .business-testimonial {
        border-left: 4px solid var(--accent-color);
        transform: translateY(40px) scale(0.95);
    }
    .krew-testimonial {
        border-right: 4px solid var(--accent-color);
        transform: translateY(40px) scale(0.95);
    }
    .testimonial-card-unique:hover {
        transform: translateY(-10px) scale(1.03);
        box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        border-color: rgba(var(--accent-color-rgb), 0.3);
    }
    .testimonial-text-unique {
        font-size: 16px;
        line-height: 1.7;
        margin-bottom: 20px;
        font-style: italic;
        opacity: 0.9;
    }
    .testimonial-author-unique {
        display: flex;
        align-items: center;
    }
    .author-avatar-unique {
        width: 45px;
        height: 45px;
        border-radius: 8px;
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .text-avatar {
        background: var(--accent-color);
        color: #000;
        font-weight: 700;
        font-size: 18px;
    }
    .logo-avatar {
        background: #fff;
        padding: 0;
        box-sizing: border-box;
    }
    .logo-avatar img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .author-name-unique {
        font-weight: 600;
        font-size: 16px;
    }
    .author-role-unique {
        opacity: 0.7;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .testimonial-category {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.6;
        margin-bottom: 15px;
    }
    .faq {
        margin: 60px 0;
    }
    .faq-item {
        margin-bottom: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.4s ease-in-out;
        background: rgba(30, 30, 30, 0.6);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }
    .faq-item:hover {
        border-color: rgba(255, 255, 255, 0.2);
    }
    .faq-question {
        padding: 20px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    .faq-question:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--accent-color);
    }
    .faq-question::after {
        content: '+';
        font-size: 24px;
        transition: transform 0.3s ease-in-out;
    }
    .faq-question.active::after {
        content: '-';
        transform: rotate(180deg);
    }
    .faq-answer {
        padding: 0 20px;
        max-height: 0;
        overflow: hidden;
        transition: all 0.4s ease-in-out;
    }
    .faq-answer.active {
        padding: 0 20px 20px;
        max-height: 500px;
    }
    .faq-answer-content {
        line-height: 1.6;
        opacity: 0.8;
    }
    .cursor {
        width: 25px;
        height: 25px;
        border: 2px solid #fff;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: width 0.2s ease, height 0.2s ease, border 0.2s ease, opacity 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
    }
    .cursor-dot {
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }
    .cursor.grow {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
    }
    .app-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        border-color: rgba(var(--accent-color-rgb), 0.4);
        background: rgba(var(--accent-color-rgb), 0.1);
    }
    .app-btn-icon {
        font-size: 18px;
    }
    .app-btn-content {
        display: flex;
        flex-direction: column;
    }
    .app-btn-label {
        font-size: 10px;
        opacity: 0.8;
    }
    .app-btn-name {
        font-size: 14px;
        font-weight: 600;
    }
    .app-btn-tooltip {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.3s ease-in-out;
        font-weight: 600;
        text-align: center;
        padding: 0 10px;
        font-size: 12px;
    }
    .app-btn:hover .app-btn-tooltip {
        opacity: 1;
        transform: translateY(0);
    }
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        backdrop-filter: blur(10px);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.4s ease, visibility 0.4s ease;
    }
    .modal.show {
        opacity: 1;
        visibility: visible;
    }
    .modal-content {
        background: rgba(20, 20, 20, 0.8);
        width: 90%;
        max-width: 600px;
        padding: 40px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border-radius: 12px;
        position: relative;
        animation: modalFadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
        box-shadow: 0 0 50px rgba(var(--accent-color-rgb), 0.1);
    }
    .modal.show .modal-content {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    @keyframes modalFadeIn {
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 28px;
        cursor: pointer;
        transition: transform 0.3s ease, color 0.3s ease;
    }
    .modal-close:hover {
        transform: rotate(90deg) scale(1.2);
        color: var(--accent-color);
    }
    .modal-title {
        font-size: 36px;
        margin-bottom: 20px;
        text-transform: uppercase;
        color: var(--accent-color);
    }
    .modal-subtitle {
        font-size: 18px;
        margin-bottom: 30px;
        opacity: 0.8;
    }
    .feature-list {
        margin-bottom: 30px;
    }
    .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .feature-icon {
        margin-right: 15px;
        font-size: 20px;
        color: var(--accent-color);
    }
    .feature-text {
        font-size: 16px;
        line-height: 1.5;
    }
    .ripple {
        position: fixed;
        border-radius: 50%;
        border: 2px solid rgba(var(--accent-color-rgb), 0.5);
        background: transparent;
        transform: scale(0);
        animation: ripple 1s ease-out;
        pointer-events: none;
        z-index: 999;
    }
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    .partners-section {
        overflow: hidden;
    }
    .partners-marquee-container {
        width: 100vw;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 60px;
        padding: 40px 0;
    }
    .partners-marquee-container::before,
    .partners-marquee-container::after {
        content: '';
        position: absolute;
        top: 0;
        width: 150px;
        height: 100%;
        z-index: 2;
    }
    .partners-marquee-container::before {
        left: 0;
        background: linear-gradient(to right, var(--bg-color), transparent);
    }
    .partners-marquee-container::after {
        right: 0;
        background: linear-gradient(to left, var(--bg-color), transparent);
    }
    .partners-marquee {
        display: flex;
        width: fit-content;
        animation: scroll 15s linear infinite;
    }
    .partner-wrapper {
        flex-shrink: 0;
        margin: 0 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
    .partner-item {
        width: 220px;
        height: 300px;
        position: relative;
        cursor: none;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: #111;
        transition: transform 0.4s ease, box-shadow 0.4s ease;
    }
    .partner-wrapper:hover .partner-item {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .partner-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.8s ease;
    }
    .partner-wrapper:hover .partner-photo {
        transform: scale(1.05);
    }
    .partner-logo {
        position: relative;
        width: 60px;
        height: 60px;
        object-fit: contain;
        background: #000;
        border-radius: 8px;
        padding: 5px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .partner-name {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 20px 15px 15px;
        font-size: 14px;
        font-weight: 600;
        text-align: left;
        background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .partner-wrapper:hover .partner-name {
        opacity: 1;
        transform: translateY(0);
    }
    .partners-marquee-container:hover .partners-marquee {
        animation-play-state: paused;
    }
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .waitlist-section {
        margin-top: 120px;
        margin-bottom: 120px;
        padding: 60px 40px;
        background: rgba(15, 15, 15, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        text-align: center;
        box-shadow: 0 0 50px rgba(0,0,0,0.5);
        position: relative;
        overflow: hidden;
    }
    .waitlist-section > * {
        position: relative;
        z-index: 2;
    }
    .waitlist-section::before {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        left: -150%;
        width: 75%;
        height: 100%;
        background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%);
        transform: skewX(-25deg);
        animation: waitlist-shine 4s linear infinite;
    }
    .waitlist-title {
        font-size: 36px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: var(--primary-color);
        text-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.3);
    }
    .waitlist-subtitle {
        font-size: 18px;
        color: var(--primary-color);
        opacity: 0.9;
        max-width: 600px;
        margin: 20px auto 40px;
    }
    .waitlist-btn {
        display: inline-block;
        padding: 18px 40px;
        background-image: linear-gradient(145deg, rgba(35, 35, 35, 0.9), rgba(15, 15, 15, 0.8));
        color: var(--primary-color);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: none;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }
    .waitlist-btn:hover {
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(var(--accent-color-rgb), 0.3);
      border-color: rgba(255, 255, 255, 0.4);
    }
    @keyframes waitlist-shine {
        from {
            left: -100%;
        }
        to {
            left: 150%;
        }
    }
    .card-stack-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
        margin-top: -20px;
    }
    .card-stack {
        position: relative;
        width: 100%;
        max-width: 480px;
        height: 380px;
    }
    .stack-card {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        will-change: transform, opacity;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
        cursor: default;
        background: rgba(30, 30, 30, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 40px;
        border-radius: 12px;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .stack-card.top {
        transform: translateY(0) scale(1);
        opacity: 1;
        z-index: 3;
    }
    .stack-card.next {
        transform: translateY(-25px) scale(0.95);
        opacity: 1;
        z-index: 2;
    }
    .stack-card.third {
        transform: translateY(-50px) scale(0.9);
        opacity: 1;
        z-index: 1;
    }
    .stack-card.hidden {
        transform: translateY(-50px) scale(0.9);
        opacity: 0;
        z-index: 0;
        pointer-events: none;
    }
    .exiting-right {
        transform: translate(50vw, 30px) rotate(20deg) !important;
        opacity: 0 !important;
        z-index: 4;
        transition: transform 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.5s ease-out !important;
    }
    .exiting-left {
        transform: translate(-50vw, 30px) rotate(-20deg) !important;
        opacity: 0 !important;
        z-index: 4;
        transition: transform 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.5s ease-out !important;
    }
    .card-stack-controls button {
        padding: 12px 30px;
        background: #fff;
        color: #000;
        border: 1px solid #fff;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 200px;
        text-align: center;
    }
    .card-stack-controls button:hover:not(:disabled) {
        background: transparent;
        color: #fff;
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    }
    .card-stack-controls button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    @media (max-width: 768px) {
        header {
            top: 0;
            padding: 10px;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        nav {
            justify-content: space-between;
            width: 100%;
            background: none;
            backdrop-filter: none;
            border: none;
            border-radius: 0;
            padding: 0;
            box-shadow: none;
        }
        .hero-content h1 {
            word-break: break-word;
            line-height: 1.2;
        }
        .hero-content h1 span {
            display: inline-block;
        }
        .hero-content {
          padding: 20px;
        }
        .hero-button-grid {
            grid-template-columns: 1fr;
            max-width: 90%;
            gap: 15px;
        }
        .nav-links { display: none; }
        .mobile-menu-btn { display: block; position: static; }
        .mobile-nav.active { display: flex; }
        .logo img { width: 120px; height: 50px; }
        .footer-container { text-align: center; }
        .footer-social { justify-content: center; }
        .footer-company h3 { font-size: 24px; }
        .step { flex-direction: column; }
        .step-number { font-size: 80px; margin-right: 0; margin-bottom: 10px; }
        .step::after { display: none; }
        .cursor, .cursor-dot { display: none; }
        body { cursor: auto; }
        .modal-content { padding: 30px; }
        .modal-title { font-size: 28px; }
        .partner-wrapper {
            margin: 0 15px;
        }
        .partner-item {
            width: 180px;
            height: 240px;
        }
        .waitlist-title {
            font-size: 28px;
        }
        .waitlist-section {
            margin-bottom: 80px;
        }
        .testimonial-pair {
            flex-direction: column !important;
            gap: 30px;
        }
        .testimonial-card-unique {
            max-width: 100%;
        }
        .card-stack {
            height: 420px;
            max-width: 90vw;
        }
        .stack-card {
            padding: 30px 20px;
        }
        .stack-card.next {
            transform: translateY(-20px) scale(0.95);
        }
        .stack-card.third {
            transform: translateY(-40px) scale(0.9);
        }
    }
`;

const useIntersectionObserver = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (containerRef.current) {
                    observer.unobserve(containerRef.current);
                }
            }
        }, options);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [containerRef, options]);

    return [containerRef, isVisible];
};

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 8000));
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        let animationFrameId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            resizeCanvas();
            initParticles();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    return <canvas id="bg-canvas" ref={canvasRef}></canvas>;
};

const GradientBackground = () => {
    useEffect(() => {
        const updateMousePosition = (ev) => {
            if (!document.body) return;
            const { clientX, clientY } = ev;
            document.body.style.setProperty('--mouse-x', `${clientX}px`);
            document.body.style.setProperty('--mouse-y', `${clientY}px`);
        };
        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        }
    }, []);
    return <div className="gradient-bg"></div>;
};

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useRef(window.innerWidth / 2);
    const mouseY = useRef(window.innerHeight / 2);
    const dotX = useRef(window.innerWidth / 2);
    const dotY = useRef(window.innerHeight / 2);
    const requestRef = useRef(null);

    useEffect(() => {
        const onMouseMove = (e) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
        };

        const animate = () => {
            const lagFactor = 5;

            if (cursorRef.current) {
                cursorRef.current.style.top = `${mouseY.current}px`;
                cursorRef.current.style.left = `${mouseX.current}px`;
            }

            dotX.current += (mouseX.current - dotX.current) / lagFactor;
            dotY.current += (mouseY.current - dotY.current) / lagFactor;

            if (dotRef.current) {
                dotRef.current.style.top = `${dotY.current}px`;
                dotRef.current.style.left = `${dotX.current}px`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        animate();

        const onMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a, button, .partner-wrapper')) {
                setIsHovering(true);
            }
        };

        const onMouseOut = (e) => {
             if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a, button, .partner-wrapper')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className={`cursor ${isHovering ? 'grow' : ''}`}></div>
            <div ref={dotRef} className="cursor-dot"></div>
        </>
    );
};

const RippleEffect = () => {
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const newRipple = {
                x: e.clientX,
                y: e.clientY,
                id: Date.now()
            };
            setRipples(current => [...current, newRipple]);

            setTimeout(() => {
                setRipples(current => current.filter(r => r.id !== newRipple.id));
            }, 1000);
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <>
            {ripples.map(ripple => (
                <div key={ripple.id} className="ripple" style={{ left: ripple.x, top: ripple.y }}></div>
            ))}
        </>
    );
};

const Header = ({ onNavigate, activePage, onToggleMobileNav }) => {
    const navItems = ['Home', 'Why Us', 'How It Works', 'Our Partners', 'Customers', 'FAQ'];
    const pageIds = ['home-page', 'why-us-page', 'how-page', 'partners-page', 'customers-page', 'faq-page'];

    const [logoSrc, setLogoSrc] = useState(logo);

    return (
        <header>
            <nav>
                <div className="logo">
                    <img
                        src={logoSrc}
                        alt="KrewsUp Logo"
                        onError={() => setLogoSrc('https://via.placeholder.com/150x60?text=KrewsUp')}
                    />
                </div>
                <div className="nav-links">
                    {navItems.map((item, index) => (
                        <a
                            key={item}
                            href={`#${pageIds[index]}`}
                            className={activePage === pageIds[index] ? 'active' : ''}
                            onClick={(e) => { e.preventDefault(); onNavigate(pageIds[index]); }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
                <button className="mobile-menu-btn" onClick={onToggleMobileNav}>☰</button>
            </nav>
            <MobileNav navItems={navItems} pageIds={pageIds} onNavigate={onNavigate} />
        </header>
    );
};

const MobileNav = ({ navItems, pageIds, onNavigate }) => {
    return (
        <div className="mobile-nav">
            {navItems.map((item, index) => (
                <a
                    key={item}
                    href={`#${pageIds[index]}`}
                    onClick={(e) => { e.preventDefault(); onNavigate(pageIds[index]); }}
                >
                    {item}
                </a>
            ))}
        </div>
    );
};

const Modal = ({ id, title, subtitle, features, show, onClose }) => (
    <div id={id} className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={onClose}>×</span>
            <h3 className="modal-title">{title}</h3>
            {subtitle && <p className="modal-subtitle">{subtitle}</p>}
            <div className="feature-list">
                {features.map((feature, index) => (
                    <div key={index} className="feature-item">
                        {feature.icon && <span className="feature-icon">{feature.icon}</span>}
                        <span className="feature-text">{feature.text}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const AnimatedCard = ({ children, className }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
        <div ref={ref} className={`${className} ${isVisible ? 'visible' : ''}`}>
            {children}
        </div>
    );
};

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="faq-item">
            <div className={`faq-question ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {question}
            </div>
            <div className={`faq-answer ${isOpen ? 'active' : ''}`}>
                <div className="faq-answer-content">{answer}</div>
            </div>
        </div>
    );
};

const TinderCardStack = ({ items, buttonText }) => {
    const [cards, setCards] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [exitDirection, setExitDirection] = useState('right');

    useEffect(() => {
        const initialCards = items.map((item, index) => {
            let status;
            if (index === 0) status = 'top';
            else if (index === 1) status = 'next';
            else if (index === 2) status = 'third';
            else status = 'hidden';
            return { ...item, id: `${item.title}-${index}`, status };
        });
        setCards(initialCards);
    }, [items]);

    const handleNext = () => {
        if (isAnimating || cards.length === 0) return;
        setIsAnimating(true);

        setCards(prev => {
            const newCards = [...prev];
            newCards[0].status = `exiting-${exitDirection}`;
            return newCards;
        });

        setExitDirection(prev => (prev === 'right' ? 'left' : 'right'));

        setTimeout(() => {
            setCards(prev => {
                const newArray = prev.slice(1);
                const exitedCard = prev[0];
                if (exitedCard) {
                    exitedCard.status = 'hidden';
                    newArray.push(exitedCard);

                    if (newArray[0]) newArray[0].status = 'top';
                    if (newArray[1]) newArray[1].status = 'next';
                    if (newArray[2]) newArray[2].status = 'third';
                }
                return newArray;
            });
            setIsAnimating(false);
        }, 600);
    };

    return (
        <div className="card-stack-wrapper">
            <div className="card-stack">
                {cards.map((item) => (
                    <div
                        key={item.id}
                        className={`stack-card ${item.status}`}
                    >
                        <div className="card-icon">{item.icon}</div>
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-desc">{item.desc}</p>
                    </div>
                ))}
            </div>
            <div className="card-stack-controls">
                <button onClick={handleNext} disabled={isAnimating}>
                    {buttonText || 'Next'}
                </button>
            </div>
        </div>
    );
};

const FooterThreeAnimation = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);
        camera.position.z = 35;

        const vertices = [];
        const particleCount = 40;
        for (let i = 0; i < particleCount; i++) {
            vertices.push(
                (Math.random() - 0.5) * 120,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 60
            );
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ size: 0.8, color: 0xffffff, transparent: true, opacity: 0.25 });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i + 1] = Math.sin(Date.now() * 0.001 + positions[i]) * 5;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(frameId);
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div id="footer-three-container" ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};

const HeroThreeVisual = () => {
    const mountRef = useRef(null);
    const symbolsRef = useRef([]);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x00A3FF, 1.5, 100);
        scene.add(pointLight);

        const createSymbolSprite = (symbol, color = 'rgba(255, 255, 255, 0.7)') => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const context = canvas.getContext('2d');
            context.font = 'bold 96px Arial';
            context.fillStyle = color;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(symbol, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8 });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(1.5, 1.5, 1.5);
            return sprite;
        };

        const symbolChars = ['₹', '📈', '🤝', '⭐'];
        symbolsRef.current = [];
        symbolChars.forEach(char => {
            const symbol = createSymbolSprite(char);
            symbol.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );

            symbol.userData.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            );
            symbol.userData.rotationSpeed = (Math.random() - 0.5) * 0.01;

            symbolsRef.current.push(symbol);
            scene.add(symbol);
        });

        const mouse = new THREE.Vector2();
        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        let frameId;
        const bounds = { x: 10, y: 6, z: 8 };
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            symbolsRef.current.forEach(symbol => {
                symbol.position.add(symbol.userData.velocity);
                symbol.material.rotation += symbol.userData.rotationSpeed;

                if (Math.abs(symbol.position.x) > bounds.x) symbol.userData.velocity.x *= -1;
                if (Math.abs(symbol.position.y) > bounds.y) symbol.userData.velocity.y *= -1;
                if (Math.abs(symbol.position.z) > bounds.z) symbol.userData.velocity.z *= -1;
            });

            pointLight.position.x = mouse.x * 5;
            pointLight.position.y = mouse.y * 5;
            pointLight.position.z = 5;

            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(frameId);
            symbolsRef.current.forEach(symbol => {
                symbol.geometry?.dispose();
                symbol.material?.map?.dispose();
                symbol.material?.dispose();
            });
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} id="hero-canvas-container" />;
};

const Footer = ({ onOpenModal }) => {
  return (
    <footer>
      <FooterThreeAnimation />
      <div className="footer-container">
        <div className="footer-company">
          <h3>KrewsUp Tech Pvt Ltd</h3>
          <p>Empowering India's gig economy with innovative solutions</p>
          <div className="footer-social">
            <a href="https://x.com/RaghavXKrewsUp?t=WSAwWeUH9sPIFO3Uz7Ck5g&s=09" className="twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="https://www.linkedin.com/in/raghav1548" className="linkedin"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.067 0-1.14.92-2.066 2.063-2.066 1.14 0 2.066.926 2.066 2.066 0 1.141-.926 2.067-2.066 2.067zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
            <a href="https://www.instagram.com/raghavxkrewsup?igsh=dHhkOG0yNDNqM2th" className="instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.703-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.67-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          </div>
        </div>
        <div className="footer-links-group">
          <h4>Contact</h4>
          <div className="footer-links">
            <a>raghav@krewsup.com</a>
            <a>+91-8296058467</a>
            <a>G2-401, Shriram Shreyas Apartments, Kodigehalli, Telecomlayout, Vidyaranyapura, Bangalore-560097, Karnataka, India</a>
          </div>
        </div>
        <div className="footer-links-group">
          <h4>Policies</h4>
          <div className="footer-links">
            <a onClick={() => onOpenModal('about')}>About Us</a>
            <a onClick={() => onOpenModal('privacy')}>Privacy Policy</a>
            <a onClick={() => onOpenModal('terms')}>Terms & Conditions</a>
          </div>
        </div>
      </div>
      <p className="copyright">© 2025 KrewsUp Technologies Private Limited.<br/> All Rights Reserved.</p>
      <p className="footer-crafted-line">Engineered for the future of work in Bharat 🤍</p>
    </footer>
  );
};

const HomePage = ({ onOpenModal }) => {
    const testimonialPairs = [
        {
            business: { text: "With KrewsUp, we quickly connected with the right event crew - no calls, no delays. Just a smooth, tech-driven experience.", author: "Tanushri S N", role: "Founder - RollTheDice", logoUrl: rtdLogo },
            krew: { text: "Explaining traditional Indian board games was a unique experience. The vibe was amazing, and KrewsUp made sure I was prepared and paid on time.", author: "Thanusha", role: "Crew at RollTheDice Event" }
        },
        {
            business: { text: "For our Urbanaut event, the KrewsUp app made it effortless to book and manage event crews. From setup to on-ground support, everything was smooth, timely, and well-coordinated.", author: "Samyuktha Ranganathan", role: "Founder - Urbanaut", logoUrl: utLogo },
            krew: { text: "Setting up the Urbanaut event gave me real hands-on experience. The KrewsUp app made the entire process smooth ,from applying to getting paid and kept it all professional..", author: "Harsha Vardhan", role: "Crew at Urbanaut Event" }
        },
        {
            business: { text: "KrewsUp completely changed how we staff our events. In just a few clicks, we connect with reliable talent who are passionate and professional.", author: "Mehul Ramaswami", role: "Founder - Kathakonnect", logoUrl: kdaLogo },
            krew: { text: "KathaKonnect was electrifying! I managed stage and artist coordination, and felt part of something big. The KrewsUp app made everything seamless - from applying to working on-ground..", author: "Kruthika S", role: "Crew at KathaKonnect Event" }
        }
    ];

    return (
        <section className="page">
            <div className="hero">
                <HeroThreeVisual />
                <div className="hero-content">
                    <h1>Brew  Your  <span>Connections.</span></h1>
                    <p className="tagline">Bharat's Ultimate Gig Platform</p>
                    <p className="description">KrewsUp is a B2C mobile platform connecting startups and event organizers with trusted, KYC-verified blue-collar gig workers for events. We simplify crew hiring for launches, activations, and large-scale events - ensuring professionalism, timely coordination, and a seamless experience.</p>
                    <div className="hero-button-grid">
                        <button className="btn" id="host-btn" onClick={() => onOpenModal('host')}>Host an Event</button>
                        <button className="btn" id="gig-btn" onClick={() => onOpenModal('gig')}>Find a Gig</button>
                        <div className="app-btn">
                            <div className="app-btn-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill="white"/></svg>
                            </div>
                            <div className="app-btn-content">
                                <span className="app-btn-label">Download on the</span>
                                <span className="app-btn-name">App Store</span>
                            </div>
                            <div className="app-btn-tooltip">Stay tight! We're still under development</div>
                        </div>
                        <div className="app-btn">
                            <div className="app-btn-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.60938 3.15234C3.29688 3.48047 3.125 3.99609 3.125 4.67969V19.3203C3.125 20.0039 3.29688 20.5195 3.60938 20.8477L3.70312 20.9414L13.1016 11.543V11.4414L3.70312 2.05859L3.60938 3.15234Z" fill="white"/><path d="M17.168 15.6094L13.1016 11.543V11.4414L17.168 7.37499L17.2852 7.44921L22.0117 10.0547C23.4023 10.8555 23.4023 12.1289 22.0117 12.9297L17.2852 15.5352L17.168 15.6094Z" fill="white"/><path d="M17.2852 15.5352L13.1016 11.5L3.60938 20.8477C4.0625 21.3281 4.78125 21.3867 5.5625 20.9297L17.2852 15.5352Z" fill="white"/><path d="M17.2852 7.44921L5.5625 2.05468C4.78125 1.59765 4.0625 1.65625 3.60938 2.14062L13.1016 11.5L17.2852 7.44921Z" fill="white"/></svg>
                            </div>
                            <div className="app-btn-content">
                                <span className="app-btn-label">GET IT ON</span>
                                <span className="app-btn-name">Google Play</span>
                            </div>
                            <div className="app-btn-tooltip">Coming soon! We're working hard to launch</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="waitlist-section">
              <h3 className="waitlist-title">The Shift Has Begun</h3>
              <p className="waitlist-subtitle">KrewsUp is reshaping how crews connect.<br/>Get in early. Be part of the new era.</p>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf0AQJNcrFvLjr3FbYqqSPpjN6d9wlRLP2PIZzY0iGt6U3Htg/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="waitlist-btn">
                Join the Waitlist
              </a>
            </div>
            <section className="testimonials-section">
                <div className="title-container">
                    <h2 className="section-title">Two Sides of Success</h2>
                </div>
                {testimonialPairs.map((pair, index) => (
                    <AnimatedCard key={index} className="testimonial-pair">
                        <div className="testimonial-card-unique business-testimonial">
                            <h4 className="testimonial-category">The Organizer's View</h4>
                            <p className="testimonial-text-unique">"{pair.business.text}"</p>
                            <div className="testimonial-author-unique">
                                <div className="author-avatar-unique logo-avatar">
                                    <img
                                        src={pair.business.logoUrl}
                                        alt={`${pair.business.author} Logo`}
                                        style={pair.business.logoUrl === utLogo ? { transform: 'scale(1.6)' } : {}}
                                    />
                                </div>
                                <div>
                                    <div className="author-name-unique">{pair.business.author}</div>
                                    <div className="author-role-unique">{pair.business.role}</div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card-unique krew-testimonial">
                            <h4 className="testimonial-category">The Krew's Experience</h4>
                            <p className="testimonial-text-unique">"{pair.krew.text}"</p>
                            <div className="testimonial-author-unique">
                                <div className="author-avatar-unique text-avatar">
                                    {pair.krew.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="author-name-unique">{pair.krew.author}</div>
                                    <div className="author-role-unique">{pair.krew.role}</div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>
                ))}
            </section>
        </section>
    );
};

const WhyUsPage = () => {
    const features = [
        { icon: '⚡', title: 'Instant Gigs', desc: 'Find or post gigs in seconds. Our intelligent matching algorithm connects the right talent with the right opportunities based on skills, location, and availability.' },
        { icon: '💸', title: 'Same-Day Payments', desc: 'Cash in your account within 24 hours of completing your gig. Our secure payment system ensures you get paid quickly with complete transparency.' },
        { icon: '🔒', title: 'Verified Profiles', desc: 'Our rigorous verification process ensures every user is authentic and trustworthy. ID verification, skills assessment, and review systems maintain quality standards.' },
        { icon: '🌐', title: 'Pan-India Network', desc: 'Active in 23 cities across India with plans to expand to 50+ by end of year. Find opportunities or talent anywhere in the country without geographical limitations.' },
        { icon: '📱', title: 'Mobile-First Experience', desc: 'Our app-centric approach means you can manage your entire gig life from your smartphone. Real-time notifications, location services, and seamless communication.' },
        { icon: '📊', title: 'Performance Analytics', desc: 'Access detailed insights about your gigs, earnings, and ratings. Track your growth, identify improvement areas, and showcase your experience effectively.' },
        { icon: '🎯', title: 'Skill Development', desc: 'Enhance your professional skills through our curated workshops, mentorship programs, and performance feedback system to boost your career growth.' },
    ];
    return (
        <section className="page">
            <div className="title-container"><h2 className="section-title">Why KrewsUp?</h2></div>
            <TinderCardStack items={features} buttonText="Next Feature" />
        </section>
    );
};

const HowItWorksPage = () => {
    const steps = [
        { num: '01', title: 'Create Your Profile', desc: 'Sign up and build your detailed profile showcasing your skills, experience, and availability. Complete verification to access premium gigs and increase your trustworthiness.' },
        { num: '02', title: 'Find or Post Gigs', desc: 'Browse available opportunities or create your own gig listings with detailed requirements, location, timing, and compensation. Our algorithm matches the right talent with the right gigs.' },
        { num: '03', title: 'Connect and Confirm', desc: 'Direct communication with potential matches, discuss details, and confirm arrangements through our secure platform. Clear expectations and documentation protect both parties.' },
        { num: '04', title: 'Complete the Gig', desc: 'Show up, deliver exceptional service, and track your hours through our app\'s built-in time and location verification system. Get real-time feedback during the gig.' },
        { num: '05', title: 'Get Paid & Review', desc: 'Receive payment within 24 hours of gig completion. Share your experience through our review system to help build the community\'s trust network and improve future matches.' },
    ];
    return (
        <section className="page">
            <div className="title-container"><h2 className="section-title">How It Works</h2></div>
            <div className="steps">
                {steps.map(s => (
                    <AnimatedCard key={s.num} className="step">
                        <div className="step-number">{s.num}</div>
                        <div className="step-content">
                            <h3 className="step-title">{s.title}</h3>
                            <p className="step-desc">{s.desc}</p>
                        </div>
                    </AnimatedCard>
                ))}
            </div>
        </section>
    );
};

const PartnersPage = () => {
    const partners = [
        { name: 'RollTheDice', photoUrl: rtdPhoto, logoUrl: rtdLogo },
        { name: 'Urbanaut Technologies', photoUrl: utPhoto, logoUrl: utLogo },
        { name: 'Kathakonnect Dance Academy', photoUrl: kdaPhoto, logoUrl: kdaLogo },
    ];

    const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <section className="page partners-section">
            <div className="title-container">
                <h2 className="section-title">Our Partners</h2>
            </div>
            <div className="partners-marquee-container">
                <div className="partners-marquee">
                    {duplicatedPartners.map((partner, index) => (
                         <div className="partner-wrapper" key={`${partner.name}-${index}`}>
                            <img src={partner.logoUrl} alt={`${partner.name} Logo`} className="partner-logo" />
                            <div className="partner-item">
                                <img src={partner.photoUrl} alt={`${partner.name}`} className="partner-photo" />
                                <div className="partner-name">{partner.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CustomersPage = () => {
    const customers = [
        { icon: '🎭', title: 'Event Organizers', desc: 'From large corporate events to intimate gatherings, we provide reliable staff for all your needs including hosts, servers, technicians, and security personnel.' },
        { icon: '🏢', title: 'Corporate Teams', desc: 'Scale your workforce during peak seasons or find specialists for short-term projects without lengthy recruitment processes or long-term commitments.' },
        { icon: '🎬', title: 'Production Houses', desc: 'Access a diverse pool of creative talent from camera operators to makeup artists, ensuring your production runs smoothly with qualified professionals.' },
        { icon: '🎓', title: 'Skilled Professionals', desc: 'Find flexible work opportunities that fit your schedule, showcase your talents, and expand your professional network while earning competitive wages.' },
    ];
    return (
        <section className="page">
            <div className="title-container"><h2 className="section-title">Our Customers</h2></div>
            <TinderCardStack items={customers} buttonText="Next Customer" />
        </section>
    );
};

const FAQPage = () => {
    const faqs = [
        { q: 'How do I sign up as a gig worker?', a: 'Simply download our app, create an account, verify your identity, and complete your profile with skills and experience. Once approved, you can start applying for gigs immediately.' },
        { q: 'What types of gigs are available on KrewsUp?', a: 'We offer a wide range of opportunities including event staffing, hospitality, retail, promotions, entertainment, technical support, and creative services. New categories are added regularly based on market demand.' },
        { q: 'How quickly will I get paid after completing a gig?', a: 'We process all payments within 24 hours of gig completion and confirmation. Funds are directly transferred to your linked bank account or digital wallet, making the process fast and hassle-free.' },
        { q: 'Is there a fee for using KrewsUp?', a: 'Creating a basic profile is free. We charge a small service fee (5-10% depending on the gig type) only when a gig is successfully completed. Hosts pay a listing fee based on the size and complexity of their requirements.' },
        { q: 'How does KrewsUp ensure quality and reliability?', a: 'We have a comprehensive verification process including ID verification, background checks for certain roles, skills assessment, and a robust review system. Poor performance is monitored and addressed promptly to maintain platform quality.' },
    ];
    return (
        <section className="page">
            <div className="title-container"><h2 className="section-title">Frequently Asked Questions</h2></div>
            <div className="faq">
                {faqs.map(faq => <FaqItem key={faq.q} question={faq.q} answer={faq.a} />)}
            </div>
        </section>
    );
};

function App() {
    const [activePage, setActivePage] = useState('home-page');
    const [openModal, setOpenModal] = useState(null);

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [openModal]);

    const handleNavigate = (pageId) => {
        setActivePage(pageId);
        window.scrollTo(0, 0);
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav) mobileNav.classList.remove('active');
    };

    const handleToggleMobileNav = () => {
        document.querySelector('.mobile-nav')?.classList.toggle('active');
    };

    const handleOpenModal = (modalId) => setOpenModal(modalId);
    const handleCloseModal = () => setOpenModal(null);

    const modalData = useMemo(() => ({
        host: { id: 'host-modal', title: 'Host an Event', subtitle: 'Find the perfect team for your next event with KrewsUp', features: [
            {icon: '✓', text: 'Access to thousands of verified professionals'}, {icon: '✓', text: 'Customized staffing solutions for any event size'},
            {icon: '✓', text: 'Real-time tracking and communication'}, {icon: '✓', text: 'Secure payment processing'}, {icon: '✓', text: 'Satisfaction guarantee or money back'}
        ] },
        gig: { id: 'gig-modal', title: 'Find a Gig', subtitle: 'Turn your skills into income with flexible opportunities', features: [
            {icon: '✓', text: 'Flexible schedule - work when you want'}, {icon: '✓', text: 'Same-day payments directly to your account'},
            {icon: '✓', text: 'Build your portfolio and professional network'}, {icon: '✓', text: 'Skill development opportunities and workshops'}, {icon: '✓', text: 'Basic insurance coverage for all gigs'}
        ] },
        about: { id: 'about-modal', title: 'About Us', subtitle: 'What is KrewsUp?', features: [
            {text: 'KrewsUp is India\'s premier gig economy platform connecting skilled professionals with event organizers and businesses across the country.'},
            {text: 'Our mission is to revolutionize the way people work and hire by providing a seamless, transparent, and efficient platform.'},
            {text: 'Founded in 2025, we\'re committed to empowering talent and enabling opportunities nationwide.'}
        ] },
        privacy: { id: 'privacy-modal', title: 'Privacy Policy', subtitle: 'Your privacy matters to us', features: [
            {text: 'KrewsUp collects only essential personal data necessary for gig matching and verification processes.'},
            {text: 'Your information is protected with bank-grade encryption and never shared with third parties without consent.'},
            {text: 'Users have full control over their data with options to update, export, or delete profiles at any time.'}
        ] },
        terms: { id: 'terms-modal', title: 'Terms & Conditions', subtitle: 'Our terms of service', features: [
            {text: 'All users must be 18+ and provide valid government ID for verification.'},
            {text: 'Gig payments are processed within 24 hours, subject to verification and dispute resolution policies.'},
            {text: 'KrewsUp reserves the right to suspend accounts violating community guidelines or engaging in fraudulent activities.'}
        ] },
    }), []);

    return (
        <>
            <style>{GlobalCSS}</style>
            <GradientBackground />
            <ParticleBackground />
            <CustomCursor />
            <RippleEffect />

            <Header onNavigate={handleNavigate} activePage={activePage} onToggleMobileNav={handleToggleMobileNav} />

            <main className="container">
                {activePage === 'home-page' && <HomePage onOpenModal={handleOpenModal} />}
                {activePage === 'why-us-page' && <WhyUsPage />}
                {activePage === 'how-page' && <HowItWorksPage />}
                {activePage === 'partners-page' && <PartnersPage />}
                {activePage === 'customers-page' && <CustomersPage />}
                {activePage === 'faq-page' && <FAQPage />}
            </main>

            <Footer onOpenModal={handleOpenModal} />

            {Object.keys(modalData).map(key => (
                 <Modal
                    key={key}
                    id={modalData[key].id}
                    title={modalData[key].title}
                    subtitle={modalData[key].subtitle}
                    features={modalData[key].features}
                    show={openModal === key}
                    onClose={handleCloseModal}
                />
            ))}
        </>
    );
}

export default App;
