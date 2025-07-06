import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import logo from './assets/logobabes.png';
import rtdPhoto from './assets/rtd.jpg';
import utPhoto from './assets/ut.jpg';
import kdaPhoto from './assets/kda.jpg';
import rtdLogo from './assets/rtdlogo.jpg';
import utLogo from './assets/utlogo.jpg';
import kdaLogo from './assets/kdalogo.jpg';
import fordceo from './assets/32.jpg';
import wb from './assets/31.jpg';
import dl from './assets/dl21.jpg';
import genz from './assets/genz.jpg';
import lm from './assets/lm.jpg';
import ir from './assets/ir.jpg';
import ss from './assets/ss.jpg';
import expo from './assets/expo.jpg';
import bcj from './assets/bcj.jpg';
import fmb from './assets/fmb.jpg';
import wcmb from './assets/wcmb.jpg';
import exmb from './assets/exmb.jpg';
import samb from './assets/samb.jpg';
import epmb from './assets/epmb.jpg';
import gzmb from './assets/gzmb.jpg';
import ssmb from './assets/ssmb.jpg';
import atmb from './assets/atmb.jpg';

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
        cursor: default;
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
        top: 30px;
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
        padding: 8px 30px;
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
        gap: 35px;
        margin-left: 25px;
        align-items: center;
        padding: 0 10px;
    }
    .nav-item-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .nav-item-wrapper:hover {
        transform: translateY(-8px) scale(1.6);
    }
    .nav-icon {
        display: block;
        width: 28px;
        height: 28px;
        cursor: pointer;
        position: relative;
    }
    .nav-icon svg {
        width: 100%;
        height: 100%;
        fill: rgba(255, 255, 255, 0.7);
        transition: fill 0.2s ease;
    }
    .nav-item-wrapper:hover .nav-icon svg {
        fill: #fff;
    }
    .nav-icon.active::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        background-color: var(--accent-color);
        border-radius: 50%;
    }
    .nav-tooltip {
        position: absolute;
        top: calc(100% + 12px);
        background: rgba(10, 10, 10, 0.9);
        color: #fff;
        padding: 4px 10px;
        border-radius: 5px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-5px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
        pointer-events: none;
    }
    .nav-item-wrapper:hover .nav-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
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
        transform: translateZ(0);
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
    .scramble-wrapper {
        position: relative;
        display: inline-block;
    }
    .scramble-placeholder {
        visibility: hidden;
    }
    .scramble-animated {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: var(--accent-color);
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
      position: relative;
      overflow: hidden;
    }
    #host-btn:hover {
      background: transparent;
      color: #fff;
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    #host-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150px;
        height: 150px;
        background: radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.08) 55%, transparent 65%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: host-pulse 3s infinite cubic-bezier(0.2, 0.8, 0.2, 1);
        pointer-events: none;
    }
    #gig-btn {
      background: #fff;
      color: #000;
      border: 1px solid #fff;
      position: relative;
      overflow: hidden;
    }
    #gig-btn:hover {
      background: transparent;
      color: #fff;
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    #gig-btn::before {
      content: '';
      position: absolute;
      top: -75%;
      left: -75%;
      width: 250%;
      height: 250%;
      background: conic-gradient(
        from 0deg,
        transparent,
        rgba(0, 0, 0, 0.08) 10%,
        transparent 30%
      );
      animation: gig-scan 4s linear infinite;
      pointer-events: none;
    }
    @keyframes host-pulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        80% {
            opacity: 0.5;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
        }
    }
    @keyframes gig-scan {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
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
    .partners-carousel-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 550px;
        perspective: 2000px;
        position: relative;
    }
    .partners-carousel {
        position: relative;
        width: 300px;
        height: 400px;
        transform-style: preserve-3d;
        transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .partners-carousel-card {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.15);
        background-color: #111;
        cursor: pointer;
        transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        transform-style: preserve-3d;
    }
    .partners-carousel-card:hover {
        border-color: rgba(255, 255, 255, 0.3);
    }
    .partners-carousel-card .partner-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
    }
    .partners-carousel-card:hover .partner-photo {
        transform: scale(1.05);
    }
    .partners-carousel-card .partner-info-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 20px;
        background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
        display: flex;
        align-items: center;
        gap: 15px;
    }
    .partners-carousel-card .partner-logo {
        width: 50px;
        height: 50px;
        object-fit: contain;
        border-radius: 8px;
        flex-shrink: 0;
        background-color: #fff;
    }
    .partners-carousel-card .partner-name {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
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
    .cover-wrapper {
        position: relative;
        display: inline-block;
        border-radius: 8px;
        overflow: hidden;
        -webkit-mask-image: -webkit-radial-gradient(white, black);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .cover-wrapper:hover {
        transform: scale(1.05) translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(var(--accent-color-rgb), 0.3);
    }
    .cover-effects {
        position: absolute;
        inset: 0;
        z-index: 1;
        border-radius: 8px;
        background-image: linear-gradient(145deg, rgba(35, 35, 35, 0.9), rgba(15, 15, 15, 0.8));
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        transition: border-color 0.3s ease;
    }
    .cover-wrapper:hover .cover-effects {
        border-color: rgba(255, 255, 255, 0.4);
    }
    .cover-stars {
        position: absolute;
        inset: 0;
        background-image:
            radial-gradient(1px 1px at 10% 20%, var(--primary-color), transparent),
            radial-gradient(1px 1px at 80% 30%, var(--primary-color), transparent),
            radial-gradient(1.5px 1.5px at 50% 60%, var(--primary-color), transparent),
            radial-gradient(1px 1px at 30% 90%, var(--primary-color), transparent),
            radial-gradient(1px 1px at 90% 80%, var(--primary-color), transparent);
        background-size: 250px 250px;
        opacity: 0;
        animation: star-flow 25s linear infinite;
        transition: opacity 0.5s ease;
    }
    @keyframes star-flow {
        from { transform: translateY(0); }
        to { transform: translateY(-250px); }
    }
    .cover-wrapper:hover .cover-stars {
        opacity: 0.8;
        animation-duration: 3s;
    }
    .particle-rush {
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: 8px;
    }
    .particle {
        position: absolute;
        left: -5px;
        top: calc(var(--top-pos) * 1%);
        width: 6px;
        height: 1.5px;
        background: var(--primary-color);
        opacity: 0;
    }
    .cover-wrapper:hover .particle {
        animation: particle-flow 0.6s ease-in forwards;
        animation-delay: var(--delay);
    }
    @keyframes particle-flow {
        0% {
            transform: translateX(0);
            opacity: 0.7;
        }
        100% {
            transform: translateX(250px);
            opacity: 0;
        }
    }
    .waitlist-btn {
        display: inline-block;
        padding: 18px 40px;
        background: transparent;
        color: var(--primary-color);
        border: 1px solid transparent;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: none;
        cursor: pointer;
        position: relative;
        z-index: 2;
        overflow: visible;
    }
    .waitlist-btn:hover {
        transform: none;
        box-shadow: none;
        border-color: transparent;
    }
    @keyframes waitlist-shine {
        from {
            left: -100%;
        }
        to {
            left: 150%;
        }
    }
    .auto-rotating-card-stack-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 500px;
        perspective: 1500px;
    }
    .auto-rotating-card-stack {
        position: relative;
        width: 100%;
        max-width: 480px;
        height: 380px;
        transform-style: preserve-3d;
    }
    .stack-card-auto {
        position: absolute;
        width: 100%;
        height: 100%;
        will-change: transform, opacity;
        transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease;
        backface-visibility: hidden;
    }
    .card-content-3d {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: rgb(30, 30, 30);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      transform-style: preserve-3d;
      transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .stack-card-auto.is-hovering .card-content-3d {
        transition: transform 0.05s linear;
    }
    .stack-card-auto.card-active {
        transform: translateY(0) translateZ(0) rotateX(0deg);
        opacity: 1;
        z-index: 4;
        pointer-events: auto;
        cursor: grab;
    }
    .stack-card-auto.card-next {
        transform: translateY(-40px) translateZ(-150px) rotateX(0deg);
        opacity: 0.7;
        z-index: 3;
        pointer-events: none;
    }
    .stack-card-auto.card-behind {
        transform: translateY(-80px) translateZ(-300px) rotateX(0deg);
        opacity: 0.3;
        z-index: 2;
        pointer-events: none;
    }
    .stack-card-auto.card-exiting {
        transform: translateY(200px) translateZ(-100px) rotateX(-15deg);
        opacity: 0;
        z-index: 5;
        pointer-events: none;
    }
    .stack-card-auto.card-hidden-auto {
        transform: translateY(-120px) translateZ(-450px) rotateX(0deg);
        opacity: 0;
        z-index: 1;
        pointer-events: none;
    }
    .page-scroll-indicator {
      position: fixed;
      bottom: 40px;
      right: 40px;
      transform: translateY(20px);
      width: 50px;
      height: 50px;
      background: rgba(40, 40, 40, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .page-scroll-indicator.visible {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      transform: translateY(0);
    }
    .page-scroll-indicator:hover {
      transform: scale(1.1);
      box-shadow: 0 0 20px rgba(var(--accent-color-rgb), 0.3);
      background: rgba(var(--accent-color-rgb), 0.1);
    }
    .page-scroll-indicator .arrow {
      width: 12px;
      height: 12px;
      border-bottom: 2px solid var(--primary-color);
      border-right: 2px solid var(--primary-color);
      transform: translateY(-2px) rotate(45deg);
      animation: page-scroll-bounce 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes page-scroll-bounce {
      0%, 100% {
        opacity: 1;
        transform: translateY(-2px) rotate(45deg);
      }
      50% {
        opacity: 0.8;
        transform: translateY(2px) rotate(45deg);
      }
    }
    .gigscape-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: 220px;
        gap: 20px;
    }
    .gigscape-card-wrapper {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .gigscape-card-wrapper.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .gigscape-card {
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        height: 100%;
        width: 100%;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
        cursor: default;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .gigscape-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    }
    .gigscape-card-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
        transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .gigscape-card:hover .gigscape-card-bg {
        transform: scale(1.05);
    }
    .gigscape-card::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background: linear-gradient(to top, rgba(5, 5, 5, 0.9) 15%, rgba(5, 5, 5, 0.6) 40%, transparent 70%);
        transition: background 0.5s ease;
    }
    .gigscape-content {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 25px;
        z-index: 3;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
    }
    .gigscape-category {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--accent-color);
        margin-bottom: 8px;
        opacity: 0.8;
    }
    .gigscape-title {
        font-size: 22px;
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 12px;
        text-shadow: 0 2px 10px rgba(0,0,0,0.7);
    }
    .gigscape-desc {
        font-size: 14px;
        line-height: 1.6;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.4s ease, transform 0.4s ease;
        max-height: 0;
        overflow: hidden;
    }
    .gigscape-card:hover .gigscape-desc {
        opacity: 0.8;
        transform: translateY(0);
        max-height: 150px;
    }
    .gigscape-item-1 { grid-column: 1 / 4; grid-row: 1 / 3; }
    .gigscape-item-2 { grid-column: 4 / 7; grid-row: 1 / 2; }
    .gigscape-item-3 { grid-column: 4 / 6; grid-row: 2 / 3; }
    .gigscape-item-4 { grid-column: 6 / 7; grid-row: 2 / 4; }
    .gigscape-item-5 { grid-column: 1 / 3; grid-row: 3 / 4; }
    .gigscape-item-6 { grid-column: 3 / 6; grid-row: 3 / 4; }
    .gigscape-item-7 { grid-column: 1 / 4; grid-row: 4 / 5; }
    .gigscape-item-8 { grid-column: 4 / 7; grid-row: 4 / 5; }
    
    @media (max-width: 900px) {
        .gigscape-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 280px;
        }
        .gigscape-item-1 { grid-column: 1 / 2; grid-row: 1 / 3; }
        .gigscape-item-2 { grid-column: 2 / 3; grid-row: 1 / 2; }
        .gigscape-item-3 { grid-column: 2 / 3; grid-row: 2 / 3; }
        .gigscape-item-4 { grid-column: 1 / 2; grid-row: 3 / 4; }
        .gigscape-item-5 { grid-column: 2 / 3; grid-row: 3 / 4; }
        .gigscape-item-6 { grid-column: 1 / 3; grid-row: 4 / 5; }
        .gigscape-item-7 { grid-column: 1 / 2; grid-row: 5 / 6; }
        .gigscape-item-8 { grid-column: 2 / 3; grid-row: 5 / 6; }
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
            padding: 0 10px;
            box-shadow: none;
        }
        .hero-content h1 {
            line-height: 1.2;
        }
        .hero-content h1 .scramble-wrapper {
            display: block;
        }
        .hero-content .description {
            text-align: center;
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
        .modal-content { padding: 30px; }
        .modal-title { font-size: 28px; }
        .partners-carousel-wrapper {
            perspective: none;
            min-height: auto;
            padding: 20px 0;
            height: 50vh;
        }
        .partners-carousel {
            transform: none !important;
            width: 70vw;
            height: 100%;
            transform-style: flat;
        }
        .partners-carousel-card {
            transform: scale(0.8) !important;
            opacity: 0 !important;
            filter: none !important;
            visibility: hidden;
            transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
        }
        .partners-carousel-card.active-mobile {
            transform: scale(1) !important;
            opacity: 1 !important;
            visibility: visible;
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
        .auto-rotating-card-stack {
            height: 420px;
            max-width: 90vw;
        }
        .card-content-3d {
            padding: 30px 20px;
        }
        .page-scroll-indicator {
            right: 20px;
            bottom: 20px;
            width: 45px;
            height: 45px;
        }
        .gigscape-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 350px;
        }
        .gigscape-item-1, .gigscape-item-2, .gigscape-item-3, .gigscape-item-4, .gigscape-item-5, .gigscape-item-6, .gigscape-item-7, .gigscape-item-8 {
            grid-column: 1 / -1;
            grid-row: auto;
        }
    }
`;

const HomeIcon = () => <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"/></svg>;
const WhyUsIcon = () => <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-3.5-3.5 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>;
const HowItWorksIcon = () => <svg viewBox="0 0 24 24"><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><path d="m19.43 12.98-.46-3.34-2.73-1.34.94-3.16-2.82-1.64-1.94 2.5-3.2-.4-1.2-3.03-3.41 1.25-.46 3.34 2.73 1.34-.94 3.16 2.82 1.64 1.94-2.5 3.2.4 1.2 3.03 3.41-1.25.46-3.34-2.73-1.34.94-3.16-2.82-1.64-1.94 2.5z"/></svg>;
const PartnersIcon = () => <svg viewBox="0 0 24 24"><path d="M22.5 13.13c-.85 0-1.55.54-1.87 1.3L19.2 17H4.8l-1.43-2.57c-.32-.76-1.02-1.3-1.87-1.3C.67 13.13 0 13.8 0 14.67c0 .4.17.77.45 1.04l2.7 2.7c.39.39 1.02.39 1.41 0l.71-.71h11.48l.71.71c.39.39 1.02.39 1.41 0l2.7-2.7c.28-.27.45-.64.45-1.04 0-.87-.67-1.54-1.5-1.54zM8.5 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm7 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/></svg>;
const GigscapeIcon = () => <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zM17.99 9.21c-.24-3.99-3.42-7.18-7.44-7.21.01 0 .01 0 0 0-3.99.03-7.2 3.23-7.21 7.21 0 0 0 .01 0 0 .03 3.99 3.23 7.2 7.21 7.21 3.99-.03 7.18-3.23 7.21-7.21 0 0 0-.01 0 0z"/></svg>;
const CustomersIcon = () => <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const FAQIcon = () => <svg viewBox="0 0 24 24"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V4c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>;

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
    const [logoSrc, setLogoSrc] = useState(logo);

    const navLinks = [
      { pageId: 'home-page', Icon: HomeIcon, tooltip: 'Home' },
      { pageId: 'why-us-page', Icon: WhyUsIcon, tooltip: 'Why Us' },
      { pageId: 'how-page', Icon: HowItWorksIcon, tooltip: 'How It Works' },
      { pageId: 'partners-page', Icon: PartnersIcon, tooltip: 'Our Partners' },
      { pageId: 'gigscape-page', Icon: GigscapeIcon, tooltip: 'Gigscape' },
      { pageId: 'customers-page', Icon: CustomersIcon, tooltip: 'Customers' },
      { pageId: 'faq-page', Icon: FAQIcon, tooltip: 'FAQ' },
    ];
    
    const mobileNavItems = navLinks.map(link => link.tooltip);
    const mobilePageIds = navLinks.map(link => link.pageId);

    return (
        <header>
            <nav>
                <div className="logo">
                    <img src={logoSrc} alt="KrewsUp Logo" onError={() => setLogoSrc('https://via.placeholder.com/150x60?text=KrewsUp')} />
                </div>
                <div className="nav-links">
                    {navLinks.map((link) => (
                        <div key={link.pageId} className="nav-item-wrapper" onClick={() => onNavigate(link.pageId)}>
                            <a href={`#${link.pageId}`} className={`nav-icon ${activePage === link.pageId ? 'active' : ''}`} onClick={(e) => e.preventDefault()}>
                                <link.Icon />
                            </a>
                            <span className="nav-tooltip">{link.tooltip}</span>
                        </div>
                    ))}
                </div>
                <button className="mobile-menu-btn" onClick={onToggleMobileNav}>☰</button>
            </nav>
            <MobileNav navItems={mobileNavItems} pageIds={mobilePageIds} onNavigate={onNavigate} />
        </header>
    );
};

