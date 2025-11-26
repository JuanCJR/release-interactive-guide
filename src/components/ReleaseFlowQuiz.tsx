"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  RefreshCcw,
  Trophy,
} from "lucide-react";
import styles from "./ReleaseFlowQuiz.module.css";

const questions = [
  {
    id: 1,
    question:
      "Estás a mitad del Sprint 15. QA encuentra un bug visual en el Login. No existe rama de release aún. ¿Qué debes hacer?",
    options: [
      "Crear una rama 'hotfix/' desde master y mergear a master.",
      "Crear una rama 'fix/' desde develop, corregir, y mergear a develop.",
      "Esperar a que se cree la rama release para corregirlo.",
      "Corregirlo directamente en la rama develop sin Pull Request.",
    ],
    correctAnswer: 1,
    explanation:
      "Correcto. Si el sprint está activo y no hay code-freeze, los bugs se tratan como tareas normales en develop.",
  },
  {
    id: 2,
    question:
      "El Sprint ha cerrado y existe la rama 'release/sprint-15'. Encuentras un bug crítico que debe salir en esta versión. ¿Cuál es el flujo COMPLETO?",
    options: [
      "Fix en develop -> Merge a release.",
      "Fix en release -> Merge a release.",
      "Fix en release -> Merge a release -> Merge a master.",
      "Fix en release -> Merge a release -> BACK-MERGE a develop.",
    ],
    correctAnswer: 3,
    explanation:
      "¡Exacto! El Back-merge es vital. Si olvidas mergear de vuelta a develop, el bug reaparecerá en el próximo sprint.",
  },
  {
    id: 3,
    question: "¿Cuál es la nomenclatura correcta para un Tag entregable a QA?",
    options: [
      "qa-ready-v1",
      "Semana 48 y 49 2025 - R6 (ej. R6)",
      "release-final-ok",
      "[Fecha]-build",
    ],
    correctAnswer: 1,
    explanation:
      "Correcto. Mantenemos el orden por número de Sprint y versión iterativa dentro del mismo.",
  },
  {
    id: 4,
    question: "¿Cuándo se debe crear la rama 'release/sprint-N'?",
    options: [
      "Al inicio del sprint.",
      "Cada vez que se termina una feature.",
      "Al finalizar el sprint (Code Freeze) para iniciar el QA final.",
      "Solo cuando se va a subir a producción.",
    ],
    correctAnswer: 2,
    explanation:
      "Así es. La rama release actúa como un entorno congelado para estabilizar la versión antes de producción.",
  },
  {
    id: 5,
    question:
      "Un desarrollador quiere iniciar una nueva Feature para el Sprint actual. ¿Desde qué rama debe crear su rama local?",
    options: [
      "Desde 'master' o 'main'.",
      "Desde la rama 'release' anterior.",
      "Desde 'develop'.",
      "Desde cualquier rama que tenga el código más reciente.",
    ],
    correctAnswer: 2,
    explanation:
      "Correcto. 'develop' es la fuente de la verdad para el trabajo en curso del sprint.",
  },
];

export default function ReleaseFlowQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [blockedOptions, setBlockedOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    if (isCorrect) return; // Prevent clicking after correct answer
    if (blockedOptions.includes(index)) return; // Prevent clicking blocked options

    setSelectedOption(index);

    if (index === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      // Only award point if no wrong attempts were made for this question
      if (blockedOptions.length === 0) {
        setScore((prev) => prev + 1);
      }
    } else {
      setIsCorrect(false);
      setBlockedOptions((prev) => [...prev, index]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setBlockedOptions([]);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setBlockedOptions([]);
    setScore(0);
    setQuizFinished(false);
  };

  const scorePercentage = (score / questions.length) * 100;

  if (quizFinished) {
    return (
      <div className={styles.resultCard}>
        <div className={styles.resultIconContainer}>
          {scorePercentage >= 80 ? (
            <Trophy className={styles.trophyIcon} />
          ) : (
            <AlertCircle className={styles.alertIcon} />
          )}
        </div>

        <h2 className={styles.resultTitle}>
          {scorePercentage >= 80 ? "¡Excelente trabajo!" : "Necesitas repasar"}
        </h2>

        <p className={styles.resultText}>
          Has acertado {score} de {questions.length} preguntas (
          {scorePercentage}%).
          {scorePercentage < 80 && (
            <span className={styles.resultSuggestion}>
              Te sugerimos revisar la documentación de Release Flow nuevamente.
            </span>
          )}
        </p>

        <button onClick={handleRetry} className={styles.retryButton}>
          <RefreshCcw className={styles.retryIcon} />
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className={styles.header}>
        <div className={styles.progressContainer}>
          <span>
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </span>
          <span>
            Progreso:{" "}
            {Math.round((currentQuestionIndex / questions.length) * 100)}%
          </span>
        </div>
        <div className={styles.progressBarBackground}>
          <div
            className={styles.progressBarFill}
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <h3 className={styles.question}>{currentQuestion.question}</h3>

      {/* Options */}
      <div className={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isBlocked = blockedOptions.includes(index);
          const isCorrectAnswer = index === currentQuestion.correctAnswer;

          // Determine styles based on state
          let optionClassName = styles.optionButton;
          let icon = null;

          if (isCorrect && isCorrectAnswer) {
            optionClassName = `${styles.optionButton} ${styles.optionCorrect}`;
            icon = <CheckCircle className={styles.iconCorrect} />;
          } else if (isBlocked) {
            optionClassName = `${styles.optionButton} ${styles.optionBlocked}`;
            icon = <XCircle className={styles.iconWrong} />;
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={isCorrect === true || isBlocked}
              className={optionClassName}
            >
              <span className={styles.optionText}>{option}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Feedback & Navigation */}
      <div className={styles.feedbackContainer}>
        {isCorrect === true && (
          <div className={styles.feedbackCorrect}>
            <div className={styles.feedbackContent}>
              <CheckCircle className={styles.feedbackIcon} />
              <div>
                <p className={styles.feedbackTitle}>¡Correcto!</p>
                <p className={styles.feedbackText}>
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
            <div className={styles.nextButtonContainer}>
              <button onClick={handleNext} className={styles.nextButton}>
                {currentQuestionIndex < questions.length - 1
                  ? "Siguiente Pregunta"
                  : "Ver Resultados"}
                <ChevronRight className={styles.nextIcon} />
              </button>
            </div>
          </div>
        )}

        {isCorrect === false && (
          <div className={styles.feedbackWrong}>
            <div className={styles.feedbackWrongContent}>
              <AlertCircle className={styles.feedbackWrongIcon} />
              <p className={styles.feedbackWrongText}>
                Respuesta incorrecta. Inténtalo de nuevo.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
