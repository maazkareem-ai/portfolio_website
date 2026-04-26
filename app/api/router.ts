import { createRouter, publicQuery } from "./middleware";
import { z } from "zod";

export const appRouter = createRouter({
  chat: createRouter({
    send: publicQuery
      .input(
        z.object({
          message: z.string().min(1).max(2000),
          sessionId: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // AI chatbot response system for Maaz Kareem portfolio
        const userMsg = input.message.toLowerCase();
        
        let response = "";
        
        // Portfolio-related responses
        if (userMsg.includes("project") || userMsg.includes("work")) {
          response = "I've built several impactful AI projects: (1) Mental Health ML System - 94% accuracy predicting mental health conditions using SVM, RF, and LightGBM. (2) RSI ONE Aviation System - AI-powered backend with role-based auth, predictions, and OCR. (3) Mobile Price Prediction, (4) Phishing URL Detection, (5) Deep Learning with RNN/LSTM/GRU, and (6) Computer Vision with ResNet50 on UTKFace dataset. Which one interests you most?";
        } else if (userMsg.includes("skill") || userMsg.includes("technology") || userMsg.includes("tech")) {
          response = "My core stack includes Python, SQL, Scikit-learn, XGBoost, LightGBM, TensorFlow, Keras, CNN, RNN, LSTM, GRU. I'm also proficient with Git, GitHub, Jupyter, and various data visualization tools. I specialize in NLP, predictive systems, and intelligent automation.";
        } else if (userMsg.includes("education") || userMsg.includes("degree") || userMsg.includes("gold medal")) {
          response = "I'm a Gold Medalist in BS Computer Science with an AI/ML specialization. I also received the Prime Minister Laptop Award for academic excellence. My thesis focused on real-world AI applications in mental health prediction.";
        } else if (userMsg.includes("research") || userMsg.includes("paper")) {
          response = "My research focuses on ethical AI and cross-domain generalization in mental health prediction systems. I explored multi-source datasets, ensemble methods, and fairness metrics. Future work includes BERT-based NLP and multilingual AI systems for global accessibility.";
        } else if (userMsg.includes("contact") || userMsg.includes("email") || userMsg.includes("hire")) {
          response = "You can reach me at maaz.kareem.ai@gmail.com or connect on LinkedIn at linkedin.com/in/maazkareem-ai/. I'm currently open to AI/ML engineering roles and research collaborations.";
        } else if (userMsg.includes("github")) {
          response = "My GitHub is github.com/maazkareem-ai where you can find all my repositories including the Mental Health ML System, Aviation AI Backend, and various deep learning experiments.";
        } else if (userMsg.includes("experience") || userMsg.includes("background")) {
          response = "I'm an AI & Machine Learning Engineer with expertise in designing intelligent systems that understand, predict, and transform real-world data. My focus areas include NLP, predictive analytics, computer vision, and ethical AI deployment.";
        } else if (userMsg.includes("hello") || userMsg.includes("hi") || userMsg.includes("hey")) {
          response = "Hello! I'm Maaz AI, Maaz Kareem's virtual assistant. I can tell you about his projects, skills, research, achievements, or help you get in touch. What would you like to know?";
        } else if (userMsg.includes("interview") || userMsg.includes("question")) {
          response = "For interview prep, I can share insights on: ML algorithms (SVM, ensemble methods, gradient boosting), deep learning architectures (CNN, RNN, LSTM, GRU, ResNet), MLOps practices, data preprocessing pipelines, model evaluation metrics, and real-world deployment challenges. Ask me anything specific!";
        } else if (userMsg.includes("resume") || userMsg.includes("cv")) {
          response = "Maaz's resume and CV are available in the Documents section of this portfolio. You can download them directly. They include detailed information about his education, projects, publications, and technical skills.";
        } else {
          response = "That's an interesting question! I'm designed to help you learn about Maaz Kareem's work in AI/ML engineering. I can discuss his projects, technical skills, research contributions, achievements, or help you connect with him. What specifically would you like to explore?";
        }
        
        return {
          response,
          timestamp: new Date().toISOString(),
        };
      }),
    
    history: publicQuery
      .input(z.object({ sessionId: z.string() }))
      .query(async () => {
        return [];
      }),
  }),
});

export type AppRouter = typeof appRouter;