const MobileNav = ({ navItems, pageIds, onNavigate }) => {
    return (
        <div className="mobile-nav">
            {navItems.map((item, index) => (
                <a key={item} href={`#${pageIds[index]}`} onClick={(e) => { e.preventDefault(); onNavigate(pageIds[index]); }}>
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

let hasHeroAnimated = false;

const ScrambledText = ({ text }) => {
    const [displayText, setDisplayText] = useState(hasHeroAnimated ? text : '');
    const intervalRef = useRef(null);
    const originalText = text;
    const chars = '!<>-_\\/[]{}—=+*^?#';

    useEffect(() => {
        if (hasHeroAnimated) {
            setDisplayText(originalText);
            return;
        }

        const startTimeout = setTimeout(() => {
            let iteration = 0;
            
            clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setDisplayText(
                    originalText
                        .split('')
                        .map((char, index) => {
                            if (index < iteration) {
                                return originalText[index];
                            }
                            if (char === ' ') return ' ';
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('')
                );
    
                if(iteration >= originalText.length){ 
                    clearInterval(intervalRef.current);
                    setDisplayText(originalText);
                    hasHeroAnimated = true;
                }
                
                iteration += 1 / 3;
            }, 40);
        }, 800);

        return () => {
            clearTimeout(startTimeout);
            clearInterval(intervalRef.current);
        };
    }, [originalText]);

    return (
        <span className="scramble-wrapper">
            <span className="scramble-placeholder" aria-hidden="true">{originalText}</span>
            <span className="scramble-animated">{displayText}</span>
        </span>
    );
};

const AutoRotatingCardStack = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRefs = useRef([]);
    cardRefs.current = items.map((_, i) => cardRefs.current[i] ?? React.createRef());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
        }, 2500);

        return () => clearInterval(intervalId);
    }, [items.length]);

    const handleMouseMove = (e, index) => {
        const cardNode = cardRefs.current[index]?.current;
        if (!cardNode) return;
        
        cardNode.parentElement.classList.add('is-hovering');

        const { left, top, width, height } = cardNode.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateY = -((x - width / 2) / (width / 2)) * 15;
        const rotateX = ((y - height / 2) / (height / 2)) * 15;
        
        cardNode.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (index) => {
        const cardNode = cardRefs.current[index]?.current;
        if (cardNode) {
            cardNode.parentElement.classList.remove('is-hovering');
            cardNode.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
    };

    return (
        <div className="auto-rotating-card-stack-wrapper">
            <div className="auto-rotating-card-stack">
                {items.map((item, index) => {
                    const totalItems = items.length;
                    let className = 'card-hidden-auto';
                    const pos = (index - currentIndex + totalItems) % totalItems;
                    
                    switch (pos) {
                        case 0: className = 'card-active'; break;
                        case 1: className = 'card-next'; break;
                        case 2: className = 'card-behind'; break;
                        case totalItems - 1: className = 'card-exiting'; break;
                        default: className = 'card-hidden-auto';
                    }
                    
                    const isCardActive = pos === 0;

                    return (
                        <div
                            key={index}
                            className={`stack-card-auto ${className}`}
                            onMouseMove={isCardActive ? (e) => handleMouseMove(e, index) : null}
                            onMouseLeave={isCardActive ? () => handleMouseLeave(index) : null}
                        >
                            <div className="card-content-3d" ref={cardRefs.current[index]}>
                                <div className="card-icon">{item.icon}</div>
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-desc">{item.desc}</p>
                            </div>
                        </div>
                    );
                })}
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

const Cover = ({ children, className }) => {
    const particleCount = 20;
    return (
        <div className={`cover-wrapper ${className || ''}`}>
            <div className="cover-effects">
                <div className="cover-stars"></div>
                <div className="particle-rush">
                    {Array.from({ length: particleCount }).map((_, i) => (
                        <div
                            className="particle"
                            key={i}
                            style={{
                                '--top-pos': Math.random() * 100,
                                '--delay': `${Math.random() * 0.5}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
            {children}
        </div>
    );
};

const HomePage = ({ onOpenModal }) => {
    const testimonialPairs = [
        {
            business: { text: "KrewsUp helped us find the right crew instantly through the app. It made onboarding smooth and efficient", author: "Tanushri S N", role: "Founder - RollTheDice", logoUrl: rtdLogo },
            krew: { text: "I got to work on a unique event explaining traditional Indian games. KrewsUp made the process easy and exciting", author: "Thanusha", role: "Krew at RollTheDice Event" }
        },
        {
            business: { text: "KrewsUp ensured smooth crew bookings with timely payments and seamless coordination throughout our Urbanaut event", author: "Samyuktha Ranganathan", role: "Founder - Urbanaut", logoUrl: utLogo },
            krew: { text: "Working at Urbanaut gave me great hands-on experience, and KrewsUp ensured quick, professional payments post-event.", author: "Harsha Vardhan", role: "Krew at Urbanaut Event" }
        },
        {
            business: { text: "KrewsUp gave us access to reliable, skilled crews and helpful insights that improved our event planning.", author: "Mehul Ramaswami", role: "Founder - Kathakonnect", logoUrl: kdaLogo },
            krew: { text: "KathaKonnect was thrilling to work at, and KrewsUp showed clear stats on my event count and performance.", author: "Kruthika S", role: "Krew at KathaKonnect Event" }
        }
    ];

    return (
        <section className="page">
            <div className="hero">
                <HeroThreeVisual />
                <div className="hero-content">
                    <h1>Brew Your <ScrambledText text="Connections" /></h1>
                    <p className="tagline">Bharat's Ultimate Gig Platform</p>
                    <p className="description">KrewsUp is a B2C platform connecting companies and organizers with KYC-verified gig workers. It offers reliable crew support for events of all sizes.</p>
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
              <Cover>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSf0AQJNcrFvLjr3FbYqqSPpjN6d9wlRLP2PIZzY0iGt6U3Htg/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="waitlist-btn">
                  Join the Waitlist
                </a>
              </Cover>
            </div>
            <section className="testimonials-section">
                <div className="title-container">
                    <h2 className="section-title">Dual Impact</h2>
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
        { icon: '⚡', title: 'Instant Gigs', desc: 'Find & post gigs in seconds. Our intelligent matching algorithm connects the right talent with the right opportunities based on skills, location, and availability.' },
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
            <AutoRotatingCardStack items={features} />
        </section>
    );
};

const HowItWorksPage = () => {
    const steps = [
        { num: '01', title: 'Create Your Profile', desc: 'Sign up and build your detailed profile showcasing your skills, experience, and availability. Complete verification to access premium gigs and increase your trustworthiness.' },
        { num: '02', title: 'Find and Post Gigs', desc: 'Browse available opportunities or create your own gig listings with detailed requirements, location, timing, and compensation. Our algorithm matches the right talent with the right gigs.' },
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

const PartnersCarousel = ({ partners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const angle = partners.length > 0 ? 360 / partners.length : 0;

    useEffect(() => {
        if (partners.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % partners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [partners.length]);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.transform = `rotateY(${-currentIndex * angle}deg)`;
        }
    }, [currentIndex, angle]);
    
    const getCardStyle = (index) => {
        const rotationY = index * angle;
        const translateZ = 350; 
        return {
            transform: `rotateY(${rotationY}deg) translateZ(${translateZ}px)`,
            filter: index === currentIndex ? 'none' : 'brightness(0.5)',
            opacity: index === currentIndex ? 1 : 0.7,
        };
    };

    return (
        <div className="partners-carousel-wrapper">
            <div className="partners-carousel" ref={carouselRef}>
                {partners.map((partner, index) => (
                    <div 
                        className={`partners-carousel-card ${index === currentIndex ? 'active-mobile' : ''}`} 
                        key={index} 
                        style={getCardStyle(index)}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <img src={partner.photoUrl} alt={partner.name} className="partner-photo" />
                        <div className="partner-info-overlay">
                            <img src={partner.logoUrl} alt={`${partner.name} Logo`} className="partner-logo" />
                            <div className="partner-name">{partner.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const PartnersPage = () => {
    const partners = [
        { name: 'RollTheDice', photoUrl: rtdPhoto, logoUrl: rtdLogo },
        { name: 'Urbanaut', photoUrl: utPhoto, logoUrl: utLogo },
        { name: 'Kathakonnect', photoUrl: kdaPhoto, logoUrl: kdaLogo },
        { name: 'RollTheDice', photoUrl: rtdPhoto, logoUrl: rtdLogo },
        { name: 'Urbanaut', photoUrl: utPhoto, logoUrl: utLogo },
        { name: 'Kathakonnect', photoUrl: kdaPhoto, logoUrl: kdaLogo },
    ];

    return (
        <section className="page partners-section">
            <div className="title-container">
                <h2 className="section-title">Our Partners</h2>
            </div>
            <PartnersCarousel partners={partners} />
        </section>
    );
};

const gigscapeArticles = [
    {
        category: "Rise of Blue-Collar",
        title: "Blue-Collar Jobs Secure, White-Collar Roles at Risk",
        desc: "Ford CEO announces that blue-collar workers are 'safe' while AI is expected to replace nearly 50% of white-collar positions.",
        imageUrl: fordceo,
        mobileImageUrl: fmb,
        gridClass: 'gigscape-item-1'
    },
    {
        category: "Macro Labor Trends",
        title: "White‑Collar Workers Are Getting the Blues",
        desc: "As the labor market slows, white-collar roles face stagnation, signaling a potential shift in employment dynamics and long-term job security.",
        imageUrl: wb,
        mobileImageUrl: wcmb,
        gridClass: 'gigscape-item-2'
    },
    {
        category: "Event Market Trends",
        title: "Dynamic Growth of the Event Industry",
        desc: "Published in early 2025, this report highlights the accelerating expansion of the global event industry.",
        imageUrl: expo,
        mobileImageUrl: exmb,
        gridClass: 'gigscape-item-3'
    },
    {
        category: "Labor Market Shifts",
        title: "Blue-Collar Workers Now Scarcer Than White-Collar.",
        desc: "In a reversal of long-standing labor trends, Companies face growing difficulty in hiring blue-collar workers.",
        imageUrl: lm,
        mobileImageUrl: samb,
        gridClass: 'gigscape-item-4'
    },
    {
        category: "The Event Industry",
        title: "Industry Insights",
        desc: "Event Industry Poised for Revenue Growth in 2025 Despite Workforce Challenges.",
        imageUrl: ir,
        mobileImageUrl: epmb,
        gridClass: 'gigscape-item-5'
    },
    {
        category: "Workforce Development",
        title: "Gen Z Prefers Blue-Collar Jobs. Or Does It?",
        desc: "Emerging data questions whether Gen Z is truly embracing blue-collar roles or simply exploring alternative career paths amidst rising education and cost concerns.",
        imageUrl: genz,
        mobileImageUrl: gzmb,
        gridClass: 'gigscape-item-6'
    },
    {
        category: "Global Workforce Trends",
        title: "Staffing Industry Valued at $543 Billion in 2025, Fueled by Tech & Remote Work",
        desc: "According to Gitnux, the global staffing industry has reached a valuation of $543 billion in 2025.",
        imageUrl: ss,
        mobileImageUrl: ssmb,
        gridClass: 'gigscape-item-7'
    },
    {
        category: "Krew Market - India",
        title: "Addressing the Blue-Collar Job Market Challenges in India",
        desc: "In this member-only article, Pankaj Kumar explores the pressing issues affecting India's blue-collar workforce.",
        imageUrl: bcj,
        mobileImageUrl: atmb,
        gridClass: 'gigscape-item-8'
    }
];

const GigscapePage = () => (
    <section className="page gigscape-section">
        <div className="title-container">
            <h2 className="section-title">Gigscape</h2>
        </div>
        <div className="gigscape-grid">
            {gigscapeArticles.map((article, index) => (
                <AnimatedCard key={index} className={`gigscape-card-wrapper ${article.gridClass}`}>
                    <div className="gigscape-card">
                        <picture>
                            <source media="(max-width: 768px)" srcSet={article.mobileImageUrl} />
                            <img src={article.imageUrl} alt={article.title} className="gigscape-card-bg" />
                        </picture>
                        <div className="gigscape-content">
                            <div>
                                <span className="gigscape-category">{article.category}</span>
                                <h3 className="gigscape-title">{article.title}</h3>
                            </div>
                            <p className="gigscape-desc">{article.desc}</p>
                        </div>
                    </div>
                </AnimatedCard>
            ))}
        </div>
    </section>
);

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
            <AutoRotatingCardStack items={customers} />
        </section>
    );
};

const FAQPage = () => {
    const faqs = [
        { q: 'How do I sign up as a gig worker?', a: 'Simply download our app, create an account, verify your identity, and complete your profile with skills and experience. Once approved, you can start applying for gigs immediately.' },
        { q: 'What types of gigs are available on KrewsUp?', a: 'We offer a wide range of opportunities including event staffing, hospitality, retail, promotions, entertainment, technical support, and creative services. New categories are added regularly based on market demand.' },
        { q: 'How quickly will I get paid after completing a gig?', a: 'Payments are released as soon as the organizer confirms the gig completion, directly to your linked bank account or wallet' },
        { q: 'Is there a fee for using KrewsUp?', a: 'Creating a profile is free. Organizers are charged a 13% service fee on total Krew billing. Krews work with zero fees.' },
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
    const [showPageScrollIndicator, setShowPageScrollIndicator] = useState(false);

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [openModal]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const checkScroll = () => {
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;
                const scrollTop = document.documentElement.scrollTop;
                
                const isScrollable = scrollHeight > clientHeight;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

                setShowPageScrollIndicator(isScrollable && !isAtBottom);
            };

            checkScroll();
            window.addEventListener('scroll', checkScroll, { passive: true });
            window.addEventListener('resize', checkScroll);

            return () => {
                window.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }, 150);

        return () => clearTimeout(timer);
    }, [activePage]);

    const handlePageScroll = () => {
        window.scrollBy({
            top: window.innerHeight * 0.7,
            behavior: 'smooth'
        });
    };

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
            <RippleEffect />

            <Header onNavigate={handleNavigate} activePage={activePage} onToggleMobileNav={handleToggleMobileNav} />

            <main className="container">
                {activePage === 'home-page' && <HomePage onOpenModal={handleOpenModal} />}
                {activePage === 'why-us-page' && <WhyUsPage />}
                {activePage === 'how-page' && <HowItWorksPage />}
                {activePage === 'partners-page' && <PartnersPage />}
                {activePage === 'gigscape-page' && <GigscapePage />}
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
            
            <div 
                className={`page-scroll-indicator ${showPageScrollIndicator ? 'visible' : ''}`}
                onClick={handlePageScroll}
            >
                <div className="arrow"></div>
            </div>
        </>
    );
}

export default App;
